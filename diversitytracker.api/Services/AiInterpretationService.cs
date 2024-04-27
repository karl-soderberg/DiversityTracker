using System.Text;
using System.Text.Json;
using diversitytracker.api.Contracts;
using diversitytracker.api.Models;
using diversitytracker.api.Models.AI;
using diversitytracker.api.Models.OpenAi;

namespace diversitytracker.api.Services
{
    public class AiInterpretationService : IAiInterpretationService
    {
        private readonly HttpClient _httpClient;
        private readonly string _apiKey;

        public AiInterpretationService(HttpClient httpClient, IConfiguration configuration)
        {
            _apiKey = configuration["OpenAi:apiKey"];
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
        }

        public async Task<List<AiInterpretation>> InterperetFormData(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var realData = new Dictionary<string, double[]>();
            var questionAnswersData = new Dictionary<string, string[]>();
            List<string> reflectionAnswersData = new List<string>();

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    if (realData.ContainsKey(questionTypes[idx].Value))
                    {
                        realData[questionTypes[idx].Value] = realData[questionTypes[idx].Value].Append(question.Value).ToArray();
                    }
                    else
                    {
                        realData[questionTypes[idx].Value] = new double[] { question.Value };
                    }
                    idx++;
                }
            }

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    if (questionAnswersData.ContainsKey(questionTypes[idx].Value))
                    {
                        List<string> tempList = questionAnswersData[questionTypes[idx].Value].ToList();
                        tempList.Add(question.Answer);
                        questionAnswersData[questionTypes[idx].Value] = tempList.ToArray();
                    }
                    else
                    {
                        questionAnswersData[questionTypes[idx].Value] = new string[] { question.Answer };
                    }
                    idx++;
                }
            }

            foreach(var form in formSubmissions)
            {
                reflectionAnswersData.Add(form.Person.PersonalReflection);
            }

            var reflectionPrompt = CreateReflectionAnswersDataPrompt(reflectionAnswersData);
            var realDataPrompt = CreateRealdataPrompt(realData);
            var questionAnswerPrompt = CreateQuestionAnswersDataPrompt(questionAnswersData);


            // var reflectionInterpretation = await OpenAIInterperet(reflectionPrompt);
            // var realDataInterpretation = new Dictionary<string, string>();
            // var questionAnswersInterpretation = new Dictionary<string, string>();

            // foreach (var kvp in realDataPromptDict)
            // {
            //     string key = kvp.Key;
            //     string value = kvp.Value;
                
            //     var openAiInterpretation = await OpenAIInterperet(value);

            //     realDataInterpretation[key] = openAiInterpretation;
            // }

            // foreach (var kvp in questionanswerPromptDict)
            // {
            //     string key = kvp.Key;
            //     string value = kvp.Value;
                
            //     var openAiInterpretation = await OpenAIInterperet(value);

            //     questionAnswersInterpretation[key] = openAiInterpretation;
            // } 
            
            
            throw new NotImplementedException();
        }

        public async Task<string> OpenAIInterperet(string prompt)
        {
            var data = new 
            { 
                model = "gpt-3.5-turbo", 
                messages = new[] 
                {
                    new 
                    {
                        role = "user", 
                        content = prompt
                    }
                }
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var jsonContent = JsonSerializer.Serialize(data, options);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);         
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadFromJsonAsync<OpenAIApiResponse>();

            string openAIAnswer = jsonResponse.Choices[0].Message.Content;
            return openAIAnswer;
        }

        public async Task<string> InterpretAnswers(string? customPrompt, string[] inputs)
        {
            string prompt = customPrompt == null ? CreatePrompt(inputs) : CreatePrompt(customPrompt, inputs);
            
            var data = new 
            { 
                model = "gpt-3.5-turbo", 
                messages = new[] 
                {
                    new 
                    {
                        role = "user", 
                        content = prompt
                    }
                }
            };

            var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
            var jsonContent = JsonSerializer.Serialize(data, options);
            var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

            HttpResponseMessage response = await _httpClient.PostAsync("https://api.openai.com/v1/chat/completions", content);         
            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadFromJsonAsync<OpenAIApiResponse>();

            string resultInterperetation = jsonResponse.Choices[0].Message.Content;
            return resultInterperetation;
        }
        private string CreateRealdataPrompt(Dictionary<string, double[]> realData)
        {
            var realDataPrompts = new Dictionary<string, string>();

             StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions and answers where people ranked 0-10. The Question and answers section is seperated by || \n I want you to draw real world conclusions about the data more highlighting the emotional/personal points based on the data. We already have a graph so you don't need to give answer on the data values themselves. Answer in under 50 words: I want you to give one 50 word answer for each question/answers. They are seperated by ->- . It's Important that you seperate YOUR ANSWERS with the sign ||\n\n");
            
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
                
                // realDataPrompts[key] = prompt;
            }
            var prompt = promptBuilder.ToString();

            return prompt;
        }
        private string CreateQuestionAnswersDataPrompt(Dictionary<string, string[]> questionAnswerData)
        {
            var questionAnswersDataPrompts = new Dictionary<string, string>();
            var questionAnswerDataPrompt = new StringBuilder();

            StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions and answers where people ranked 0-10. The Question and answers section is seperated by || \n I want you to draw real world conclusions about the answers related to the given question more highlighting the emotional/personal points. We already have a graph so you don't need to give answer on the data values themselves. Answer in under 50 words: I want you to give one 50 word answer for each question/answers section. The sections are seperated by ->- . I want you to give me the under 50 word answers seperated by ||. It's Important that you seperate YOUR ANSWERS with the sign ||\n\n");

            foreach (var kvp in questionAnswerData)
            {
                string key = kvp.Key;
                string[] answers = kvp.Value;

                promptBuilder.AppendLine($"Question: {kvp} ||\n");
                
                foreach (var answer in answers)
                {
                    promptBuilder.AppendLine($"- {answer} \n");
                }

                promptBuilder.AppendLine("->- \n");

                // var prompt = promptBuilder.ToString();

                // questionAnswersDataPrompts[key] = prompt;
            }


            return promptBuilder.ToString();
        }
        private string CreateReflectionAnswersDataPrompt(List<string> reflectionAnswerData)
        {
            StringBuilder promptBuilder = new StringBuilder("Here is a collection of anonymous reflections from multiple individuals about an organization. Interpret the collection of reflections as a whole with a short and concise professional analysis and summary. Make it under 75 words: It's Important that you seperate YOUR ANSWERS with the sign ||\n\n");
            foreach (var input in reflectionAnswerData)
            {
                promptBuilder.AppendLine($"- {input}");
            }
            return promptBuilder.ToString();
        }
        private string CreatePrompt(string[] inputs)
        {
            StringBuilder promptBuilder = new StringBuilder("Here is a collection of anonymous answers from multiple individuals. Interpret the collection of answers as a whole with a short and concise professional analysis and summary. Make it under 50 words:\n\n");
            foreach (var input in inputs)
            {
                promptBuilder.AppendLine($"- {input}");
            }
            return promptBuilder.ToString();
        }

        private string CreatePrompt(string customPrompt, string[] inputs)
        {
            StringBuilder promptBuilder = new StringBuilder(customPrompt + " make it under 50 words:\n\n");
            foreach (var input in inputs)
            {
                promptBuilder.AppendLine($"- {input}");
            }
            return promptBuilder.ToString();
        }
    }
}