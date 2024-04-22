using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsRepository
    {
        Task<List<FormSubmission>> GetFormsAsync();
        Task<FormSubmission> AddFormAsync(FormSubmission baseForm); 
    }
}