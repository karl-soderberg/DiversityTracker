using diversitytracker.api.Enums;

namespace diversitytracker.api.Models
{
    public class BaseFormRequestDto
    {
        public required QuestionType QuestionType { get; set; }
        public required int value { get; set;}
        public required string Description { get; set; }
    }
}