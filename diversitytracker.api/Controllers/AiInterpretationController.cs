using diversitytracker.api.Models.OpenAi;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AiInterpretationController : ControllerBase
    {
        [HttpGet("InterperetAllReflectionsForms")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllReflectionsForms()
        {
            return Ok();
        }

        [HttpGet("InterperetAllRealData")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllRealData()
        {
            return Ok();
        }

        [HttpGet("InterperetAllQuestions")]
        public async Task<ActionResult<AiInterpretation>> InterperetAllQuestions()
        {
            return Ok();
        }

        [HttpGet("InterperetRealDataSeperated")]
        public async Task<ActionResult<AiInterpretation>> InterperetRealData()
        {
            return Ok();
        }
    }
}