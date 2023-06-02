using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
[ApiController]
public class GetSubsectionsController : Controller
{
	[HttpPost]
	public string Get([FromBody] SectionIdRequest data)
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			SELECT
				id,
				title,
				description
			FROM
				subsections
			WHERE
				section_id=@sectionId;
		";

		DynamicParameters dp = new();
		dp.Add(@"sectionId", data.sectionId);

		try
		{
			IEnumerable<SubsectionsQuery> subsections = con.Query<SubsectionsQuery>(query, dp).ToList();

			if (subsections.Any())
			{
				return JsonSerializer.Serialize(subsections);
			}
			else
			{
				return "empty";
			}
		}
		catch (System.Exception ex)
		{
			return ex.Message;
		}
	}

	public class SubsectionsQuery
	{
		public int id { get; set; }
		public string? title { get; set; }
		public string? description { get; set; }
	}

	public class SectionIdRequest
	{
		[Required(ErrorMessage = "{0} is required")]
		public int sectionId { get; set; }
	}
}