using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationService
    {
        Task<string> InterpretAnswers(string? customPrompt, string[] answers);
        Task<List<AiInterpretation>> InterperetFormData(List<FormSubmission> formSubmissions, List<QuestionType> questions);
        Task<AiInterpretation> InterperetAllReflectionsFormsAsync();
        Task<AiInterpretation> InterperetAllRealDataAsync();
        Task<AiInterpretation> InterperetAllQuestionsAsync();
        Task<AiInterpretation> InterperetRealDataSeperatedAsync();
        Task<AiInterpretation> InterperetQuestionAsync();
    }
}