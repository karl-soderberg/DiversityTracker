namespace diversitytracker.api.Models.OpenAi
{
    public class AiAnswerData
    {
        public string Id { get; private set; } = "AiAnswData" + Ulid.NewUlid().ToString();
        public double[]? Value { get; set; }
        public double[]? WordLength { get; set; }
        
    }
}