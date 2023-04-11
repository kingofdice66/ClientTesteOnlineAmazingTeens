var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
	options.Cookie.HttpOnly = true;
	options.Cookie.IsEssential = true;
});

builder.Services.AddCors(options =>
{
	options.AddDefaultPolicy(policy =>
	{
		policy
			.WithOrigins("http://localhost:3000")
			.AllowCredentials()
			.AllowAnyMethod()
			.AllowAnyHeader();
	});
});

WebSocketOptions webSocketOptions = new()
{
	KeepAliveInterval = TimeSpan.FromMinutes(2)
};

var app = builder.Build();

app.UseWebSockets(webSocketOptions);

app.UseSession();

app.MapControllers();

app.UseCors();

app.Run();