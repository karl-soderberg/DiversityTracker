namespace diversitytracker.api.Models
{
    public class FormSubmissionResponseDto
    {
        public int Id { get; set; }
        public required DateTime CreatedAt { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}