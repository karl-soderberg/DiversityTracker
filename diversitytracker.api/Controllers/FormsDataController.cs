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
        private readonly IAiInterpretationRepository _aiInterpretationRepository;
        public FormsDataController(IMapper mapper, IFormsRepository formsDataRepository, IQuestionsRepository questionsRepository, IAiInterpretationService aiInterpretationService, IAiInterpretationRepository aiInterpretationRepository)
        {
            _mapper = mapper;
            _formsDataRepository = formsDataRepository;
            _questionsRepository = questionsRepository;
            _aiInterpretationService = aiInterpretationService;
            _aiInterpretationRepository = aiInterpretationRepository;
        }

        [HttpGet]
        // [Authorize("isAdmin")]
        public async Task<ActionResult<FormSubmissionsDataResponseDto>> GetFormData(DateTime? startDate, DateTime? endDate)
        {
            var formSubmissions = await _formsDataRepository.GetFormsAsync(startDate, endDate);
            var aiInterpretations = await _aiInterpretationRepository.GetAiInterpretationAsync();

            var formSubmissionsResponseDto = new FormSubmissionsDataResponseDto(){
                RequestedAt = DateTime.UtcNow,
                FormSubmissions = formSubmissions,
                aiInterpretation = aiInterpretations
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
                    Age = postFormSubmissionDto.Person.Age,
                    TimeAtCompany = postFormSubmissionDto.Person.TimeAtCompany,
                    PersonalReflection = postFormSubmissionDto.Person.PersonalReflection,
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
    }
}