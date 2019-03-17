using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.Models;
using ControlPanel.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ControlPanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class StuffGroupsController : ControllerBase{
        private readonly IStuffGroupService _stuffGroupService;

        public StuffGroupsController(IStuffGroupService stuffGroupService) {
            _stuffGroupService = stuffGroupService;
        }

        // GET: api/StuffGroup
        [HttpGet]
        public async Task<IEnumerable<StuffGroupResponseModel>> Get(){
            var stuffgroups = await _stuffGroupService.GetStuffGroups();
            return stuffgroups.Select(s => new StuffGroupResponseModel {
                Id = s.Id,
                Name = s.Name,
                Permissions = s.Permissions?.Select(a => new PermissionResponseModel {
                    Id = a.PermissionId,
                    Name = a.Permission?.Name
                })
            });
        }

        // GET: api/StuffGroup/5
        [HttpGet("{id}", Name = "StuffGroups")]
        public async Task<StuffGroupResponseModel> Get(int id){
            var stuffGroup = await _stuffGroupService.GetStuffGroup(id);
            if (stuffGroup != null) {
                return new StuffGroupResponseModel {
                    Id = stuffGroup.Id,
                    Name = stuffGroup.Name,
                    Permissions = stuffGroup.Permissions?.Select(a => new PermissionResponseModel {
                        Id = a.PermissionId,
                        Name = a.Permission?.Name
                    })
                };
            }
            return null;
        }

        // POST: api/StuffGroup
        [HttpPost]
        public async Task Post([FromBody]StuffGroupRequestModel request){
            await _stuffGroupService.AddStuffGroup(request);
        }

        // PUT: api/StuffGroup/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]StuffGroupRequestModel request) {
            request.Id = id;
            await _stuffGroupService.UpdateStuffGroup(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id){
            await _stuffGroupService.RemoveStuffgroup(id);
        }
    }
}
