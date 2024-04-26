namespace diversitytracker.api.Models.OpenAi
{
    public class AiInterpretation
    {
        public string Id { get; private set; } = "AiInter" + Ulid.NewUlid().ToString();
        public required string QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required string RealDataInterpretation { get; set; }
        public required string ReflectionsInterpretation { get; set; }
        public required int[] ReflectionValuesInterpretation { get; set; }
    }
}