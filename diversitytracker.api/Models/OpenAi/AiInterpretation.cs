namespace diversitytracker.api.Models.OpenAi
{
    public class AiInterpretation
    {
        public string Id { get; private set; } = "AiInter" + Ulid.NewUlid().ToString();
        public string? ReflectionsInterpretation { get; set; }
        public string? RealDataInterpretation { get; set; }
        public List<AiQuestionInterpretation>? QuestionInterpretations { get; set; }
    }
}