using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace PhotoHub.Analytics.Models
{
    public class SystemLog
    {
        [Key]
        [JsonPropertyName("log_id")]
        public long LogId { get; set; }

        [JsonPropertyName("admin_id")]
        public long AdminId { get; set; }

        [JsonPropertyName("action")]
        public string Action { get; set; } = string.Empty;

        [JsonPropertyName("table_name")]
        public string TableName { get; set; } = string.Empty;

        [JsonPropertyName("record_id")]
        public long RecordId { get; set; }

        [JsonPropertyName("old_value")]
        public string? OldValue { get; set; }

        [JsonPropertyName("new_value")]
        public string? NewValue { get; set; }

        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
