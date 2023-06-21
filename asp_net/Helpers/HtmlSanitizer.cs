using Ganss.Xss;

namespace asp_net.Helpers;

/// <summary>
/// XSS protection. Remove dangerous elements from HTML.
/// </summary>
public class SanitizeHtml
{
	public static string Sanitize(string html)
	{
		HtmlSanitizer sanitizer = new();

		sanitizer.AllowedAttributes.Add("data-quote");
		sanitizer.AllowedAttributes.Add("data-post");
		sanitizer.AllowedAttributes.Add("data-member");

		string sanitizedHtml = sanitizer.Sanitize(html);

		return sanitizedHtml;
	}
}