using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class FormsRepository : IFormsRepository, IQuestionRepository
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
            return await _context.FormSubmissionsData.Include(form => form.Questions).Include(form => form.Person).ToListAsync();
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
    }
}