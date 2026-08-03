using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoHub.Analytics.Models
{
    public class Refund
    {
        [Key]
        [JsonPropertyName("refund_id")]
        public long RefundId { get; set; }

        [JsonPropertyName("booking_id")]
        public long BookingId { get; set; }

        [JsonPropertyName("payment_id")]
        public long PaymentId { get; set; }

        [JsonPropertyName("refund_amount")]
        public decimal RefundAmount { get; set; }

        [JsonPropertyName("refund_reason")]
        public string RefundReason { get; set; } = string.Empty;

        [JsonPropertyName("refund_status")]
        public string RefundStatus { get; set; } = "Pending";

        [JsonPropertyName("approved_by_admin")]
        public long? ApprovedByAdmin { get; set; }

        [JsonPropertyName("processed_at")]
        public DateTime? ProcessedAt { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
