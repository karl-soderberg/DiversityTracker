using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsRepository
    {
        Task<List<FormSubmission>> GetFormsAsync(DateTime? startDate, DateTime? endDate);
        Task<FormSubmission> GetFormSubmissionByIdAsync(string id);
        Task<FormSubmission> AddFormAsync(FormSubmission baseForm); 
        Task UpdateFormAsync(FormSubmission formSubmission);
    }
}