using diversitytracker.api.Models;

namespace diversitytracker.api.Dtos
{
    public class FormSubmissionsDataResponseDto
    {
        public required DateTime RequestedAt { get; set; }
        public required ICollection<FormSubmission> FormSubmissions { get; set; }
    }
}