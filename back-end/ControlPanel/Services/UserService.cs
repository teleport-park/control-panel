using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.DAL;
using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlPanel.Services {
    public class UserService : IUserService {
        private readonly ControlPanelContext _dbCotext;

        public UserService(ControlPanelContext dbContext) {
            _dbCotext = dbContext;
        }
        public async Task<bool> AddUser(UserRequestModel user) {
            if (user == null) {
                return false;
            }
            try {
                var dbUser = UserFromRequestModel(user);
                await _dbCotext.Users.AddAsync(dbUser);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<User> GetUser(int id) {
            return await _dbCotext.Users.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<User>> GetUsers() {
            return await _dbCotext.Users.ToListAsync();
        }

        public async Task<bool> RemoveUser(int id) {
            var user = await _dbCotext.Users.FindAsync(id);
            if (user == null) {
                return false;
            }
            try {
                _dbCotext.Users.Remove(user);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> UpdateUser(UserRequestModel user) {
            var updated = await _dbCotext.Users.FindAsync(user.Id);
            if (updated == null) {
                return false;
            }
            try {
                updated = UserFromRequestModel(user, updated);
                _dbCotext.Users.Update(updated);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch{
                return false;
            }
        }

        private User UserFromRequestModel(UserRequestModel request, User requestUser = null) {
            var user = requestUser ?? new User();
            if (request.Id > 0) {
                user.Id = request.Id;
            }
            user.LastName = request.LastName;
            user.FirstName = request.FirstName;
            user.Email = request.Email;
            user.Address = request.Address;
            user.Gender = request.Gender;
            user.IsActive = request.IsActive;
            user.Registered = requestUser == null ? DateTime.UtcNow : requestUser.Registered;
            user.DateOfBirth = request.DateOfBirth.HasValue ? request.DateOfBirth : request.Age.HasValue ? new DateTime(DateTime.UtcNow.Year - request.Age.Value, 1, 1) : (DateTime?)null;
            user.Desc = request.Desc;
            user.Phone = request.Phone;
            return user;
        }
    }
}
