using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class UpdateFormSubmissionDto
    {
        public int Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}