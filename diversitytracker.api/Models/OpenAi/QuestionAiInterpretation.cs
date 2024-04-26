namespace diversitytracker.api.Models.OpenAi
{
    public class QuestionAiInterpretation
    {
        public string Id { get; private set; } = "AiQInter" + Ulid.NewUlid().ToString();
        public string QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public string Interpretation { get; set; }
    }
}