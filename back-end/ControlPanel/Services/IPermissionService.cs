using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControlPanel.Services {
    public interface IPermissionService {
        Task<Permission> GetPermission(int id);
        Task<IEnumerable<Permission>> GetPermissions();
        Task<bool> AddPermission(PermissionRequestModel permission);
        Task<bool> RemovePermission(int id);
        Task<bool> UpdatePermission(PermissionRequestModel permission);
        Task<bool> RemovePermissionFromStuffGroup(int permissionId, int stuffGroupId);
        Task<bool> AddPermissionToStuffGroup(int permissionId, int stuffGroupId);
    }
}
