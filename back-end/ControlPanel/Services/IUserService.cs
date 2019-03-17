using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Services
{
    public interface IUserService{
        Task<User> GetUser(int id);
        Task<IEnumerable<User>> GetUsers();
        Task<bool> AddUser(UserRequestModel user);
        Task<bool> RemoveUser(int id);
        Task<bool> UpdateUser(UserRequestModel user);
    }
}
