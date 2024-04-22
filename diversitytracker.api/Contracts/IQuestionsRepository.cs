using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IQuestionsRepository
    {
        Task<List<QuestionType>> GetQuestionTypes();
        Task<QuestionType> GetQuestionTypeById(string id);
        Task<QuestionType> AddQuestionType(QuestionType questionType); 
        Task UpdateQuestionType(QuestionType questionType);
        Task DeleteQuestionType(string id);
    }
}