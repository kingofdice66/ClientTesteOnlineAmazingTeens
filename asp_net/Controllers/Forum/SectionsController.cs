using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.Forum
{
	public class SectionsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
