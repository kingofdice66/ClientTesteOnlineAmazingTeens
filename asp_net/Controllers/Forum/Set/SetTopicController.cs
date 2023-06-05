using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetTopicController : Controller
{
	[HttpPost]
	public IActionResult Set([FromBody] TopicRequest data)
	{
		// Indicates the status of the request
		TopicResponse response = new();

		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		string purifiedComment = SanitizeHtml.Sanitize(data.comment);

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string queryTopics = @"
			INSERT INTO topics(
				title,
				created_by,
				section_id,
				subsection_id,
				created_at,
				updated_at
			)

			VALUES(
				@title,
				@created_by,
				@section_id,
				@subsection_id,
				@created_at,
				@updated_at
			);
		";

		DynamicParameters dpTopics = new();

		dpTopics.Add("@title", data.title);
		dpTopics.Add("@created_by", 1);
		dpTopics.Add("@section_id", data.sectionId);
		dpTopics.Add("@subsection_id", data.subsectionId);
		dpTopics.Add("@created_at", unixTimestamp);
		dpTopics.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffectedTopics = con.Execute(queryTopics, dpTopics);

			if (rowsAffectedTopics > 0)
			{
				response.Add("topic added successfully");
			}
			else
			{
				response.Add("topic failed to add");
			}
		}
		catch (Exception ex)
		{
			response.Add($"topic exception error = {ex.Message}");
		}

		// Using unix timestamp to get the id ensures concurrency protection
		string queryTopicId = @"
			SELECT
				id
			FROM
				topics
			WHERE
				created_at::BIGINT=@unixTimestamp;
		";

		DynamicParameters dpTopicId = new();
		dpTopicId.Add("@unixTimestamp", unixTimestamp);

		// Get the newly created topic id
		long? topicId = con.QueryFirstOrDefault<long>(queryTopicId, dpTopicId);

		try
		{
			if (topicId.HasValue)
			{
				response.Add("topic id retrieved successfully");
			}
			else
			{
				response.Add("failed to retrieve topic_id from 'topics'");
			}
		}
		catch (Exception ex)
		{
			response.Add($"topicID retrieval exception error = {ex.Message}");
		}

		const string queryTopicComments = @"
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

		DynamicParameters dpTopicComments = new();

		dpTopicComments.Add("@comment", purifiedComment);
		dpTopicComments.Add("@section_id", data.sectionId);
		dpTopicComments.Add("@subsection_id", data.subsectionId);
		dpTopicComments.Add("@topic_id", topicId);
		dpTopicComments.Add("@created_by", 1);
		dpTopicComments.Add("@created_at", unixTimestamp);
		dpTopicComments.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffectedTopicComments = con.Execute(queryTopicComments, dpTopicComments);

			if (rowsAffectedTopicComments > 0)
			{
				response.Add("new topic comment added successfully");
			}
			else
			{
				response.Add("new topic comments failed to be added");
			}
		}
		catch (Exception ex)
		{
			response.Add($"topicComments exception = {ex.Message}");
		}

		return Ok(new { response.responses });
	}

	public class TopicResponse
	{
		public string[]? responses { get; set; }

		private readonly List<string> responses_ = new();

		public void Add(string status)
		{
			responses_.Add(status);
			responses = responses_.ToArray();
		}
	}

	public class TopicRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		[MinLength(3, ErrorMessage = "Minimum required length is {0}")]
		[MaxLength(100, ErrorMessage = "Maximum required length is {0} ")]
		public string? title { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		[MinLength(10, ErrorMessage = "Minimum required length is {0}")]
		[MaxLength(20000, ErrorMessage = "Maximum required length is {0}")] // 20000 including HTML tags
		public string? comment { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }

		[Required(ErrorMessage = "{0} is required")]
		public int subsectionId { get; set; }
	}
}