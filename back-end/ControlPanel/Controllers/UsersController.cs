using System;
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
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        public UsersController(IUserService userService) {
            _userService = userService;
        }
        // GET: api/Users
        [HttpGet]
        public async Task<IEnumerable<UserResponseModel>> Get(){
            var users = await _userService.GetUsers();
            return users.Select(user => new UserResponseModel {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName
            });
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<UserResponseModel> Get(int id){
            var user = await _userService.GetUser(id);
            if (user != null) {
                return new UserResponseModel {
                    Id = user.Id,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    Email = user.Email,
                    Phone = user.Phone,
                    Address = user.Address,
                    Desc = user.Desc,
                    DateOfBirth = user.DateOfBirth,
                    Registered  = user.Registered,
                    Gender = user.Gender,
                    Age = user.DateOfBirth.HasValue? DateTime.UtcNow.Year - user.DateOfBirth.Value.Year: (int?)null,
                    IsActive = user.IsActive
                };
            }
            return null;
        }

        // POST: api/Users
        [HttpPost]
        public async Task Post([FromBody]UserRequestModel request){
            await _userService.AddUser(request);
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody]UserRequestModel request){
            request.Id = id;
            await _userService.UpdateUser(request);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task Delete(int id){
            await _userService.RemoveUser(id);
        }
    }
}
