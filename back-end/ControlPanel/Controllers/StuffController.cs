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
    public class StuffController : ControllerBase {

        private readonly IStuffService _stuffService;
        public StuffController(IStuffService stuffService){
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
                Group = new StuffGroupResponseModel {
                    Id = s.StuffGroupId,
                    Name = s.StuffGroup?.Name
                },
                IsEnabled = s.IsEnabled
            });
        }

        // GET: api/Stuff/5
        [HttpGet("{id}", Name = "Stuff")]
        public async Task<StuffResponseModel> Get(int id){
            var stuff = await _stuffService.GetStuff(id);
            if (stuff != null) {
                return new StuffResponseModel {
                    Id = stuff.Id,
                    FirstName = stuff.FirstName,
                    LastName = stuff.LastName,
                    IsEnabled = stuff.IsEnabled,
                    Group = new StuffGroupResponseModel {
                        Id = stuff.StuffGroupId,
                        Name = stuff.StuffGroup?.Name
                    }
                };
            }
            return null;
        }

        // POST: api/Stuff
        [HttpPost]
        public async Task Post([FromBody] StuffRequestModel request){
            await _stuffService.AddStuff(request);
        }

        // PUT: api/Stuff/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] StuffRequestModel request){
            await _stuffService.UpdateStuff(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id){
            await _stuffService.RemoveStuff(id);
        }
    }
}
