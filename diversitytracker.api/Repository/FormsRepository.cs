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
            return await _context.FormSubmissionsData.ToListAsync();
        }

        public async Task<QuestionType> AddQuestionType(QuestionType questionType)
        {
            await _context.Questions.AddAsync(questionType);
            await _context.SaveChangesAsync();
            return questionType;
        }

        public Task<List<QuestionType>> GetQuestionTypes()
        {
            throw new NotImplementedException();
        }
    }
}