using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.Models;
using ControlPanel.Services;
using Microsoft.AspNetCore.Mvc;

namespace ControlPanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class StuffController : ControllerBase
    {

        private readonly IStuffService _stuffService;
        public StuffController(IStuffService stuffService) {
            _stuffService = stuffService;
        }
        // GET: api/Stuff
        [HttpGet]
        public async Task<IEnumerable<StuffResponseModel>> Get(){
            var stuff = await _stuffService.GetStuff();
            return stuff.Select(s => new StuffResponseModel {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                StuffGroupId = s.StuffGroupId,
                StuffGroupName = s.StuffGroup?.Name,
                IsEnabled = s.IsEnabled
            });
        }

        // GET: api/Stuff/5
        [HttpGet("{id}", Name = "Stuff")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Stuff
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Stuff/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
