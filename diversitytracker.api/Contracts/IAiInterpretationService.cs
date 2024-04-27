using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationService
    {
        Task<string> InterpretAnswers(string? customPrompt, string[] answers);
        Task<List<AiInterpretation>> InterperetFormData(List<FormSubmission> formSubmissions, List<QuestionType> questions);
    }
}