using System.ComponentModel.DataAnnotations;
using diversitytracker.api.Enums;

namespace diversitytracker.api.Models
{
    public class Person
    {
        public int Id { get; private set; }
        public required string Name { get; set; }
        [Range(0, 1, ErrorMessage = "Gender must be either 0 (Male) or 1 (Female).")]
        public required Gender Gender { get; set; }
        public required DateTime TimeAtCompany { get; set; }
    }
}