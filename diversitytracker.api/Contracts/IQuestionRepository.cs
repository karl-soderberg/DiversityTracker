using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IQuestionRepository
    {
        Task<List<QuestionType>> GetQuestionTypes();
        Task<QuestionType> AddQuestionType(QuestionType questionType); 
        Task<QuestionType> GetQuestionTypeById(int id);
    }
}