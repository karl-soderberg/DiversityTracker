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
        private readonly IQuestionRepository _questionRepository;

        public QuestionsController(IMapper mapper, IQuestionRepository questionRepository)
        {
            _mapper = mapper;
            _questionRepository= questionRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuestionTypeResponseDto>>> GetQuestionTypes()
        {
            var formsData = await _questionRepository.GetQuestionTypes();
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
            await _questionRepository.AddQuestionType(newQuestion);

            return CreatedAtAction(nameof(GetQuestionTypes), new {id = newQuestion.Id}, newQuestion);
        }

        [HttpDelete]

        public async Task<IActionResult> DeleteQuestionType(int id)
        {
            var questionDeleteRequest = await QuestionExists(id);

            if (!questionDeleteRequest)
            {
                return NotFound();
            }

            await _questionRepository.DeleteQuestionType(id);

            return NoContent();
        }

        private async Task<bool> QuestionExists(int id)
        {
            var QuestionExists = await _questionRepository.GetQuestionTypeById(id);

            if (QuestionExists == null){
                return false;
            }
            
            return true;
        }
    }
}