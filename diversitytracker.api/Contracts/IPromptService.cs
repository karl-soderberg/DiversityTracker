namespace diversitytracker.api.Contracts
{
    public interface IPromptService
    {
        string CreateReflectionAnswersDataPrompt(List<string> reflectionAnswerData);
        string CreatePromptFromDictionary<T>(Dictionary<string, T[]> data, string header, string itemPrefix, string sectionSeparator, string sectionHeader, Func<T, string> itemFormatter);
    }
}