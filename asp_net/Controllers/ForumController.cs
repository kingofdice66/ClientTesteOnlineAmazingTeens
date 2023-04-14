using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Dapper;
using Npgsql;

namespace asp_net.Controllers;

[Route("[controller]/[action]")]
[ApiController]
public class ForumController : Controller
{
	[HttpPost]
	public string SetForumTopic([FromBody] Topic data)
	{
		return
			$"topic_id: {data.topic_id}\n" +
			$"topic_title: {data.topic_title}\n" +
			$"section_id: {data.subsection_id}\n" +
			$"user_id: {data.user_id}\n";
	}
}

public class Topic
{
	[Required(ErrorMessage = "{0} is required")]
	public int topic_id { get; set; }

	[Required(ErrorMessage = "{0} is required")]
	[MinLength(4, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(20, ErrorMessage = "Maximum length required is {0}")]
	public string? topic_title { get; set; }

	[Required(ErrorMessage = "{0} is required")]
	public int section_id { get; set; }

	[Required(ErrorMessage = "{0} is required")]
	public int subsection_id { get; set; }

	[Required(ErrorMessage = "{0} is required")]
	public int user_id { get; set; }
}