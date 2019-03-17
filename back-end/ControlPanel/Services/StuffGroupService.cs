using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.DAL;
using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlPanel.Services {
    public class StuffGroupService : IStuffGroupService {
        private readonly ControlPanelContext _dbCotext;

        public StuffGroupService(ControlPanelContext dbContext) {
            _dbCotext = dbContext;
        }
        public async Task<bool> AddStuffGroup(StuffGroupRequestModel stuffGroup) {
            if (stuffGroup == null) {
                return false;
            }
            try {
                var dbStuffGroup = StuffGroupFromRequestModel(stuffGroup);
                await _dbCotext.StuffGroups.AddAsync(dbStuffGroup);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<StuffGroup> GetStuffGroup(int id) {
            return await _dbCotext.StuffGroups.Include("Permissions").Include("Permissions.Permission").FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<StuffGroup>> GetStuffGroups() {
            return await _dbCotext.StuffGroups.Include("Permissions").Include("Permissions.Permission").ToListAsync();
        }

        public async Task<bool> RemoveStuffgroup(int id) {
            var stuffGroup = await _dbCotext.StuffGroups.FindAsync(id);
            if (stuffGroup == null) {
                return false;
            }
            try {
                _dbCotext.StuffGroups.Remove(stuffGroup);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> UpdateStuffGroup(StuffGroupRequestModel stuffGroup) {
            var updated = await _dbCotext.StuffGroups.FindAsync(stuffGroup.Id);
            if (updated == null) {
                return false;
            }
            try {
                updated = StuffGroupFromRequestModel(stuffGroup, updated);
                _dbCotext.StuffGroups.Update(updated);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        private StuffGroup StuffGroupFromRequestModel(StuffGroupRequestModel request, StuffGroup requestStuffGroup = null) {
            var stuffGroup = requestStuffGroup ?? new StuffGroup();
            if (request.Id > 0) {
                stuffGroup.Id = request.Id;
            }
            stuffGroup.Name = request.Name;
            return stuffGroup;
        }
    }
}
