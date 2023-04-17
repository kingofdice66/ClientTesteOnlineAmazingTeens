using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.RegistrationLogin
{
	public class RegistrationController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
