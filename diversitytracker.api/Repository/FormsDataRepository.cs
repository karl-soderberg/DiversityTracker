using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class FormsDataRepository : IFormsDataRepository
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
        public async Task<FormSubmission> GetFormSubmissionById(int id)
        {
            return await _context.FormSubmissionsData.FirstOrDefaultAsync(form => form.Id == id);
        }
        public async Task<List<QuestionType>> GetQuestionTypes()
        {
            return await _context.QuestionTypes.ToListAsync();
        }

        public async Task<QuestionType> AddQuestionType(QuestionType questionType)
        {
            await _context.QuestionTypes.AddAsync(questionType);
            await _context.SaveChangesAsync();
            return questionType;
        }

        public async Task<QuestionType> GetQuestionTypeById(int id)
        {
            return await _context.QuestionTypes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task DeleteQuestionType(int id)
        {
            var questionDeleteRequest = await GetQuestionTypeById(id);
            _context.QuestionTypes.Remove(questionDeleteRequest);
            await _context.SaveChangesAsync();
        }
    }
}