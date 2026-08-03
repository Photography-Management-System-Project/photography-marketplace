using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Data;
using PhotoHub.Analytics.Models;

namespace PhotoHub.Analytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RefundsController : ControllerBase
    {
        private readonly AnalyticsDbContext _context;

        public RefundsController(AnalyticsDbContext context)
        {
            _context = context;
        }

        // GET: api/Refunds
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Refund>>> GetRefunds()
        {
            return await _context.Refunds.ToListAsync();
        }

        // POST: api/Refunds
        [HttpPost]
        public async Task<ActionResult<Refund>> CreateRefund([FromBody] Refund refund)
        {
            _context.Refunds.Add(refund);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetRefunds), new { id = refund.RefundId }, refund);
        }

        // PUT: api/Refunds/{id}/process
        [HttpPut("{id}/process")]
        public async Task<IActionResult> ProcessRefund(long id, [FromBody] ProcessRefundRequest request)
        {
            var refund = await _context.Refunds.FindAsync(id);
            if (refund == null) return NotFound();

            refund.RefundStatus = request.IsApproved ? "Approved" : "Rejected";
            refund.ProcessedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(new { Message = "Refund processed successfully", Refund = refund });
        }
    }

    public class ProcessRefundRequest
    {
        public bool IsApproved { get; set; }
    }
}
