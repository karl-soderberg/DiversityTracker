namespace diversitytracker.api.Models.OpenAi
{
    public class AiInterpretation
    {
        public string Id { get; private set; } = "AiInter" + Ulid.NewUlid().ToString();
        public string QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public string RealDataInterpretation { get; set; }
        public string ReflectionsInterpretation { get; set; }
        public int[] ReflectionValuesInterpretation { get; set; }
    }
}