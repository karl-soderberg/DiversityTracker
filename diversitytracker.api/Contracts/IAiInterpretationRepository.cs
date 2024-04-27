using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationRepository
    {
        Task<List<AiInterpretation>> GetAiInterpretationAsync();
        Task UpdateAiInterpretationAsync(AiInterpretation questionType);
    }
}