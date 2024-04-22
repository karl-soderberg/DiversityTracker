namespace diversitytracker.api.Models
{
    public class FormSubmissionPostDto
    {
        public required ICollection<Question> Questions { get; set; }
        public required Person Person { get; set; }
    }
}