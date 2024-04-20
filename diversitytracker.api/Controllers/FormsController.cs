using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using diversitytracker.api.Models.Forms;
using diversitytracker.api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly FormsRepository _formsRepository;

        public FormsController(FormsRepository formsRepository)
        {
            _formsRepository = formsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<BaseFormResponseDto>>> GetFormResults()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddForm()
        {
            return Ok();
        }

    }
}