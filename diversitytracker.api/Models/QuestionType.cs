namespace diversitytracker.api.Models
{
    public class QuestionType
    {
        public string Id { get; private set; }
        public required string Value { get; set; }

        public QuestionType()
        {
            Id = "QuestionType_" + Ulid.NewUlid().ToString();
        }
    }
}