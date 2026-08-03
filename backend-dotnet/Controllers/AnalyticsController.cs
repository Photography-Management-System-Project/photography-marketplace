using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Data;

namespace PhotoHub.Analytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnalyticsController : ControllerBase
    {
        private readonly AnalyticsDbContext _context;

        public AnalyticsController(AnalyticsDbContext context)
        {
            _context = context;
        }

        // GET: api/Analytics/dashboard
        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboardStats()
        {
            var totalRevenue = await _context.Payments
                .Where(p => p.Status == "Completed")
                .SumAsync(p => p.Amount);
                
            var totalTransactions = await _context.Payments.CountAsync();
            var refundCount = await _context.Payments.CountAsync(p => p.Status == "Refunded");

            return new
            {
                TotalRevenue = totalRevenue,
                TotalTransactions = totalTransactions,
                RefundCount = refundCount,
                PlatformGrowth = 12.5 // Simulated percentage
            };
        }

        // GET: api/Analytics/logs
        [HttpGet("logs")]
        public async Task<ActionResult<IEnumerable<Models.SystemLog>>> GetLogs()
        {
            return await _context.SystemLogs.OrderByDescending(l => l.CreatedAt).ToListAsync();
        }

        // POST: api/Analytics/logs
        [HttpPost("logs")]
        public async Task<ActionResult<Models.SystemLog>> AddLog([FromBody] Models.SystemLog log)
        {
            _context.SystemLogs.Add(log);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetLogs), new { id = log.LogId }, log);
        }
    }
}
