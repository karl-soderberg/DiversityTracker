using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationService
    {
        // Task<string> InterpretAnswers(string? customPrompt, string[] answers);
        // Task<List<AiInterpretation>> InterperetFormData(List<FormSubmission> formSubmissions, List<QuestionType> questions);
        Task<AiInterpretation> InterperetAllReflectionsFormsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetAllRealDataAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetAllQuestionsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetRealDataSeperatedAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes);
        Task<AiInterpretation> InterperetQuestionAsync();
    }
}