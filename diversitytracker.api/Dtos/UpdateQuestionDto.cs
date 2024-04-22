namespace diversitytracker.api.Dtos
{
    public class UpdateQuestionDto
    {
        public int Id { get; set; }
        public int QuestionTypeId { get; set; }
        public required double Value { get; set; }
        public string? Answer { get; set; }
        // public required FormSubmission FormSubmission { get; set; }
    }
}