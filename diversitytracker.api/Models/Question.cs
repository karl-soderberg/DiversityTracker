using System.ComponentModel.DataAnnotations.Schema;

namespace diversitytracker.api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required double Value { get; set; }
        public string Answer { get; set; }
        public int FormSubmissionId { get; set; }
        public FormSubmission FormSubmission  { get; set; }
    }
}