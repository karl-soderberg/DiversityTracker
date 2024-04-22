namespace diversitytracker.api.Models
{
    public class Question
    {
        public Ulid Id { get; private set; }
        public Ulid QuestionTypeId { get; set; }
        public required QuestionType QuestionType { get; set; }
        public required double Value { get; set; }
        public string Answer { get; set; }
        public Ulid FormSubmissionId { get; set; }
        public FormSubmission FormSubmission  { get; set; }

        public Question()
        {
            Id = Ulid.NewUlid();
        }
    }
}