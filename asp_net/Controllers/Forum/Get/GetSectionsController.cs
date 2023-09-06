using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
[ApiController]
public class GetSectionsController : Controller
{
	[HttpPost]
	public IActionResult Get()
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			SELECT
				id,
				title,
				description
			FROM
				sections;
		";

		try
		{
			IEnumerable<DataQuery> sections = con.Query<DataQuery>(query).ToList();

			if (sections.Any())
			{
				return Ok(JsonSerializer.Serialize(sections));
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
		public string? title { get; set; }
		public string? description { get; set; }
	}
}