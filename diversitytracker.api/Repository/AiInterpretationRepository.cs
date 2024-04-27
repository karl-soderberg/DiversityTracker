using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Models.OpenAi;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Repository
{
    public class AiInterpretationRepository : IAiInterpretationRepository
    {
        private readonly AppDbContext _context;

        public AiInterpretationRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<AiInterpretation> GetAiInterpretationAsync()
        {
            return await _context.AiInterpretations.FirstOrDefaultAsync();
        }

        public async Task UpdateAiInterpretationAsync(AiInterpretation aiInterpretation)
        {
            _context.AiInterpretations.Update(aiInterpretation);
            await _context.SaveChangesAsync();
        }

        public async Task<AiInterpretation> AddAiInterpretationAsync(AiInterpretation aiInterpretation)
        {
            await _context.AiInterpretations.AddAsync(aiInterpretation);
            await _context.SaveChangesAsync();
            return aiInterpretation;
        }
    }
}