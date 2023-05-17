using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.Forum.Set;

[Route("[controller]/[action]")]
[ApiController]
public class SetSectionController : Controller
{
	[HttpPost]
	public string Set()
	{
		return "success";
	}
}