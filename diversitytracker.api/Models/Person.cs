using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using diversitytracker.api.Enums;

namespace diversitytracker.api.Models
{
    public class Person
    {
        public string Id { get; private set; } = "Person_" + Ulid.NewUlid().ToString();
        public required string Name { get; set; }
        [Range(0, 1, ErrorMessage = "Gender must be either 0 (Male) or 1 (Female).")]
        public required Gender Gender { get; set; }
        public int Age { get; set; }
        public required int TimeAtCompany { get; set; }
        public ICollection<FormSubmission> FormSubmissions { get; set; }
        public required string PersonalReflection { get; set; }
    }
}