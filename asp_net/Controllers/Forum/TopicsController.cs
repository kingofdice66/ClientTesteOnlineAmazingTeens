using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.Forum
{
	public class TopicsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
