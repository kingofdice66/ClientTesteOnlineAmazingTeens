using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetSubsectionController : Controller
{
	[HttpPost]
	public string Set([FromBody] SetSubsection data)
	{
		return
			$"title: {data.title}\n" +
			$"description: {data.title}\n" +
			$"subsection_id: {data.subsection_id}";
	}
}

public class SetSubsection
{
	[Required(ErrorMessage = "{0} is required")]
	[MinLength(10, ErrorMessage = "Minimum length is {0}")]
	[MaxLength(50, ErrorMessage = "Maximum length is {0}")]
	public string? title { get; set; }

	[Required(ErrorMessage = "{0} is required")]
	[MinLength(10, ErrorMessage = "Minimum length is {0}")]
	[MaxLength(50, ErrorMessage = "Maximum length is {0}")]
	public string? description { get; set; }

	public int subsection_id { get; set; }
}