using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetTopicCommentController : Controller
{
	[HttpPost]
	public IActionResult Set([FromBody] Data _)
	{
		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		string purifiedComment = SanitizeHtml.Sanitize(_.comment);

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			INSERT INTO topic_comments(
				comment,
				section_id,
				subsection_id,
				topic_id,
				created_by,
				created_at,
				updated_at
			)

			VALUES(
				@comment,
				@section_id,
				@subsection_id,
				@topic_id,
				@created_by,
				@created_at,
				@updated_at
			);
		";

		DynamicParameters dp = new();

		dp.Add("@comment", purifiedComment);
		dp.Add("@section_id", _.sectionId);
		dp.Add("@subsection_id", _.subsectionId);
		dp.Add("@topic_id", _.topicId);
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
				return BadRequest("Failed to be added");
			}
		}
		catch (Exception ex)
		{
			return BadRequest($"Exception error: {ex.Message}");
		}
	}

	public class Data
	{
		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int subsectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int topicId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[MinLength(10, ErrorMessage = "Minimum length required is {0}")]
		[MaxLength(20000, ErrorMessage = "Maximum length required is {0}")]
		public string? comment { get; set; }
	}
}