using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Dtos
{
    public class FormSubmissionsDataResponseDto
    {
        public required DateTime RequestedAt { get; set; }
        public required ICollection<FormSubmission> FormSubmissions { get; set; }
        public required AiInterpretation aiInterpretation { get; set; }
    }
}