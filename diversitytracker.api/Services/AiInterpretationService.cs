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

        public Task<List<AiInterpretation>> InterperetFormData(List<FormSubmission> formSubmissions)
        {
            throw new NotImplementedException();
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