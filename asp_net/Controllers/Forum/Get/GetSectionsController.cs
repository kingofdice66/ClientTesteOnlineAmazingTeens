using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.Forum.Get;

[Route("[controller]/[action]")]
public class GetSectionsController : Controller
{
	[HttpPost]
	public string Get()
	{
		const string jsonString = @"[{""name"": ""razvan"", ""age"": 34}]";

		string data = JsonSerializer.Serialize(jsonString);

		return data;
	}
}