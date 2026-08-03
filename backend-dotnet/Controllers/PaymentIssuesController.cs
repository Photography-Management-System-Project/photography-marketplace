using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Data;
using PhotoHub.Analytics.Models;

namespace PhotoHub.Analytics.Controllers
{
    [Route("api/payment-issues")]
    [ApiController]
    public class PaymentIssuesController : ControllerBase
    {
        private readonly AnalyticsDbContext _context;

        public PaymentIssuesController(AnalyticsDbContext context)
        {
            _context = context;
        }

        // GET: api/payment-issues
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentIssue>>> GetPaymentIssues()
        {
            return await _context.PaymentIssues.ToListAsync();
        }

        // POST: api/payment-issues
        [HttpPost]
        public async Task<ActionResult<PaymentIssue>> CreatePaymentIssue([FromBody] PaymentIssue issue)
        {
            _context.PaymentIssues.Add(issue);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetPaymentIssues), new { id = issue.IssueId }, issue);
        }

        // PUT: api/payment-issues/{id}/resolve
        [HttpPut("{id}/resolve")]
        public async Task<IActionResult> ResolveIssue(long id)
        {
            var issue = await _context.PaymentIssues.FindAsync(id);
            if (issue == null) return NotFound();

            issue.Status = "Resolved";
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Issue resolved successfully", Issue = issue });
        }
    }
}
