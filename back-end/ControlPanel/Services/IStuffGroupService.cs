using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Services {
    public interface IStuffGroupService {
        Task<StuffGroup> GetStuffGroup(int id);
        Task<IEnumerable<StuffGroup>> GetStuffGroups();
        Task<bool> AddStuffGroup(StuffGroupRequestModel stuffGroup);
        Task<bool> RemoveStuffgroup(int id);
        Task<bool> UpdateStuffGroup(StuffGroupRequestModel stuffGroup);
    }
}
