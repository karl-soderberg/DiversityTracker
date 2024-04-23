using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IQuestionsRepository
    {
        Task<List<QuestionType>> GetQuestionTypesAsync();
        Task<QuestionType> GetQuestionTypeByIdAsync(string id);
        Task<QuestionType> AddQuestionTypeAsync(QuestionType questionType); 
        Task UpdateQuestionTypeAsync(QuestionType questionType);
        Task DeleteQuestionTypeAsync(string id);
    }
}