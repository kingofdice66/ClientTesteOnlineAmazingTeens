﻿using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using asp_net.Helpers;
using Npgsql;
using Dapper;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
[ApiController]
public class GetTopicCommentController : Controller
{
	[HttpPost]
	public IActionResult Get([FromBody] Data data)
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			SELECT
				comment
			FROM
				topic_comments
			WHERE
				section_id=@sectionId
				AND
				subsection_id=@subsectionId
				AND
				topic_id=@topicId
				AND
				id=@commentId;
		";

		DynamicParameters dp = new();
		dp.Add("@sectionId", data.sectionId);
		dp.Add("@subsectionId", data.subsectionId);
		dp.Add("@topicId", data.topicId);
		dp.Add("@commentId", data.commentId);

		try
		{
			string? topicComment = con.QueryFirstOrDefault<string>(query, dp);

			if (topicComment.Any())
			{
				return Ok(JsonSerializer.Serialize(topicComment));
			}
			else
			{
				return Ok("empty");
			}
		}
		catch (Exception ex)
		{
			return BadRequest(ex.Message);
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
		public int commentId { get; set; }
	}
}