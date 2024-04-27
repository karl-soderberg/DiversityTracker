namespace diversitytracker.api.Models.OpenAi
{
    public class AiQuestionInterpretation
    {
        public string Id { get; private set; } = "AiInter" + Ulid.NewUlid().ToString();
        public required string QuestionTypeId { get; set; }
        public QuestionType QuestionType { get; set; }
        public string? AnswerInterpretation { get; set; }
        public string? ValueInterpretation { get; set; }
    }
}