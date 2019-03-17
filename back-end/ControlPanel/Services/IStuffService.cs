using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Services {
    public interface IStuffService {
        Task<Stuff> GetStuff(int id);
        Task<IEnumerable<Stuff>> GetStuff();
        Task<bool> AddStuff(StuffRequestModel stuff);
        Task<bool> RemoveStuff(int id);
        Task<bool> UpdateStuff(StuffRequestModel stuff);
    }
}
