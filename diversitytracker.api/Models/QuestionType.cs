namespace diversitytracker.api.Models
{
    public class QuestionType
    {
        public string Id { get; set; }
        public required string Value { get; set; }

        public QuestionType()
        {
            Id = "QuestionType_" + Ulid.NewUlid().ToString();
        }
    }
}