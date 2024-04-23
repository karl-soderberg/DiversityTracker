using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class FormSubmitQuestionTypeDto
    {
        public string QuestionTypeId { get; set; }
        public required double Value { get; set; }
        public string Answer { get; set; }
    }
}