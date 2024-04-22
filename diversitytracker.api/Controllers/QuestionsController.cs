using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Dtos;
using diversitytracker.api.Models;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class QuestionsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormsDataRepository _formsDataRepository;

        public QuestionsController(IMapper mapper, IFormsDataRepository formsDataRepository)
        {
            _mapper = mapper;
            _formsDataRepository = formsDataRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuestionTypeResponseDto>>> GetQuestionTypes()
        {
            var formsData = await _formsDataRepository.GetQuestionTypes();
            var formsResponseData = _mapper.Map<IEnumerable<QuestionTypeResponseDto>>(formsData);
            return Ok(formsResponseData);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestionType(QuestionTypePostDto questionType)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newQuestion = _mapper.Map<QuestionType>(questionType);
            await _formsDataRepository.AddQuestionType(newQuestion);

            return CreatedAtAction(nameof(GetQuestionTypes), new {id = newQuestion.Id}, newQuestion);
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteQuestionType(int id)
        {
            var questionDeleteRequest = await QuestionExists(id);

            if (!questionDeleteRequest)
            {
                return NotFound();
            }

            await _formsDataRepository.DeleteQuestionType(id);

            return NoContent();
        }

        private async Task<bool> QuestionExists(int id)
        {
            var QuestionExists = await _formsDataRepository.GetQuestionTypeById(id);

            if (QuestionExists == null){
                return false;
            }
            
            return true;
        }
    }
}