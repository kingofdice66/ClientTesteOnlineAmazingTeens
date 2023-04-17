using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.Forum
{
	public class TopicCommentsController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
