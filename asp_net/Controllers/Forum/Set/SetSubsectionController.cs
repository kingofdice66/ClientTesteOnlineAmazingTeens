using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Npgsql;
using Dapper;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetSubsectionController : Controller
{
	[HttpPost]
	public IActionResult Set([FromBody] SubsectionRequest data)
	{
		SubsectionResponse response = new();

		// get current unix time
		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			INSERT INTO subsections(
				title,
				description,
				section_id,
				created_by,
				created_at,
				updated_at
			)

			VALUES(
				@title,
				@description,
				@section_id,
				@created_by,
				@created_at,
				@updated_at
			);
		";

		DynamicParameters dp = new();
		dp.Add("@title", data.title);
		dp.Add("@description", data.description);
		dp.Add("@section_id", data.sectionId);
		dp.Add("@created_by", 1);
		dp.Add("@created_at", unixTimestamp);
		dp.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffected = con.Execute(query, dp);

			if (rowsAffected > 0)
			{
				response.Add("subsection added successfully");
			}
			else
			{
				response.Add("subsection failed to add");
			}
		}
		catch (Exception ex)
		{
			response.Add($"subsection exception error:  {ex.Message}");
		}

		return Ok(new { response.responses });
	}

	public class SubsectionResponse
	{
		public string[]? responses { get; set; }

		private readonly List<string> responses_ = new();

		public void Add(string status)
		{
			responses_.Add(status);
			responses = responses_.ToArray();
		}
	}

	public class SubsectionRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		[MinLength(3, ErrorMessage = "Minimum length is {0}")]
		[MaxLength(50, ErrorMessage = "Maximum length is {0}")]
		public string? title { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[MinLength(3, ErrorMessage = "Minimum length is {0}")]
		[MaxLength(500, ErrorMessage = "Maximum length is {0}")]
		public string? description { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }
	}
}