using System.Text.Json.Serialization;

namespace diversitytracker.api.Models
{
    public class Question
    {
        public string Id { get; private set; } = "Question_" + Ulid.NewUlid().ToString();
        public string QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required double Value { get; set; }
        public string Answer { get; set; }
        public string FormSubmissionId { get; set; }
        public FormSubmission FormSubmission  { get; set; }
    }
}