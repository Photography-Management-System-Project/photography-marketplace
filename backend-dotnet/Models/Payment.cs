using System;
using System.ComponentModel.DataAnnotations;

namespace PhotoHub.Analytics.Models
{
    public class Payment
    {
        [Key]
        public string PaymentId { get; set; } = Guid.NewGuid().ToString();
        
        public string BookingId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        
        public string Status { get; set; } = "Pending"; // Pending, Completed, Failed, Refunded
        public string PaymentMethod { get; set; } = string.Empty; // UPI, Credit Card, PayPal
        
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
