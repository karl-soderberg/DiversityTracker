using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class FormsRepository : IFormsRepository
    {
         private readonly AppDbContext _context;

        public FormsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<BaseForm> AddFormAsync(BaseForm baseForm)
        {
            await _context.AddAsync(baseForm);
            await _context.SaveChangesAsync();
            return baseForm;
        }

        public async Task<List<BaseForm>> GetFormsAsync()
        {
            return await _context.BaseFormsData.ToListAsync();
        }
    }
}