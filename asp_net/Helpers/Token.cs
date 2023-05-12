using System.Security.Cryptography;

namespace asp_net.Helpers;

public class VerificationToken
{
	/// <summary>
	/// Randomly generated token used to verify users email.
	/// </summary>
	public static string Generate()
	{
		return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
	}
}