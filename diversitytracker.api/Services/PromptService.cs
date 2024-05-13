using System.Text;
using diversitytracker.api.Contracts;

namespace diversitytracker.api.Services
{
    public class PromptService : IPromptService
    {
        public string CreateReflectionAnswersDataPrompt(List<string> reflectionAnswerData)
        {
            StringBuilder promptBuilder = new StringBuilder("Here is a collection of anonymous reflections from multiple individuals about an organization. Interpret the collection of reflections as a whole with a short and concise professional analysis and summary. Make it under 75 words: It's Important that you seperate YOUR ANSWERS with the sign ||\n\n");
            foreach (var input in reflectionAnswerData)
            {
                promptBuilder.AppendLine($"- {input}");
            }
            return promptBuilder.ToString();
        }

        public string CreatePromptFromDictionary<T>(Dictionary<string, T[]> data, string header, string itemPrefix, string sectionSeparator, string sectionHeader, Func<T, string> itemFormatter)
        {
            StringBuilder promptBuilder = new StringBuilder(header);
            
            foreach (var kvp in data)
            {
                promptBuilder.AppendLine($"{sectionHeader} [{kvp.Key}] || \n");
                foreach (var item in kvp.Value)
                {
                    promptBuilder.AppendLine($"{itemPrefix}{itemFormatter(item)}");
                }
                promptBuilder.AppendLine($"{sectionSeparator}\n");
            }

            return promptBuilder.ToString();
        }
    }
}