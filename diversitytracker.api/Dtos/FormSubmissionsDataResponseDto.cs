using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class FormSubmissionsDataResponseDto
    {
        public required DateTime RequestedAt { get; set; }
        public required ICollection<FormSubmissionResponseDto> FormSubmissions { get; set; }
    }
}