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
        // [Authorize("isAdmin")]
        public async Task<ActionResult<List<QuestionType>>> GetQuestionTypes()
        {
            var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
            if (questionTypes == null)
            {
                return NotFound();
            }
            return Ok(questionTypes);
        }

        [HttpPost]
        // [Authorize("isAdmin")]
        public async Task<IActionResult> AddQuestionType(PostQuestionTypeDto questionTypeDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newQuestion = new QuestionType(){
                Value = questionTypeDto.Value
            };

            await _questionsRepository.AddQuestionTypeAsync(newQuestion);

            return CreatedAtAction(nameof(GetQuestionTypes), new {id = newQuestion.Id}, newQuestion);
        }

        [HttpPut("{id}")]
        // [Authorize("isAdmin")]
        public async Task<IActionResult> PutForm(string id, UpdateQuestionTypeDto putQuestionTypeDto)
        {
            var question = await _questionsRepository.GetQuestionTypeByIdAsync(id);

            if (question == null)
            {
                return NotFound();
            }

            question.Value = putQuestionTypeDto.Value;

            try
            {
                await _questionsRepository.UpdateQuestionTypeAsync(question);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        // [Authorize("isAdmin")]

        public async Task<IActionResult> DeleteQuestionType(string id)
        {
            var questionDeleteRequest = await QuestionExists(id);

            if (!questionDeleteRequest)
            {
                return NotFound();
            }

            await _questionsRepository.DeleteQuestionTypeAsync(id);

            return NoContent();
        }

        private async Task<bool> QuestionExists(string id)
        {
            var QuestionExists = await _questionsRepository.GetQuestionTypeByIdAsync(id);

            if (QuestionExists == null){
                return false;
            }
            
            return true;
        }
    }
}