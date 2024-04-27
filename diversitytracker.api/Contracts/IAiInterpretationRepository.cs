using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationRepository
    {
        Task<AiInterpretation> GetAiInterpretationAsync();
        Task UpdateAiInterpretationAsync(AiInterpretation aiInterpretation);
        Task<AiInterpretation> AddAiInterpretationAsync(AiInterpretation aiInterpretation);
    }
}