using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Courses.Set;

[Route("[controller]/[action]")]
[ApiController]
public class CoursesController : Controller
{
	[HttpPost]
	public IActionResult SetTitleAndDescription([FromBody] Data data)
	{
		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		string purifiedTitle = SanitizeHtml.Sanitize(data.title);

		string purifiedDescription = SanitizeHtml.Sanitize(data.description);

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			INSERT INTO courses(
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
			)

			RETURNING id;
		";

		DynamicParameters dp = new();

		dp.Add("@title", purifiedTitle);
		dp.Add("@description", purifiedDescription);
		dp.Add("@created_by", 1);
		dp.Add("@created_at", unixTimestamp);
		dp.Add("@updated_at", unixTimestamp);

		try
		{
			int tutorialId = con.QuerySingle<int>(query, dp);

			return Ok(new { tutorialId });
		}
		catch (Exception ex)
		{
			return BadRequest($"Exception error: {ex.Message}");
		}
	}

	public class Data
	{
		[Required(ErrorMessage = "{0} is required")]
		[MinLength(10, ErrorMessage = "Minimum length required is {0}")]
		[MaxLength(500, ErrorMessage = "Maximum length required is {0}")]
		public string? title { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[MinLength(20, ErrorMessage = "Minimum length required is {0}")]
		[MaxLength(20000, ErrorMessage = "Maximum length required is {0}")]
		public string? description { get; set; }
	}
}