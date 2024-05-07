using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
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
        private readonly IPromptService _promptService;

        public AiInterpretationService(HttpClient httpClient, IConfiguration configuration, IQuestionsRepository questionsRepository, IAiInterpretationRepository aiInterpretationRepository, IPromptService promptService)
        {
            _apiKey = configuration["OpenAi:apiKey"];
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {_apiKey}");
            _questionsRepository = questionsRepository;
            _aiInterpretationRepository = aiInterpretationRepository;
            _promptService = promptService;
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

        public async Task<AiInterpretation> InterperetAllPersonalReflections(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            List<string> reflectionAnswersData = formSubmissions.Select(form => form.Person.PersonalReflection).ToList();

            var reflectionPrompt = _promptService.CreateReflectionAnswersDataPrompt(reflectionAnswersData);
            var reflectionInterpretation = await OpenAIInterperet(reflectionPrompt);
            reflectionInterpretation = reflectionInterpretation.Replace("||", "");

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();
            if (aiInterpretation == null)
            {
                aiInterpretation = new AiInterpretation()
                {
                    ReflectionsInterpretation = reflectionInterpretation,
                };
                await _aiInterpretationRepository.AddAiInterpretationAsync(aiInterpretation);
            }
            else
            {
                aiInterpretation.ReflectionsInterpretation = reflectionInterpretation;
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
            }

            return aiInterpretation;     
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

            var realDataPrompt = _promptService.CreateRealdataPrompt(realData);
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

            var realDataSeperatedPrompt = _promptService.CreateRealdataMultiplePrompt(realData);
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

        public async Task<AiInterpretation> InterperetAllQuestionsAsync(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var questionAnswersData = new Dictionary<string, string[]>();

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    if (string.IsNullOrWhiteSpace(question.Answer))
                    continue;

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

            var questionAnswerPrompt = _promptService.CreateQuestionAnswersDataPrompt(questionAnswersData);
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

        public async Task<AiInterpretation> CreateDataFromQuestionAnswers(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
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

            var questionDataPrompt = _promptService.CreateDataFromQuestionAnswersPrompt(questionAnswersData);
            var questionWordLengthPrompt = _promptService.CountQuestionWordLengthPrompt(questionAnswersData);

            var questionDataAiInterpretation = await OpenAIInterperet(questionDataPrompt);
            var questionWordLengthAiInterpretation = await OpenAIInterperet(questionWordLengthPrompt);

            var linesAnswers = questionDataAiInterpretation.Split(new[] { '\n' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(line => line.Trim())
                .ToArray();

            var linesWordLength = questionWordLengthAiInterpretation.Split(new[] { '\n' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(line => line.Trim())
                .ToArray();

            List<double[]> questionsDataAiMatches = new List<double[]>();
            List<double[]> questionsWordLengthAiMatches = new List<double[]>();

            foreach (var line in linesAnswers)
            {
                var trimmedLine = line.Trim('[', ']');
                double[] numbers = trimmedLine.Split(',')
                                            .Select(n => double.Parse(n.Trim()))
                                            .ToArray();
                questionsDataAiMatches.Add(numbers);
            }

            foreach (var line in linesWordLength)
            {
                var trimmedLine = line.Trim('[', ']');
                double[] numbers = trimmedLine.Split(',')
                                            .Select(n => double.Parse(n.Trim()))
                                            .ToArray();
                questionsWordLengthAiMatches.Add(numbers);
            }


            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();

            var wasnull = false;
            if(aiInterpretation == null)
            {
                aiInterpretation = new AiInterpretation
                {
                    QuestionInterpretations = new List<AiQuestionInterpretation>(),
                };
                wasnull = true;
            }
            else if(aiInterpretation.QuestionInterpretations == null)
            {
                aiInterpretation.QuestionInterpretations = new List<AiQuestionInterpretation>(){};
            };
            

            foreach (var questionInterpretation in aiInterpretation.QuestionInterpretations)
            {
                if (questionInterpretation.aiAnswerData == null)
                {
                    questionInterpretation.aiAnswerData = new AiAnswerData();
                }
            }

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    if (idx >= questionsDataAiMatches.Count || idx >= questionsWordLengthAiMatches.Count)
                    {
                        continue;
                    }
                    var fetchQuestionType = await _questionsRepository.GetQuestionTypeByIdAsync(question.QuestionTypeId);
                    
                    if(!aiInterpretation.QuestionInterpretations.Any(i => i.QuestionTypeId == question.QuestionTypeId))
                    {
                        var newAiAnswerData = new AiAnswerData(){
                            Value = questionsDataAiMatches[idx],
                            WordLength = questionsWordLengthAiMatches[idx]
                        };

                        var questionInterpretation = new AiQuestionInterpretation()
                        {
                            QuestionTypeId = fetchQuestionType.Id,
                            QuestionType = fetchQuestionType,
                            aiAnswerData = newAiAnswerData
                        };
                        aiInterpretation.QuestionInterpretations.Add(questionInterpretation);
                    }
                    else
                    {
                        aiInterpretation.QuestionInterpretations[idx].aiAnswerData.Value = questionsDataAiMatches[idx];
                        aiInterpretation.QuestionInterpretations[idx].aiAnswerData.WordLength = questionsWordLengthAiMatches[idx];
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
    }
}