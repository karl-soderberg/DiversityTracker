namespace diversitytracker.api.Models.OpenAi
{
    public class AiAnswerData
    {
        public string Id { get; private set; } = "AiAnswData" + Ulid.NewUlid().ToString();
        public required double[] Value { get; set; }
        public required double[] WordLength { get; set; }
        
    }
}