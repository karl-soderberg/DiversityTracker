namespace diversitytracker.api.Contracts
{
    public interface IPromptService
    {
        string CreateReflectionAnswersDataPrompt(List<string> reflectionAnswerData);
        string CreateRealdataPrompt(Dictionary<string, double[]> realData);
        string CreateRealdataMultiplePrompt(Dictionary<string, double[]> realData);
        string CreateQuestionAnswersDataPrompt(Dictionary<string, string[]> questionAnswerData);
        string CreateDataFromQuestionAnswersPrompt(Dictionary<string, string[]> questionAnswerData);
        string CountQuestionWordLengthPrompt(Dictionary<string, string[]> questionAnswerData);
    }
}