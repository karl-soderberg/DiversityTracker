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
        private readonly string _apiKey;
        private readonly IQuestionsRepository _questionsRepository;
        private readonly IAiInterpretationRepository _aiInterpretationRepository;
        private readonly IPromptService _promptService;
        private readonly HttpClient _httpClient;

        public AiInterpretationService(
            HttpClient httpClient, 
            IConfiguration configuration, 
            IQuestionsRepository questionsRepository,
            IAiInterpretationRepository aiInterpretationRepository,
            IPromptService promptService)
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

        public async Task<AiInterpretation> InterperetAllData(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
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

            var realDataPrompt = _promptService.CreatePromptFromDictionary(realData,
                "Here is a collection of questions and answers where people ranked 0-10. The Question and answers section is seperated by || \n I want you to draw real world conclusions about the data more highlighting the emotional/personal points based on the data. Do not give answer on the data values themselves. Answer in under 50 words.\n\n",
                "- ", "->-", "", 
                value => Math.Round(value).ToString());;

            var realDataInterpretation = await OpenAIInterperet(realDataPrompt);

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();

            if (aiInterpretation == null)
            {
                aiInterpretation = new AiInterpretation()
                {
                    RealDataInterpretation = realDataInterpretation,
                };
                await _aiInterpretationRepository.AddAiInterpretationAsync(aiInterpretation);
            }
            else
            {
                aiInterpretation.RealDataInterpretation = realDataInterpretation;
                await _aiInterpretationRepository.UpdateAiInterpretationAsync(aiInterpretation);
            }

            return aiInterpretation;
        }

        public async Task<AiInterpretation> InterperetQuestionDataSeperated(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
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

            var realDataSeperatedPrompt = _promptService.CreatePromptFromDictionary(realData,
                $"Here is a collection of questions and answers where many individuals ranked 0-10. The Question and answers section is seperated by || \n I want you to reflect on what people have answered and draw meaningful insights about the data more highlighting the emotional and interpersonal conclusions based on the data. Draw on the negative and positive points. Every section is seperated by ->- . I want you to give one answer per section and seperate the answers by two new lines. Don't give an answer on the data values themselves. Answer in between 100-120 words for each question/answers. Only give me a text no bullet points or similar. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n",
                "", "->-", "", value => Math.Round(value).ToString());
                
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

        public async Task<AiInterpretation> InterperetQuestionAnswersSeperated(List<FormSubmission> formSubmissions, List<QuestionType> questionTypes)
        {
            var questionAnswersData = new Dictionary<string, string[]>();

            foreach(var form in formSubmissions)
            {
                int idx = 0;
                foreach(var question in form.Questions)
                {
                    if (string.IsNullOrWhiteSpace(question.Answer))
                    {
                        continue;
                    }

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

            var questionAnswerPrompt = _promptService.CreatePromptFromDictionary(questionAnswersData,
                $"Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! The Question contra answer inside a section is seperated by ||. The sections of one question/answer are seperated by ->- \n I want you to draw real world conclusions about the answers related to the given question more highlighting the problem areas in the organization but also some objective conclusions. Give a 85-120 word answer for each question/answers section. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n",
                "- ", "->- \n", "Question: ", value => value);
                
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

            var questionDataPrompt = _promptService.CreatePromptFromDictionary(questionAnswersData,
                $"Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! Do not include the question itself JUST the arrays! The Question and answers section is seperated by || \n . I want you to write an array of values 0-10 for each persons answer and bundle them into one array per question. 0 being poor, 10 being really good opinion. The sections are seperated by ->-. It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n",
                "- ", "->- \n", "Question: ", value => value);

            var questionWordLengthPrompt = _promptService.CreatePromptFromDictionary(questionAnswersData,
                $"I want you to write an array of number of words contained in each persons answer and bundle them into one array per question. Here is a collection of questions with answers from people working at an organization. It's Important that you seperate YOUR ANSWERS with two new lines! The Question and answers section is seperated by || \n .  The sections are seperated by ->- . It's Important that you seperate YOUR ANSWERS with two new lines.!\n\n",
                "", "->- \n", "Question: ", value => value.Split(' ').Length.ToString());

            var questionDataAiInterpretation = await OpenAIInterperet(questionDataPrompt);
            var questionWordLengthAiInterpretation = await OpenAIInterperet(questionWordLengthPrompt);

            var questionsDataAiMatches = questionDataAiInterpretation.Split(new[] { '\n' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(line => line.Trim().Trim('[', ']').Split(',')
                    .Select(n => double.Parse(n.Trim()))
                    .ToArray())
                .ToList();

            var questionsWordLengthAiMatches = questionWordLengthAiInterpretation.Split(new[] { '\n' }, StringSplitOptions.RemoveEmptyEntries)
                .Select(line => line.Trim().Trim('[', ']').Split(',')
                    .Select(n => double.Parse(n.Trim()))
                    .ToArray())
                .ToList();

            var aiInterpretation = await _aiInterpretationRepository.GetAiInterpretationAsync();
            bool wasnull = aiInterpretation == null;
            aiInterpretation ??= new AiInterpretation { QuestionInterpretations = new List<AiQuestionInterpretation>() };
            aiInterpretation.QuestionInterpretations ??= new List<AiQuestionInterpretation>();

            foreach (var questionInterpretation in aiInterpretation.QuestionInterpretations)
            {
                questionInterpretation.aiAnswerData ??= new AiAnswerData();
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
                    
                    var questionInterpretationExists = aiInterpretation.QuestionInterpretations
                        .FirstOrDefault(i => i.QuestionTypeId == question.QuestionTypeId);

                    if(questionInterpretationExists == null)
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