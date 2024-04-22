using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsDataController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormsRepository _formsRepository;
        private readonly IQuestionRepository _questionRepository;

        public FormsDataController(IMapper mapper, IFormsRepository formsRepository, IQuestionRepository questionRepository)
        {
            _mapper = mapper;
            _formsRepository = formsRepository;
            _questionRepository = questionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<FormSubmissionResponseDto>>> GetFormData()
        {
            var formsData = await _formsRepository.GetFormsAsync();
            var formsResponseData = _mapper.Map<IEnumerable<FormSubmissionResponseDto>>(formsData);
            return Ok(formsResponseData);
        }

        [HttpPost]
        public async Task<IActionResult> AddForm(FormSubmissionPostDto formSubmissionPostDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newForm = _mapper.Map<FormSubmission>(formSubmissionPostDto);
            await _formsRepository.AddFormAsync(newForm);

            return CreatedAtAction(nameof(GetFormData), new {id = newForm.Id}, newForm);
        }

    }
}