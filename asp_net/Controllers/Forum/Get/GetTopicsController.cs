using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using asp_net.Helpers;
using Npgsql;
using Dapper;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
[ApiController]
public class GetTopicsController : Controller
{
	[HttpPost]
	public string Get([FromBody] TopicsRequest data)
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			SELECT
				id,
				title,
				created_by,
				created_at
			FROM
				topics
			WHERE
				section_id=@sectionId
				AND
				subsection_id=@subsectionId;
		";

		DynamicParameters dp = new();
		dp.Add(@"sectionId", data.sectionId);
		dp.Add(@"subsectionId", data.subsectionId);

		try
		{
			IEnumerable<TopicsQuery> topics = con.Query<TopicsQuery>(query, dp).ToList();

			if (topics.Any())
			{
				return JsonSerializer.Serialize(topics);
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

	public class TopicsQuery
	{
		public int id { get; set; }
		public string? title { get; set; }
		public string? created_by { get; set; }
		public string? created_at { get; set; }
	}

	public class TopicsRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int subsectionId { get; set; }
	}
}