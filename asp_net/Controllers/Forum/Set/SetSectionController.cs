using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetSectionController : Controller
{
	[HttpPost]
	public IActionResult Set([FromBody] SectionRequest data)
	{
		SectionResponse response = new();

		// get current unix time
		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			INSERT INTO sections(
				title,
				description,
				created_by,
				created_at,
				updated_at
			)

			VALUES(
				@title,
				@description,
				@created_by,
				@created_at,
				@updated_at
			);
		";

		DynamicParameters dp = new();
		dp.Add("@title", data.title);
		dp.Add("@description", data.description);
		dp.Add("@created_by", 1);
		dp.Add("@created_at", unixTimestamp);
		dp.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffected = con.Execute(query, dp);

			if (rowsAffected > 0)
			{
				response.Add("section added successfully");
			}
			else
			{
				response.Add("section failed to add");
			}
		}
		catch (Exception ex)
		{
			response.Add($"section exception error:  {ex.Message}");
		}

		return Ok(new { response.responses });
	}

	public class SectionResponse
	{
		public string[]? responses { get; set; }

		private readonly List<string> responses_ = new();

		public void Add(string status)
		{
			responses_.Add(status);
			responses = responses_.ToArray();
		}
	}

	public class SectionRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		[MinLength(3, ErrorMessage = "Minimum length is {0}")]
		[MaxLength(50, ErrorMessage = "Maximum length is {0}")]
		public string? title { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[MinLength(3, ErrorMessage = "Minimum length is {0}")]
		[MaxLength(500, ErrorMessage = "Maximum length is {0}")]
		public string? description { get; set; }
	}
}