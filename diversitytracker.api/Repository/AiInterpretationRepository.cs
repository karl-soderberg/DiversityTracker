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
            return await _context.AiInterpretations.Include(inter => inter.QuestionInterpretations).FirstOrDefaultAsync();
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
    
        public async Task DeleteAiInterpretationAsync()
        {
            var aiInterpretation = await GetAiInterpretationAsync();
            _context.AiInterpretations.Remove(aiInterpretation);
            await _context.SaveChangesAsync();
        }
    }
}