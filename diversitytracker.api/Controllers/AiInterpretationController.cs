using diversitytracker.api.Contracts;
using diversitytracker.api.Models.OpenAi;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiInterpretationController : ControllerBase
    {
        private readonly IAiInterpretationService _aiInterpretationService;
        private readonly IFormsRepository _formsRepository;
        private readonly IQuestionsRepository _questionsRepository;
        private readonly IAiInterpretationRepository _aiInterpretationRepository;

        public AiInterpretationController(IAiInterpretationService aiInterpretationService,IFormsRepository formsRepository, IQuestionsRepository questionsRepository, IAiInterpretationRepository aiInterpretationRepository)
        {
            _aiInterpretationService = aiInterpretationService;
            _formsRepository = formsRepository;
            _questionsRepository = questionsRepository;
            _aiInterpretationRepository = aiInterpretationRepository;
        }
        [HttpGet] 
        public async Task<ActionResult<AiInterpretation>> GetInterperetation()
        {
            var interperetation = await _aiInterpretationRepository.GetAiInterpretationAsync();
            if(interperetation == null)
            {
                return NotFound();
            }
            return Ok(interperetation);
        }

        [HttpGet("InterperetAllReflectionsForms")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllReflectionsForms()
        {
            try
            {
                var forms = await _formsRepository.GetFormsAsync(null, null);
                var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
                var interperetation = await _aiInterpretationService.InterperetAllPersonalReflections(forms, questionTypes);
                return Ok(interperetation);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }   
        }

        [HttpGet("InterperetAllRealData")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllRealData()
        {
            try
            {
                var forms = await _formsRepository.GetFormsAsync(null, null);
                var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
                var interperetation = await _aiInterpretationService.InterperetAllData(forms, questionTypes);
                return Ok(interperetation);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }  
        }

        [HttpGet("InterperetAllQuestionAnswers")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllQuestionAnswers()
        {
            try
            {
                var forms = await _formsRepository.GetFormsAsync(null, null);
                var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
                var interperetation = await _aiInterpretationService.InterperetQuestionDataSeperated(forms, questionTypes);
                return Ok(interperetation);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }  
        }

        [HttpGet("InterperetAllQuestionValues")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllQuestionValues()
        {
            try
            {
                var forms = await _formsRepository.GetFormsAsync(null, null);
                var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
                var interperetation = await _aiInterpretationService.InterperetQuestionAnswersSeperated(forms, questionTypes);
                return Ok(interperetation); 
            }
            catch (Exception ex)
            {
                 Console.WriteLine(ex.Message);
                return StatusCode(500, "Internal Server Error");
            }  
        }

        [HttpGet("CreateDataFromQuestionAnswersInterpretation")]
        public async Task<ActionResult<AiInterpretation>> CreateDataFromQuestionAnswersInterpretation()
        {
            try
            {
                var forms = await _formsRepository.GetFormsAsync(null, null);
                var questionTypes = await _questionsRepository.GetQuestionTypesAsync();
                var interperetation = await _aiInterpretationService.CreateDataFromQuestionAnswers(forms, questionTypes);
                return Ok(); 
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return StatusCode(500, ex.Message);
            }  
        }

        [HttpDelete("ClearAiInterpretation")]
        public async Task<ActionResult> ClearAiInterpretation()
        {
            await _aiInterpretationRepository.DeleteAiInterpretationAsync();

            return NoContent();
        }
    }
}