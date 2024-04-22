using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Models;

namespace diversitytracker.api.Contracts
{
    public interface IFormsDataRepository
    {
        Task<List<FormSubmission>> GetFormsAsync(DateTime? startDate, DateTime? endDate);
        Task<FormSubmission> GetFormSubmissionById(string id);
        Task<FormSubmission> AddFormAsync(FormSubmission baseForm); 
        Task UpdateForm(FormSubmission formSubmission);
        Task<List<QuestionType>> GetQuestionTypes();
        Task<QuestionType> GetQuestionTypeById(string id);
        Task<QuestionType> AddQuestionType(QuestionType questionType); 
        Task UpdateQuestionType(QuestionType questionType);
        Task DeleteQuestionType(string id);
    }
}