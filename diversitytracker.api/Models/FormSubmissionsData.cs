namespace diversitytracker.api.Models
{
    public class FormSubmissionsData
    {
        public required ICollection<FormSubmission> FormSubmissions { get; set; }
        public DateTime RequestedAt { get; set; }
    }
}