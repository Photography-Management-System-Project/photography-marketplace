using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

// Configure InMemory Database
builder.Services.AddDbContext<AnalyticsDbContext>(options =>
    options.UseInMemoryDatabase("PhotoHubAnalyticsDB"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("AllowAll");

app.UseAuthorization();
app.MapControllers();

app.Run();
