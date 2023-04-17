using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.Forum
{
	public class SubsectionsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
