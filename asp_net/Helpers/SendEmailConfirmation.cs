using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace asp_net.Helpers;

public class EmailConfirmation
{
	/// <summary>
	/// Send a link by email containing a unique token that when clicked the email will be confirmed.
	/// </summary>
	public static void Send(string? username, string? emailFrom, string? token)
	{
		MimeMessage email = new();
		email.From.Add(MailboxAddress.Parse(emailFrom));
		email.To.Add(MailboxAddress.Parse("1c094a6d5339f1"));
		email.Subject = "Test Email Subject";
		email.Body = new TextPart(TextFormat.Html) { Text = html(token) };

		using SmtpClient smtp = new();
		smtp.Connect("sandbox.smtp.mailtrap.io", 587, SecureSocketOptions.StartTls);
		smtp.Authenticate("1c094a6d5339f1", "93e385b57eee60");
		smtp.Send(email);
		smtp.Disconnect(true);
	}

	private static string html(string token)
	{
		string link = $"http://localhost:3000/email-confirmation?token={token}";

		return
			$@"<div>Apasă butonul de mai jos pentru a vă confirma adresa de email:</div>
			<button
				type=""button""
				onclick=""window.location.href={link})""
				style=""
					background-color: red;
					padding: 10px;
					color: white;
					border-style: none;
					cursor: pointer;""
			>
			Activează contul
			</button>
			<div style=""padding-top: 20px"">Nu a mers? Copiază linkul de mai jos în browser:</div>
			<div style=""padding-top: 20px; word-break: break-all;""><a style=""color: red;"" href={link}>{link}</a></div>";
	}
}