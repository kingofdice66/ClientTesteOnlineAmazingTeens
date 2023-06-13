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
	public string Get([FromBody] TopicCommentsRequest data)
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
		dp.Add("@topicId", data.topicId);
		dp.Add("@sectionId", data.sectionId);
		dp.Add("@subsectionId", data.subsectionId);

		try
		{
			IEnumerable<TopicCommentsQuery> topicComments = con.Query<TopicCommentsQuery>(query, dp).ToList();

			if (topicComments.Any())
			{
				return JsonSerializer.Serialize(topicComments);
			}
			else
			{
				return "empty";
			}
		}
		catch (Exception ex)
		{
			return ex.Message;
		}
	}

	public class TopicCommentsQuery
	{
		public int id { get; set; }
		public string? comment { get; set; }
		public string? created_by { get; set; }
		public string? created_at { get; set; }
	}

	public class TopicCommentsRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		public int topicId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int subsectionId { get; set; }
	}
}