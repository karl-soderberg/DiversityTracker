using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsRepository
    {
        Task<List<FormSubmission>> GetFormsAsync(DateTime? startDate, DateTime? endDate);
        Task<FormSubmission> GetFormSubmissionById(string id);
        Task<FormSubmission> AddFormAsync(FormSubmission baseForm); 
        Task UpdateForm(FormSubmission formSubmission);
    }
}