using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetQuestions()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> PostData()
        {
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> PutData()
        {
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteData()
        {
            return Ok();
        }


    }
}