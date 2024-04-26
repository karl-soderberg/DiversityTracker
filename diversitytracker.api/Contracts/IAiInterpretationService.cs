namespace diversitytracker.api.Contracts
{
    public interface IAiInterpretationService
    {
        Task<string> InterpretAnswers(string? customPrompt, string[] answers);
    }
}