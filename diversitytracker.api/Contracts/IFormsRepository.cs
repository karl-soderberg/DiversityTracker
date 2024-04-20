using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsRepository
    {
        Task<List<BaseForm>> GetFormsAsync();
        Task<BaseForm> AddFormAsync(BaseForm baseForm); 
    }
}