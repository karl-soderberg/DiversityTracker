namespace diversitytracker.api.Dtos
{
    public class PostFormSubmissionDto
    {
        public required DateTime CreatedAt { get; set; }
        public required PostPersonDto Person { get; set; }
        public required ICollection<PostQuestionDto> Questions { get; set; }
    }
}