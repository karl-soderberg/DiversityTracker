using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class FormsDataRepository : IFormsRepository
    {
        private readonly AppDbContext _context;

        public FormsDataRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<FormSubmission> AddFormAsync(FormSubmission baseForm)
        {
            await _context.FormSubmissionsData.AddAsync(baseForm);
            await _context.SaveChangesAsync();
            return baseForm;
        }

        public async Task<List<FormSubmission>> GetFormsAsync(DateTime? startDate, DateTime? endDate)
        {
            IQueryable<FormSubmission> query = _context.FormSubmissionsData.Include(form => form.Questions).Include(form => form.Person);

            if (startDate != null)
            {
                query = query.Where(form => form.CreatedAt >= startDate);
            }

            if (endDate != null)
            {
                query = query.Where(form => form.CreatedAt <= endDate);
            }

            var formSubmissions = await query.ToListAsync();

            return formSubmissions;
        }
        public async Task<FormSubmission> GetFormSubmissionByIdAsync(string id)
        {
            return await _context.FormSubmissionsData.Include(form => form.Questions).Include(form => form.Person).FirstOrDefaultAsync(form => form.Id == id);
        }

        public async Task UpdateFormAsync(FormSubmission formSubmission)
        {
            _context.FormSubmissionsData.Update(formSubmission);
            await _context.SaveChangesAsync();
        }
    }
}