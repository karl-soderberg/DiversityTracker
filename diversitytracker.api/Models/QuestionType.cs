namespace diversitytracker.api.Models
{
    public class QuestionType
    {
        public Ulid Id { get; private set; }
        public required string Value { get; set; }

        public QuestionType()
        {
            Id = Ulid.NewUlid();
        }
    }
}