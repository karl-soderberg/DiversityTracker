namespace diversitytracker.api.Models
{
    public class FormSubmission
    {
        public int Id { get; private set; }
        public required DateTime CreatedAt { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}