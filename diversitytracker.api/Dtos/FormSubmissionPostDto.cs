namespace diversitytracker.api.Models
{
    public class FormSubmissionPostDto
    {
        public required DateTime CreatedAt { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}