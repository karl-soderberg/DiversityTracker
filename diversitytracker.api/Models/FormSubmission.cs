namespace diversitytracker.api.Models
{
    public class FormSubmission
    {
        public string Id { get; private set; } = "FormSubmission_" + Ulid.NewUlid().ToString();
        public required DateTime CreatedAt { get; set; }
        public string PersonId  { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }
    }
}