using System;
using System.ComponentModel.DataAnnotations;

namespace PhotoHub.Analytics.Models
{
    public class Notification
    {
        [Key]
        public string NotificationId { get; set; } = Guid.NewGuid().ToString();
        
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Message { get; set; } = string.Empty;
        
        public bool IsRead { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
