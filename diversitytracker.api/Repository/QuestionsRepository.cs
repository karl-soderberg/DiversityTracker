using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class QuestionsRepository : IQuestionsRepository
    {
        private readonly AppDbContext _context;

        public QuestionsRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<List<QuestionType>> GetQuestionTypesAsync()
        {
            return await _context.QuestionTypes.ToListAsync();
        }

        public async Task<QuestionType> GetQuestionTypeByIdAsync(string id)
        {
            return await _context.QuestionTypes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<QuestionType> AddQuestionTypeAsync(QuestionType questionType)
        {
            await _context.QuestionTypes.AddAsync(questionType);
            await _context.SaveChangesAsync();
            return questionType;
        }

        public async Task UpdateQuestionTypeAsync(QuestionType questionType)
        {
            _context.QuestionTypes.Update(questionType);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestionTypeAsync(string id)
        {
            var questionDeleteRequest = await GetQuestionTypeByIdAsync(id);
            _context.QuestionTypes.Remove(questionDeleteRequest);
            await _context.SaveChangesAsync();
        }
    }
}