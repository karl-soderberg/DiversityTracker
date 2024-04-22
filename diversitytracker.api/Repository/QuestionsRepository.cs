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
        public async Task<List<QuestionType>> GetQuestionTypes()
        {
            return await _context.QuestionTypes.ToListAsync();
        }

        public async Task<QuestionType> GetQuestionTypeById(string id)
        {
            return await _context.QuestionTypes.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<QuestionType> AddQuestionType(QuestionType questionType)
        {
            await _context.QuestionTypes.AddAsync(questionType);
            await _context.SaveChangesAsync();
            return questionType;
        }

        public async Task UpdateQuestionType(QuestionType questionType)
        {
            _context.QuestionTypes.Update(questionType);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteQuestionType(string id)
        {
            var questionDeleteRequest = await GetQuestionTypeById(id);
            _context.QuestionTypes.Remove(questionDeleteRequest);
            await _context.SaveChangesAsync();
        }
    }
}