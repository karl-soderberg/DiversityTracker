using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsRepository
    {
        Task<List<BaseForm>> GetFormsAsync();
        Task<BaseForm> AddFormAsync(BaseForm baseForm); 
    }
}