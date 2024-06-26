using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class PostQuestionDto
    {
        public required PostQuestionTypeDto QuestionType { get; set; }
        public required double Value { get; set; }
        public string? Answer { get; set; }
    }
}