using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PhotoHub.Api.Models
{
    [Table("photographers")]
    public class Photographer
    {
        [Key]
        public long Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [MaxLength(255)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(50)]
        public string? Phone { get; set; }

        [MaxLength(255)]
        public string? Location { get; set; }

        [MaxLength(100)]
        public string? Category { get; set; }

        [MaxLength(2000)]
        public string? Bio { get; set; }

        public string? ProfileImage { get; set; }

        [Column(TypeName = "decimal(10, 2)")]
        public decimal StartingPrice { get; set; }

        public double Rating { get; set; } = 5.0;

        public int ReviewCount { get; set; } = 0;

        public bool Verified { get; set; } = true;

        public bool Available { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
