using Microsoft.EntityFrameworkCore;
using PhotoHub.Analytics.Models;

namespace PhotoHub.Analytics.Data
{
    public class AnalyticsDbContext : DbContext
    {
        public AnalyticsDbContext(DbContextOptions<AnalyticsDbContext> options)
            : base(options)
        {
        }

        public DbSet<Payment> Payments { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<Refund> Refunds { get; set; }
        public DbSet<PaymentIssue> PaymentIssues { get; set; }
        public DbSet<SystemLog> SystemLogs { get; set; }
    }
}
