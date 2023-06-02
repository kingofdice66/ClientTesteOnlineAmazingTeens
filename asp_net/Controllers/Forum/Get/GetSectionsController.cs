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
	public string Get()
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
			IEnumerable<SectionsQuery> sections = con.Query<SectionsQuery>(query).ToList();

			if (sections.Any())
			{
				return JsonSerializer.Serialize(sections);
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

	public class SectionsQuery
	{
		public int id { get; set; }
		public string? title { get; set; }
		public string? description { get; set; }
	}
}