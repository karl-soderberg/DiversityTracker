using System.ComponentModel.DataAnnotations.Schema;

namespace diversitytracker.api.Models
{
    public class Question
    {
        public int Id { get; private set; }
        public int QuestionTypeId { get; set; }
        public required double Value { get; set; }
        public string? Answer { get; set; }
        // public required FormSubmission FormSubmission { get; set; }
    }
}