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
        public Task<bool> AddStuff(StuffRequestModel stuff) {
            throw new NotImplementedException();
        }

        public Task<Stuff> GetStuff(int id) {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Stuff>> GetStuff() {
            return await _dbCotext.Stuff.Include(x => x.StuffGroup).ToListAsync();
        }

        public Task<bool> RemoveStuff(int id) {
            throw new NotImplementedException();
        }

        public Task<bool> UpdateStuff(StuffRequestModel stuff) {
            throw new NotImplementedException();
        }
    }
}
