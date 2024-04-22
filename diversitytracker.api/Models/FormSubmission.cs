namespace diversitytracker.api.Models
{
    public class FormSubmission
    {
        public Ulid Id { get; private set; }
        public required DateTime CreatedAt { get; set; }
        public Ulid PersonId  { get; set; }
        public required Person Person { get; set; }
        public required ICollection<Question> Questions { get; set; }

        public FormSubmission()
        {
            Id = Ulid.NewUlid();
        }
    }
}