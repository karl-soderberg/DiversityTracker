namespace diversitytracker.api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required double Value { get; set; }
        public string? Answer { get; set; }
        public required Person Person { get; set; }
    }
}