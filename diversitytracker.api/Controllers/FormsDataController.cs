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
            var formsData = await _formsDataRepository.GetFormsAsync(startDate, endDate);
            var formsResponseData = _mapper.Map<ICollection<FormSubmissionResponseDto>>(formsData);
            var formResponseObject = new FormSubmissionsDataResponseDto(){
                RequestedAt = DateTime.UtcNow,
                FormSubmissions = formsResponseData
            };  
            return Ok(formResponseObject);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutForm(int id, UpdateFormSubmissionDto updateFormSubmissionDto)
        {
            var form = await _formsDataRepository.GetFormSubmissionById(id);

            if(id != updateFormSubmissionDto.Id)
            {
                return BadRequest("Invalid formsubmission Id");
            }

            if (form == null)
            {
                return NotFound();
            }

            var newForm = _mapper.Map(updateFormSubmissionDto, form);

            try
            {
                await _formsDataRepository.UpdateForm(newForm);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> AddForm(FormSubmissionPostDto formSubmissionPostDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            foreach (var question in formSubmissionPostDto.Questions)
            {
                var questionFound = _formsDataRepository.GetQuestionTypeById(question.QuestionTypeId);
                if(questionFound == null)
                {
                    return NotFound("Could Not Find Question Id: " + question.QuestionTypeId);
                }
            }

            var newForm = _mapper.Map<FormSubmission>(formSubmissionPostDto);
            await _formsDataRepository.AddFormAsync(newForm);

            return CreatedAtAction(nameof(GetFormData), new {id = newForm.Id}, newForm);
        }

    }
}