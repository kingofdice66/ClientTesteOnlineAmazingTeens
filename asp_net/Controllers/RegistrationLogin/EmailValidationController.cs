using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Npgsql;
using Dapper;

namespace asp_net.Controllers.RegistrationLogin;

// Verify the email with the link sent to the users email.
[Route("[controller]/[action]")]
[ApiController]
public class EmailValidationController : Controller
{
	[HttpPost]
	public string ValidateEmail([FromBody] UserToken data)
	{
		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
				UPDATE
					users
				SET
				    verified_email=@verified_email
				WHERE
					token=@token;
		";

		DynamicParameters dp = new();
		dp.Add("@verified_email", true);
		dp.Add("@token", data.token);

		try
		{
			int rowsAffected = con.Execute(query, dp);

			if (rowsAffected > 0)
				return "validation succeeded";
			else
				return "validation failed";
		}
		catch (Exception ex)
		{
			return ex.Message;
		}
	}
}

public class UserToken
{
	[Required(ErrorMessage = "{0} is required")]
	[RegularExpression(@"^.{128}$", ErrorMessage = "{0} does not contain the required character length")]
	public string? token { set; get; }
}