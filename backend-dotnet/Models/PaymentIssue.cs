using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoHub.Analytics.Models
{
    public class PaymentIssue
    {
        [Key]
        [JsonPropertyName("issue_id")]
        public long IssueId { get; set; }

        [JsonPropertyName("payment_id")]
        public long PaymentId { get; set; }

        [JsonPropertyName("user_id")]
        public long UserId { get; set; }

        [JsonPropertyName("issue_type")]
        public string IssueType { get; set; } = string.Empty;

        [JsonPropertyName("description")]
        public string Description { get; set; } = string.Empty;

        [JsonPropertyName("status")]
        public string Status { get; set; } = "Open";

        [JsonPropertyName("resolved_by_admin")]
        public long? ResolvedByAdmin { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
