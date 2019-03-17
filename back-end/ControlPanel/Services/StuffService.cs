using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.DAL;
using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlPanel.Services {
    public class StuffService : IStuffService {
        private readonly ControlPanelContext _dbCotext;

        public StuffService(ControlPanelContext dbContext) {
            _dbCotext = dbContext;
        }
        public async Task<bool> AddStuff(StuffRequestModel stuff) {
            if (stuff == null) {
                return false;
            }
            try {
                var dbStuff = StuffFromRequestModel(stuff);
                await _dbCotext.Stuff.AddAsync(dbStuff);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<Stuff> GetStuff(int id) {
            return await _dbCotext.Stuff.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Stuff>> GetStuff() {
            return await _dbCotext.Stuff.Include(x => x.StuffGroup).ToListAsync();
        }

        public async Task<bool> RemoveStuff(int id) {
            var stuff = await _dbCotext.Stuff.FindAsync(id);
            if (stuff == null) {
                return false;
            }
            try {
                _dbCotext.Stuff.Remove(stuff);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> UpdateStuff(StuffRequestModel stuff) {
            var updated = await _dbCotext.Stuff.FindAsync(stuff.Id);
            if (updated == null) {
                return false;
            }
            try {
                updated = StuffFromRequestModel(stuff, updated);
                _dbCotext.Stuff.Update(updated);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        private Stuff StuffFromRequestModel(StuffRequestModel request, Stuff requestStuff = null) {
            var stuff = requestStuff ?? new Stuff();
            if (request.Id > 0) {
                stuff.Id = request.Id;
            }

            stuff.LastName = request.LastName;
            stuff.FirstName = request.FirstName;
            stuff.StuffGroupId = request.StuffGroupId;
            stuff.IsEnabled = request.IsEnabled;
           
            return stuff;
        }
    }
}
