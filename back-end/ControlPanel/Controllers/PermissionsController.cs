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
    public class PermissionsController : ControllerBase{
        private readonly IPermissionService _permissionService;
        public PermissionsController(IPermissionService permissionService) {
            _permissionService = permissionService;
        }
        // GET: api/Permissions
        [HttpGet]
        public async Task<IEnumerable<PermissionResponseModel>> Get() {
            var permissions = await _permissionService.GetPermissions();
            return permissions.Select(a => new PermissionResponseModel {
                Id = a.Id,
                Name = a.Name
            });
        }

        // GET: api/Permissions/5
        [HttpGet("{id}", Name = "Permissions")]
        public async Task<PermissionResponseModel> Get(int id){
            var permission = await _permissionService.GetPermission(id);
            if (permission != null) {
                return new PermissionResponseModel {
                    Id = permission.Id,
                    Name = permission.Name
                };
            }
            return null;
        }

        // POST: api/Permissions
        [HttpPost]
        public async Task Post([FromBody]PermissionRequestModel request){
            var permissionId = request.PermissionId;
            var stuffGroupId = request.StuffGroupId;
            if (stuffGroupId > 0 && permissionId > 0) {
                await _permissionService.AddPermissionToStuffGroup(request.PermissionId, request.StuffGroupId);
                return;
            }
            await _permissionService.AddPermission(request);
        }

        // PUT: api/Permissions/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]PermissionRequestModel request){
            request.Id = id;
            await _permissionService.UpdatePermission(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id){
            await _permissionService.RemovePermission(id);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{permissionId}/stuffGroupId/{stuffgroupId}")]
        public async Task Delete(int permissionId, int stuffGroupId) {
            await _permissionService.RemovePermissionFromStuffGroup(permissionId, stuffGroupId);
        }
    }
}
