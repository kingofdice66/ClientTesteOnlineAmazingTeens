using System.Security.Cryptography;

namespace asp_net.Helpers;

public class Password
{
	private static readonly HashAlgorithmName HASH_ALGORITHM = HashAlgorithmName.SHA512;
	private const int ITERATIONS = 100_000;
	private const int OUTPUT_LENGTH = 512 / 8;

	/// <summary>
	/// Hashes and salts password using PBKDF2 key derivation function.<br/>
	/// Secure Hash Algorithm: SHA512 <br/>
	/// Iterations: 100000 <br/>
	/// Salt randomly generated using a cryptographically secure random number generator: 128 bits <br/>
	/// Derived key length: 512 bits <br/>
	/// </summary>
	/// <returns>
	///	A string containing the following information:<br/>
	///	- Key derivation function used (PBKDF2) <br/>
	///	- Secure hash algorithm used (SHA512) <br/>
	///	- Salt in base 64 <br/>
	///	- Hash in base 64 <br/>
	///	All separated by a $ <br/>
	///	Example: "pbkdf2$sha512$salt$hash"
	/// </returns>
	public static string Hash(string password)
	{
		byte[] SALT = RandomNumberGenerator.GetBytes(128 / 8);

		byte[] HASHED_AND_SALTED = Rfc2898DeriveBytes.Pbkdf2(password, SALT, ITERATIONS, HASH_ALGORITHM, OUTPUT_LENGTH);

		string HASHED_AND_SALTED_BASE64 = Convert.ToBase64String(HASHED_AND_SALTED);

		string SALT_BASE64 = Convert.ToBase64String(SALT);

		return $"pbkdf2$sha512${SALT_BASE64}${HASHED_AND_SALTED_BASE64}";
	}

	/// <summary>
	/// Verify users password when he logs in.
	/// </summary>
	/// <returns>
	///	True if correct and false otherwise.
	/// </returns>
	public static bool Verify(string user_password, string user_hash_base64, string user_salt_base64)
	{
		byte[] USER_SALT = Convert.FromBase64String(user_salt_base64);
		byte[] HASHED_AND_SALTED = Rfc2898DeriveBytes.Pbkdf2(user_password, USER_SALT, ITERATIONS, HASH_ALGORITHM, OUTPUT_LENGTH);

		string HASH_TO_COMPARE_BASE64 = Convert.ToBase64String(HASHED_AND_SALTED);

		// user_hash_base64 is the password hash from database from the specific user to be compared to HASH_TO_COMPARE_BASE64
		if (user_hash_base64 == HASH_TO_COMPARE_BASE64)
		{
			// Strings match
			return true;
		}

		return false;
	}
}