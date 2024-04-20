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
        public async Task<IActionResult> GetFormResults()
        {
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> AddForm()
        {
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> PutForm()
        {
            return Ok();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteForm()
        {
            return Ok();
        }


    }
}