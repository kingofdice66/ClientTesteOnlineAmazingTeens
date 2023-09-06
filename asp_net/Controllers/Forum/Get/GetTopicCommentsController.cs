using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using asp_net.Helpers;
using Npgsql;
using Dapper;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
[ApiController]
public class GetTopicCommentsController : Controller
{
	[HttpPost]
	public IActionResult Get([FromBody] Data _)
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			SELECT
				id,
				comment,
				created_by,
				created_at
			FROM
				topic_comments
			WHERE
				topic_id=@topicId
				AND
				section_id=@sectionId
				AND
				subsection_id=@subsectionId;
		";

		DynamicParameters dp = new();
		dp.Add("@topicId", _.topicId);
		dp.Add("@sectionId", _.sectionId);
		dp.Add("@subsectionId", _.subsectionId);

		try
		{
			IEnumerable<DataQuery> topicComments = con.Query<DataQuery>(query, dp).ToList();

			if (topicComments.Any())
			{
				return Ok(JsonSerializer.Serialize(topicComments));
			}
			else
			{
				return Ok("empty");
			}
		}
		catch (Exception ex)
		{
			return BadRequest($"Exception error: {ex.Message}");
		}
	}

	public class DataQuery
	{
		public int id { get; set; }
		public string? comment { get; set; }
		public string? created_by { get; set; }
		public string? created_at { get; set; }
	}

	public class Data
	{
		[Required(ErrorMessage = "{0} is required")]
		public int topicId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int subsectionId { get; set; }
	}
}