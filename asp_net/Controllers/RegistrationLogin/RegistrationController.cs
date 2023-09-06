using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.RegistrationLogin;

[Route("[controller]/[action]")]
[ApiController]
public class RegistrationController : Controller
{
	[HttpPost]
	public IActionResult RegisterUser([FromBody] Data _)
	{
		// token for email verification
		string token = VerificationToken.Generate();

		// get current unix time
		long unixTimestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

		// token will expire after 30 minutes
		long tokenExpiration = DateTimeOffset.UtcNow.AddMinutes(30).ToUnixTimeMilliseconds();

		using NpgsqlConnection con = new(Database.ConnectionInfo());
		con.Open();

		const string query = @"
			INSERT INTO users(
				username,
				username_lowercase,
				email,
				first_name,
				last_name,
				gender,
				password,
				token,
				token_expiration,
				date_of_birth,
				created_at,
				updated_at
			)

			VALUES(
				@username,
				@username_lowercase,
				@email,
				@first_name,
				@last_name,
				@gender,
				@password,
				@token,
				@token_expiration,
				@date_of_birth,
				@created_at,
				@updated_at
			);
		";

		DynamicParameters dp = new();
		dp.Add("@username", _.username);
		dp.Add("@username_lowercase", _.username.ToLower());
		dp.Add("@email", _.email);
		dp.Add("@first_name", _.firstName);
		dp.Add("@last_name", _.lastName);
		dp.Add("@gender", _.gender);
		dp.Add("@password", Password.Hash(_.password));
		dp.Add("@token", token);
		dp.Add("@token_expiration", tokenExpiration);
		dp.Add("@date_of_birth", _.dateOfBirth);
		dp.Add("@created_at", unixTimestamp);
		dp.Add("@updated_at", unixTimestamp);

		try
		{
			int rowsAffected = con.Execute(query, dp);

			if (rowsAffected > 0)
			{
				EmailConfirmation.Send(_.username, _.email, token);
				return Ok("success");
			}
			else
			{
				return BadRequest("failed");
			}
		}
		catch (Exception ex)
		{
			return BadRequest($"Exception error: {ex.Message}");
		}
	}
}

public class Data
{
	[Required(ErrorMessage = "Username is required")]
	[RegularExpression(@"^(?![_-])[a-zA-Z0-9_-]+$", ErrorMessage = "Does not match '^(?![_-])[a-zA-Z0-9_-]+$' format")]
	[MinLength(3, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(20, ErrorMessage = "Maximum length required is {0}")]
	public string? username { set; get; }

	[Required(ErrorMessage = "Password is required")]
	[MinLength(8, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(150, ErrorMessage = "Maximum length required is {0}")]
	public string? password { set; get; }

	[Required(ErrorMessage = "Email is required")]
	[EmailAddress(ErrorMessage = "Is not a valid email address")]
	[MinLength(2, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(150, ErrorMessage = "Maximum length required is {0}")]
	public string? email { set; get; }

	[MinLength(2, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(50, ErrorMessage = "Maximum length required is {0}")]
	public string? firstName { set; get; }

	[MinLength(2, ErrorMessage = "Minimum length required is {0}")]
	[MaxLength(50, ErrorMessage = "Maximum length required is {0}")]
	public string? lastName { set; get; }

	[Required(ErrorMessage = "Gender is required")]
	[RegularExpression(@"^(feminin|masculin|altul)$", ErrorMessage = "Does not match ^(feminin|masculin|altul)$")]
	public string? gender { set; get; }

	[DateTime]
	public string? dateOfBirth { set; get; }
}