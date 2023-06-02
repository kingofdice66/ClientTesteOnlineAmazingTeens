using Microsoft.AspNetCore.Mvc;
using Npgsql;
using Dapper;
using asp_net.Helpers;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetTopicController : Controller
{
	[HttpPost]
	public string Set([FromBody] SetTopic data)
	{
		//long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		//using NpgsqlConnection con = new(Database.ConnectionInfo());
		//con.Open();

		string purifiedComment = SanitizeHtml.Sanitize(data.comment);

		//const string query = @"
		//	INSERT INTO topics(
		//		subject,
		//		message,
		//		created_by,
		//		created_at,
		//		updated_at
		//	)

		//	VALUES(
		//		@subject,
		//		@message,
		//		@created_by,
		//		@created_at,
		//		@updated_at
		//	);
		//";

		//DynamicParameters dp = new();
		//dp.Add("@subject", data.subject);
		//dp.Add("@message", purifiedMessage);
		//dp.Add("@created_by", 1);
		//dp.Add("@created_at", unixTimestamp);
		//dp.Add("@updated_at", unixTimestamp);

		//try
		//{
		//	int rowsAffected = con.Execute(query, dp);

		//	if (rowsAffected > 0)
		//	{
		//		return "success";
		//	}
		//	else
		//	{
		//		return "failed";
		//	}
		//}
		//catch (Exception ex)
		//{
		//	return ex.Message;
		//}
		return
			$"subject: {data.subject}\n" +
			$"message: {purifiedComment}\n" +
			$"sectionId: {data.sectionId}\n" +
			$"subsectionId: {data.subsectionId}";
	}
}

public class SetTopic
{
	public string? subject { get; set; }

	public string? comment { get; set; }

	public int sectionId { get; set; }

	public int subsectionId { get; set; }
}