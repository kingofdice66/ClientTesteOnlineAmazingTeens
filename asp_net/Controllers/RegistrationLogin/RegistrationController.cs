using System.ComponentModel.DataAnnotations;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;
using asp_net.Helpers;
using System.Text.Json;
using MailKit.Security;
using MailKit.Net.Smtp;
using MimeKit.Text;
using MimeKit;
using Dapper;
using Npgsql;

namespace asp_net.Controllers.RegistrationLogin;

[Route("[controller]/[action]")]
[ApiController]
public class RegistrationController : Controller
{
    [HttpPost]
    public string RegisterUser([FromBody] User_Registration data)
    {
        //SendEmailConfirmation(data.username, data.email);

        return
            // $"username: {data.username}\n" +
            // $"email: {data.email}\n" +
            // $"firstName: {data.firstName}\n" +
            // $"lastName: {data.lastName}\n" +
            // $"dateOfBirth: {data.dateOfBirth}\n" +
            // $"gender: {data.gender}\n" +
            // $"password: {data.password}\n";
            "RegisterUser";
    }

    /// <summary>
    /// Send a link by email containing a unique token that when clicked the email will be confirmed.
    /// </summary>
    private static void SendEmailConfirmation(string? username, string? emailFrom)
    {
        MimeMessage email = new();
        email.From.Add(MailboxAddress.Parse(emailFrom));
        email.To.Add(MailboxAddress.Parse("1c094a6d5339f1"));
        email.Subject = "Test Email Subject";
        email.Body = new TextPart(TextFormat.Html) { Text = $"<h1><b>Email from {username}<b></h1>" };

        using SmtpClient smtp = new();
        smtp.Connect("sandbox.smtp.mailtrap.io", 587, SecureSocketOptions.StartTls);
        smtp.Authenticate("1c094a6d5339f1", "93e385b57eee60");
        smtp.Send(email);
        smtp.Disconnect(true);
    }
}

public class User_Registration
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
    [MinLength(2, ErrorMessage = "Minimum length required is {0}")]
    [MaxLength(30, ErrorMessage = "Maximum length required is {0}")]
    public string? gender { set; get; }

    [DateTime]
    public string? dateOfBirth { set; get; }
}