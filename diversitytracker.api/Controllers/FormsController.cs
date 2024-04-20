using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using diversitytracker.api.Contracts;
using diversitytracker.api.Models;
using diversitytracker.api.Models.Forms;
using diversitytracker.api.Repository;
using Microsoft.AspNetCore.Mvc;

namespace diversitytracker.api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FormsController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IFormsRepository _formsRepository;

        public FormsController(IMapper mapper, IFormsRepository formsRepository)
        {
            _mapper = mapper;
            _formsRepository = formsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<List<BaseFormResponseDto>>> GetFormResults()
        {
            var formsData = await _formsRepository.GetFormsAsync();
            var formsResponseData = _mapper.Map<IEnumerable<BaseFormResponseDto>>(formsData);
            return Ok(formsResponseData);
        }

        [HttpPost]
        public async Task<IActionResult> AddForm(BaseFormRequestDto baseFormRequestDto)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var newForm = _mapper.Map<BaseForm>(baseFormRequestDto);
            await _formsRepository.AddFormAsync(newForm);

            return CreatedAtAction(nameof(GetFormResults), new {id = newForm.Id}, newForm);
        }

    }
}