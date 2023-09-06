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
	public IActionResult Set([FromBody] Data _)
	{
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
		dp.Add("@title", _.title);
		dp.Add("@description", _.description);
		dp.Add("@created_by", 1);
		dp.Add("@created_at", unixTimestamp);
		dp.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffected = con.Execute(query, dp);

			if (rowsAffected > 0)
			{
				return Ok("Added successfully");
			}
			else
			{
				return BadRequest("Failed to add");
			}
		}
		catch (Exception ex)
		{
			return BadRequest($"Exception error:  {ex.Message}");
		}
	}

	public class Data
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