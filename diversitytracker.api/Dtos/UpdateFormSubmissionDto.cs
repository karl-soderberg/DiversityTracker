using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class UpdateFormSubmissionDto
    {
        public required DateTime CreatedAt { get; set; }
        public string PersonId  { get; set; }
        public required PostPersonDto Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}