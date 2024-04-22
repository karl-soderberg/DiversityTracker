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
        private readonly IQuestionsRepository _questionsRepository;

        public QuestionsController(IMapper mapper, IQuestionsRepository questionsRepository)
        {
            _mapper = mapper;
            _questionsRepository = questionsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<QuestionType>>> GetQuestionTypes()
        {
            var questionTypes = await _questionsRepository.GetQuestionTypes();
            return Ok(questionTypes);
        }

        [HttpPost]
        public async Task<IActionResult> AddQuestionType(PostQuestionTypeDto questionTypeDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newQuestion = new QuestionType(){
                Value = questionTypeDto.Value
            };

            await _questionsRepository.AddQuestionType(newQuestion);

            return CreatedAtAction(nameof(GetQuestionTypes), new {id = newQuestion.Id}, newQuestion);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutForm(string id, PutQuestionTypeDto putQuestionTypeDto)
        {
            var question = await _questionsRepository.GetQuestionTypeById(id);

            if (question == null)
            {
                return NotFound();
            }

            question.Value = putQuestionTypeDto.Value;

            try
            {
                await _questionsRepository.UpdateQuestionType(question);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]

        public async Task<IActionResult> DeleteQuestionType(string id)
        {
            var questionDeleteRequest = await QuestionExists(id);

            if (!questionDeleteRequest)
            {
                return NotFound();
            }

            await _questionsRepository.DeleteQuestionType(id);

            return NoContent();
        }

        private async Task<bool> QuestionExists(string id)
        {
            var QuestionExists = await _questionsRepository.GetQuestionTypeById(id);

            if (QuestionExists == null){
                return false;
            }
            
            return true;
        }
    }
}