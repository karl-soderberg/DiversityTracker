using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Dtos;
using diversitytracker.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsDataController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormsDataRepository _formsDataRepository;

        public FormsDataController(IMapper mapper, IFormsDataRepository formsDataRepository)
        {
            _mapper = mapper;
            _formsDataRepository = formsDataRepository;
        }

        [HttpGet]
        public async Task<ActionResult<FormSubmissionsDataResponseDto>> GetFormData(DateTime? startDate, DateTime? endDate)
        {
            var formSubmissions = await _formsDataRepository.GetFormsAsync(startDate, endDate);
            var formSubmissionsResponseDto = new FormSubmissionsDataResponseDto(){
                RequestedAt = DateTime.UtcNow,
                FormSubmissions = formSubmissions
            };  
            return Ok(formSubmissionsResponseDto);
        }

        // [HttpPut("{id}")]
        // public async Task<IActionResult> PutForm(int id, UpdateFormSubmissionDto updateFormSubmissionDto)
        // {
        //     var form = await _formsDataRepository.GetFormSubmissionById(id);

        //     if(id != updateFormSubmissionDto.Id)
        //     {
        //         return BadRequest("Invalid formsubmission Id");
        //     }

        //     if (form == null)
        //     {
        //         return NotFound();
        //     }

        //     var newForm = _mapper.Map(updateFormSubmissionDto, form);

        //     try
        //     {
        //         await _formsDataRepository.UpdateForm(newForm);
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }

        //     return NoContent();
        // }

        [HttpPost]
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
                    QuestionType = await _formsDataRepository.GetQuestionTypeById(question.QuestionTypeId),
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