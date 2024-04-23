using System.Text.Json.Serialization;

namespace diversitytracker.api.Models
{
    public class Question
    {
        public string Id { get; private set; }
        public string QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required double Value { get; set; }
        public string Answer { get; set; }
        public string FormSubmissionId { get; set; }
        public FormSubmission FormSubmission  { get; set; }

        public Question()
        {
            Id = "Question_" + Ulid.NewUlid().ToString();
        }
    }
}