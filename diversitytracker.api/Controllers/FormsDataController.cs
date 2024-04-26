using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Dtos;
using diversitytracker.api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsDataController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormsRepository _formsDataRepository;
        private readonly IQuestionsRepository _questionsRepository;
        private readonly IAiInterpretationService _aiInterpretationService;

        public FormsDataController(IMapper mapper, IFormsRepository formsDataRepository, IQuestionsRepository questionsRepository, IAiInterpretationService aiInterpretationService)
        {
            _mapper = mapper;
            _formsDataRepository = formsDataRepository;
            _questionsRepository = questionsRepository;
            _aiInterpretationService = aiInterpretationService;
        }

        [HttpGet]
        // [Authorize("isAdmin")]
        public async Task<ActionResult<FormSubmissionsDataResponseDto>> GetFormData(DateTime? startDate, DateTime? endDate)
        {
            var formSubmissions = await _formsDataRepository.GetFormsAsync(startDate, endDate);
            var formSubmissionsResponseDto = new FormSubmissionsDataResponseDto(){
                RequestedAt = DateTime.UtcNow,
                FormSubmissions = formSubmissions
            };  
            return Ok(formSubmissionsResponseDto);
        }

        [HttpPost]
        // [Authorize("isAdmin")]
        public async Task<IActionResult> AddForm(PostFormSubmissionDto postFormSubmissionDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newFormSubmission = new FormSubmission()
            {
                CreatedAt = postFormSubmissionDto.CreatedAt,
                Person = new Person(){
                    Name = postFormSubmissionDto.Person.Name,
                    Gender = postFormSubmissionDto.Person.Gender,
                    TimeAtCompany = postFormSubmissionDto.Person.TimeAtCompany,
                },
                Questions = new List<Question>()
            };
            
            foreach(var question in postFormSubmissionDto.Questions)
            {
                var newQuestion = new Question(){
                    QuestionType = await _questionsRepository.GetQuestionTypeByIdAsync(question.QuestionTypeId),
                    Value = question.Value,
                    Answer = question.Answer,
                    FormSubmissionId = newFormSubmission.Id,
                    FormSubmission = newFormSubmission,
                };

                if(newQuestion.QuestionType == null)
                {
                    return BadRequest($"QuestionType with Id: {question.QuestionTypeId} not found.");
                }

                newFormSubmission.Questions.Add(newQuestion);
            }

            await _formsDataRepository.AddFormAsync(newFormSubmission);

            return CreatedAtAction(nameof(GetFormData), new {id = newFormSubmission.Id}, newFormSubmission);
        }

        [HttpGet("openAITesting")]

        public async Task<ActionResult<string[]>> OpenApiTesting(string? customPrompt, string input1, string input2, string input3)
        {
            var data = new string[]{
                input1,
                input2,
                input3
            };
            var interperetedAnswers = await _aiInterpretationService.InterpretAnswers(customPrompt, data);

            return Ok(interperetedAnswers);
        }

    }
}