using System.ComponentModel.DataAnnotations;
using diversitytracker.api.Enums;

namespace diversitytracker.api.Dtos
{
    public class PostPersonDto
    {
        public required string Name { get; set; }
        [Range(0, 1, ErrorMessage = "Gender must be either 0 (Male) or 1 (Female).")]
        public required Gender Gender { get; set; }
        public int Age { get; set; }
        public required int TimeAtCompany { get; set; }
        public required string PersonalReflection { get; set; }
    }
}