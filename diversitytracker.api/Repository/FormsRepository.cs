using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Contracts;
using diversitytracker.api.Models;

namespace diversitytracker.api.Repository
{
    public class FormsRepository : IFormsRepository
    {
        public Task<BaseForm> AddFormAsync(BaseForm baseForm)
        {
            throw new NotImplementedException();
        }

        public Task<List<BaseForm>> GetFormsAsync()
        {
            throw new NotImplementedException();
        }
    }
}