namespace asp_net.Helpers;

public class Database
{
	/// <summary>
	///  Database connection information.
	/// </summary>
	public static string ConnectionInfo()
	{
		return
			$"Host=localhost;" +
			$"Username=postgres;" +
			$"Password=painkiller@;" +
			$"Database=amazing_teens";
	}
}