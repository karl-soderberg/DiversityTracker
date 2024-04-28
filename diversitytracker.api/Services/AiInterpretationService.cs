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
        private readonly IQuestionsRepository _questionsRepository;
        private readonly IAiInterpretationRepository _aiInterpretationRepository;

        public AiInterpretationService(HttpClient httpClient, IConfiguration configuration, IQuestionsRepository questionsRepository, IAiInterpretationRepository aiInterpretationRepository)
        {
            _apiKey = configuration["OpenAi:apiKey"];
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            _questionsRepository = questionsRepository;
            _aiInterpretationRepository = aiInterpretationRepository;
        }
        private async Task<string> OpenAIInterperet(string prompt)
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

        public async Task<AiInterpretation> InterperetAllReflectionsFormsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            List<string> reflectionAnswersData = new List<string>();

            foreach(var form in formSubmissions)
            {
                reflectionAnswersData.Add(form.Person.PersonalReflection);
            }

            var reflectionPrompt = CreateReflectionAnswersDataPrompt(reflectionAnswersData);
            var reflectionInterpretation = await OpenAIInterperet(reflectionPrompt);

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();
            if(aiInterpretation == null)
            {
                var newAiInterpretation = new AiInterpretation()
                {
                    ReflectionsInterpretation = reflectionInterpretation,
                };
                await _aiInterpretationRepository.AddAiInterpretationAsync(newAiInterpretation);
                
                return newAiInterpretation;
            }
            else
            {
                aiInterpretation.ReflectionsInterpretation = reflectionInterpretation;
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
                
                return aiInterpretation;
            }
        }

        public async Task<AiInterpretation> InterperetAllRealDataAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var realData = new Dictionary<string, double[]>();

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

            var realDataPrompt = CreateRealdataPrompt(realData);
            var realDataInterpretation = await OpenAIInterperet(realDataPrompt);

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();

            if(aiInterpretation == null)
            {
                var newAiInterpretation = new AiInterpretation()
                {
                    RealDataInterpretation = realDataInterpretation,
                };
                await _aiInterpretationRepository.AddAiInterpretationAsync(newAiInterpretation);
                
                return newAiInterpretation;
            }
            else
            {
                aiInterpretation.RealDataInterpretation = realDataInterpretation;
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
                
                return aiInterpretation;
            }


        }

        public async Task<AiInterpretation> InterperetAllQuestionsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var questionAnswersData = new Dictionary<string, string[]>();

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

            var questionAnswerPrompt = CreateQuestionAnswersDataPrompt(questionAnswersData);
            var questionAnswerInterpretation = await OpenAIInterperet(questionAnswerPrompt);
            var questionAnswerInterpretations = questionAnswerInterpretation.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();

            var wasnull = false;
            if(aiInterpretation == null)
            {
                aiInterpretation = new AiInterpretation
                {
                    QuestionInterpretations = new List<AiQuestionInterpretation>()
                };
                wasnull = true;
            }
            else if(aiInterpretation.QuestionInterpretations == null)
            {
                aiInterpretation.QuestionInterpretations = new List<AiQuestionInterpretation>();
            };

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    var fetchQuestionType = await _questionsRepository.GetQuestionTypeByIdAsync(question.QuestionTypeId);
                    
                    if(!aiInterpretation.QuestionInterpretations.Any(i => i.QuestionTypeId == question.QuestionTypeId))
                    {
                        var questionInterpretation = new AiQuestionInterpretation()
                        {
                            QuestionTypeId = fetchQuestionType.Id,
                            QuestionType = fetchQuestionType,
                            AnswerInterpretation = questionAnswerInterpretations[idx],
                        };
                        aiInterpretation.QuestionInterpretations.Add(questionInterpretation);
                    }
                    else
                    {
                        aiInterpretation.QuestionInterpretations[idx].AnswerInterpretation = questionAnswerInterpretations[idx];
                    }
                    idx++;
                }
            }

            if(wasnull)
            {
                await _aiInterpretationRepository.AddAiInterpretationAsync(aiInterpretation);
            }
            else
            {
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
            } 

            return aiInterpretation;
        }

        public async Task<AiInterpretation> InterperetRealDataSeperatedAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var realData = new Dictionary<string, double[]>();

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

            var realDataSeperatedPrompt = CreateRealdataMultiblePrompt(realData);
            var realDataSeperatedInterpretation = await OpenAIInterperet(realDataSeperatedPrompt);
            var realDataSeperatedInterpretations = realDataSeperatedInterpretation.Split(new string[] { "\n\n" }, StringSplitOptions.RemoveEmptyEntries);

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();

            var wasnull = false;
            if(aiInterpretation == null)
            {
                aiInterpretation = new AiInterpretation
                {
                    QuestionInterpretations = new List<AiQuestionInterpretation>()
                };
                wasnull = true;
            }
            else if(aiInterpretation.QuestionInterpretations == null)
            {
                aiInterpretation.QuestionInterpretations = new List<AiQuestionInterpretation>();
            };

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    var fetchQuestionType = await _questionsRepository.GetQuestionTypeByIdAsync(question.QuestionTypeId);
                    if(!aiInterpretation.QuestionInterpretations.Any(i => i.QuestionTypeId == question.QuestionTypeId))
                    {
                        var questionInterpretation = new AiQuestionInterpretation()
                        {
                            QuestionTypeId = fetchQuestionType.Id,
                            QuestionType = fetchQuestionType,
                            ValueInterpretation = realDataSeperatedInterpretations[idx]
                        };
                        aiInterpretation.QuestionInterpretations.Add(questionInterpretation);
                    }
                    else
                    {
                        aiInterpretation.QuestionInterpretations[idx].ValueInterpretation = realDataSeperatedInterpretations[idx];
                    }
                    idx++;
                }
            }

            if(wasnull)
            {
                await _aiInterpretationRepository.AddAiInterpretationAsync(aiInterpretation);
            }
            else
            {
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
            } 

            return aiInterpretation;
        }

        private string CreateRealdataMultiblePrompt(Dictionary<string, double[]> realData)
        {
             StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions and answers where many individuals ranked 0-10. The Question and answers section is seperated by || \n I want you to draw real world conclusions about the data more highlighting the emotional and interpersonal insights based on the data. Every section is seperated by ->- . I want you to give one answer per section and seperate the answers by two new lines. Don't give an answer on the data values themselves. Answer in under 20-50 words for each question/answers. Only give me a text no bullet points or similar. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");
            
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

        private string CreateRealdataPrompt(Dictionary<string, double[]> realData)
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
        private string CreateQuestionAnswersDataPrompt(Dictionary<string, string[]> questionAnswerData)
        {

            StringBuilder promptBuilder = new StringBuilder(
                    $"Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! The Question and answers section is seperated by || \n I want you to draw real world conclusions about the answers related to the given question more highlighting the problem areas in the organization but also some objective conclusions. Give a 20-50 word answer for each question/answers section. The sections are seperated by ->- .It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n");

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

        public Task<AiInterpretation> CreateDataFromQuestionAnswers(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            throw new NotImplementedException();
        }

        public Task<AiInterpretation> InterperetQuestionAsync(QuestionType questionType)
        {
            throw new NotImplementedException();
        }
    }
}