using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.DAL;
using ControlPanel.DAL.Entities;
using ControlPanel.Models;
using Microsoft.EntityFrameworkCore;

namespace ControlPanel.Services {
    public class PermissionService : IPermissionService {
        private readonly ControlPanelContext _dbCotext;
        public PermissionService(ControlPanelContext dbCobtext) {
            _dbCotext = dbCobtext;
        }
        public async Task<bool> AddPermission(PermissionRequestModel permission) {
            if (permission == null) {
                return false;
            }
            try {
                var dbPermission = PermissionFromRequestModel(permission);
                await _dbCotext.Permissions.AddAsync(dbPermission);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> AddPermissionToStuffGroup(int permissionId, int stuffGroupId) {
            if (permissionId < 1 || stuffGroupId < 1) {
                return false;
            }
            await RemovePermissionFromStuffGroup(permissionId, stuffGroupId);
            var permission = await _dbCotext.Permissions.FindAsync(permissionId);
            if (permission == null) {
                return false;
            }
            var stuffGroup = await _dbCotext.StuffGroups.FindAsync(stuffGroupId);
            if (stuffGroup == null) {
                return false;
            }
            try {
                await _dbCotext.StuffGroupPermissions.AddAsync(new StuffGroupPermission {
                    PermissionId = permissionId,
                    StuffGroupId = stuffGroupId
                });
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<Permission> GetPermission(int id) {
            return await _dbCotext.Permissions.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task<IEnumerable<Permission>> GetPermissions() {
            return await _dbCotext.Permissions.ToListAsync();
        }

        public async Task<bool> RemovePermission(int id) {
            var permssion = await _dbCotext.Permissions.FindAsync(id);
            if (permssion == null) {
                return false;
            }
            try {
                _dbCotext.Permissions.Remove(permssion);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> RemovePermissionFromStuffGroup(int permissionId, int stuffGroupId) {
            if (permissionId < 1 || stuffGroupId < 1) {
                return false;
            }
            var permissionForStuffGroup = await _dbCotext.StuffGroupPermissions.FirstOrDefaultAsync(a => a.PermissionId == permissionId && a.StuffGroupId == stuffGroupId);
            if (permissionForStuffGroup == null) {
                return false;
            }
            try {
                _dbCotext.StuffGroupPermissions.Remove(permissionForStuffGroup);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        public async Task<bool> UpdatePermission(PermissionRequestModel permission) {
            var updated = await _dbCotext.Permissions.FindAsync(permission.Id);
            if (updated == null) {
                return false;
            }
            try {
                updated = PermissionFromRequestModel(permission, updated);
                _dbCotext.Permissions.Update(updated);
                await _dbCotext.SaveChangesAsync();
                return true;
            }
            catch {
                return false;
            }
        }

        private Permission PermissionFromRequestModel(PermissionRequestModel request, Permission requestPermission = null) {
            var permission = requestPermission ?? new Permission();
            if (request.Id > 0) {
                permission.Id = request.Id;
            }
            permission.Name = request.Name;
            return permission;
        }
    }
}
