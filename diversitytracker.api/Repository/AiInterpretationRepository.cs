using diversitytracker.api.Contracts;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Repository
{
    public class AiInterpretationRepository : IAiInterpretationRepository
    {
        public Task<List<AiInterpretation>> GetAiInterpretationAsync()
        {
            throw new NotImplementedException();
        }

        public Task UpdateAiInterpretationAsync(AiInterpretation questionType)
        {
            throw new NotImplementedException();
        }
    }
}