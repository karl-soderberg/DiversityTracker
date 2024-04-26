namespace diversitytracker.api.Models
{
    public class QuestionType
    {
        public string Id { get; set; } = "QuestionType_" + Ulid.NewUlid().ToString();
        public required string Value { get; set; }
    }
}