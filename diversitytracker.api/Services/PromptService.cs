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

        public string CreateRealdataPrompt(Dictionary<string, double[]> realData)
        {
             StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions and answers where people ranked 0-10. The Question and answers section is seperated by || \n I want you to draw real world conclusions about the data more highlighting the emotional/personal points based on the data. Do not give answer on the data values themselves. Answer in under 50 words.\n\n");
            
            foreach (var kvp in realData)
            {
                string key = kvp.Key;
                double[] values = kvp.Value;
                
                promptBuilder.AppendLine($"{kvp} || \n");
                foreach (var value in values)
                {
                    promptBuilder.AppendLine($"- {Math.Round(value)}\n");
                }

                promptBuilder.AppendLine("->-");
            }
            var prompt = promptBuilder.ToString();

            return prompt;
        }

        public string CreateRealdataMultiplePrompt(Dictionary<string, double[]> realData)
        {
             StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions and answers where many individuals ranked 0-10. The Question and answers section is seperated by || \n I want you to reflect on what people have answered and draw meaningful insights about the data more highlighting the emotional and interpersonal conclusions based on the data. Draw on the negative and positive points. Every section is seperated by ->- . I want you to give one answer per section and seperate the answers by two new lines. Don't give an answer on the data values themselves. Answer in between 100-120 words for each question/answers. Only give me a text no bullet points or similar. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");
            
            foreach (var kvp in realData)
            {
                string key = kvp.Key;
                double[] values = kvp.Value;
                
                promptBuilder.AppendLine($"{key} || \n");
                foreach (var value in values)
                {
                    promptBuilder.AppendLine($"- {Math.Round(value)}\n");
                }

                promptBuilder.AppendLine("->-");
            }
            var prompt = promptBuilder.ToString();

            return prompt;
        }

        public string CreateQuestionAnswersDataPrompt(Dictionary<string, string[]> questionAnswerData)
        {

            StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! The Question contra answer inside a section is seperated by ||. The sections of one question/answer are seperated by ->- \n I want you to draw real world conclusions about the answers related to the given question more highlighting the problem areas in the organization but also some objective conclusions. Give a 85-120 word answer for each question/answers section. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");

            foreach (var kvp in questionAnswerData)
            {
                string key = kvp.Key;
                string[] answers = kvp.Value;

                promptBuilder.AppendLine($"Question: [{key}] ||\n");
                
                foreach (var answer in answers)
                {
                    promptBuilder.AppendLine($"- {answer} \n");
                }

                promptBuilder.AppendLine("->- \n");
            }

            return promptBuilder.ToString();
        }

        public string CreateDataFromQuestionAnswersPrompt(Dictionary<string, string[]> questionAnswerData)
        {

            StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! Do not include the question itself JUST the arrays! The Question and answers section is seperated by || \n . I want you to write an array of values 0-10 for each persons answer and bundle them into one array per question. 0 being poor, 10 being really good opinion. The sections are seperated by ->-. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");

            foreach (var kvp in questionAnswerData)
            {
                string key = kvp.Key;
                string[] answers = kvp.Value;

                promptBuilder.AppendLine($"Question: [{key}] ||\n");
                
                foreach (var answer in answers)
                {
                    if (!string.IsNullOrEmpty(answer))
                    {
                        promptBuilder.AppendLine($"- {answer} \n");
                    }
                }

                promptBuilder.AppendLine("->- \n");
            }

            return promptBuilder.ToString();
        }

        public string CountQuestionWordLengthPrompt(Dictionary<string, string[]> questionAnswerData)
        {

            StringBuilder promptBuilder = new StringBuilder(
                    $"I want you to write an array of number of words contained in each persons answer and bundle them into one array per question. Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! The Question and answers section is seperated by || \n .  The sections are seperated by ->- . It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");

            foreach (var kvp in questionAnswerData)
            {
                string key = kvp.Key;
                string[] answers = kvp.Value;

                promptBuilder.AppendLine($"Question: [{key}] ||\n");
                
                foreach (var answer in answers)
                {
                    if (!string.IsNullOrEmpty(answer))
                    {
                        promptBuilder.AppendLine($"- {answer} \n");
                    }
                }

                promptBuilder.AppendLine("->- \n");
            }

            return promptBuilder.ToString();
        }
    }
}