using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Data;
using PhotoHub.Analytics.Models;

namespace PhotoHub.Analytics.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentsController : ControllerBase
    {
        private readonly AnalyticsDbContext _context;

        public PaymentsController(AnalyticsDbContext context)
        {
            _context = context;
        }

        // GET: api/Payments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return await _context.Payments.ToListAsync();
        }

        // POST: api/Payments
        [HttpPost]
        public async Task<ActionResult<Payment>> ProcessPayment(Payment payment)
        {
            payment.Status = "Completed"; // Simulate processing
            payment.CreatedAt = DateTime.UtcNow;
            
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPayments), new { id = payment.PaymentId }, payment);
        }

        // POST: api/Payments/{id}/refund
        [HttpPost("{id}/refund")]
        public async Task<IActionResult> RefundPayment(string id)
        {
            var payment = await _context.Payments.FindAsync(id);
            if (payment == null) return NotFound();

            payment.Status = "Refunded";
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Refund processed successfully", Payment = payment });
        }
    }
}
