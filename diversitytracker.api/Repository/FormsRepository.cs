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
        public async Task<FormSubmission> AddFormAsync(FormSubmission baseForm)
        {
            await _context.FormSubmissionsData.AddAsync(baseForm);
            await _context.SaveChangesAsync();
            return baseForm;
        }

        public async Task<List<FormSubmission>> GetFormsAsync()
        {
            return await _context.FormSubmissionsData.ToListAsync();
        }
    }
}