using Microsoft.AspNetCore.Mvc;

namespace asp_net.Controllers.RegistrationLogin
{
	public class LoginController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
