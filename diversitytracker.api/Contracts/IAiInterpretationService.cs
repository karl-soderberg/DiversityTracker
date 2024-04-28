using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationService
    {
        Task<AiInterpretation> InterperetAllReflectionsFormsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetAllRealDataAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetAllQuestionsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetRealDataSeperatedAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> CreateDataFromQuestionAnswers(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetQuestionAsync(QuestionType questionType);
    }
}