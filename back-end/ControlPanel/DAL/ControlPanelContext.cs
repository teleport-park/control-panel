using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ControlPanel.DAL.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControlPanel.DAL
{
    public class ControlPanelContext: DbContext {
        public DbSet<User> Users { get; set; }
        public DbSet<StuffGroup> StuffGroups { get; set; }
        public DbSet<Stuff> Stuff { get; set; }
        public DbSet<Permission> Permissions { get; set; }
        public DbSet<StuffGroupPermission> StuffGroupPermissions { get; set; }
        public ControlPanelContext(DbContextOptions<ControlPanelContext> options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            // users
            modelBuilder.Entity<User>().ToTable("Users", "dbo");
            modelBuilder.Entity<User>().Property(a => a.FirstName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.LastName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Email).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Gender).HasMaxLength(6);
            modelBuilder.Entity<User>().Property(a => a.Registered).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Desc).HasMaxLength(300);
            modelBuilder.Entity<User>().Property(a => a.Address).HasMaxLength(200);
            // stuff group
            modelBuilder.Entity<StuffGroup>().ToTable("StuffGroups", "dbo");
            modelBuilder.Entity<StuffGroup>().Property(a => a.Name).HasMaxLength(30).IsRequired();
            // stuff
            modelBuilder.Entity<Stuff>().ToTable("Stuff", "dbo");
            modelBuilder.Entity<Stuff>().Property(a => a.FirstName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<Stuff>().Property(a => a.LastName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<Stuff>().Property(a => a.StuffGroupId).IsRequired();
            modelBuilder.Entity<Stuff>().HasOne(a => a.StuffGroup).WithMany().HasForeignKey(a => a.StuffGroupId).OnDelete(DeleteBehavior.Restrict);
            // permissions
            modelBuilder.Entity<Permission>().ToTable("Permissions", "dbo");
            modelBuilder.Entity<Permission>().Property(a => a.Name).HasMaxLength(30).IsRequired();
            // stuff group permissions
            modelBuilder.Entity<StuffGroupPermission>().ToTable("StuffGroupPermissions", "dbo");
            modelBuilder.Entity<StuffGroupPermission>().Property(a => a.PermissionId).IsRequired();
            modelBuilder.Entity<StuffGroupPermission>().Property(a => a.StuffGroupId).IsRequired();
            modelBuilder.Entity<StuffGroupPermission>().HasOne(a => a.StuffGroup).WithMany(a => a.Permissions).HasForeignKey(a => a.StuffGroupId).OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<StuffGroupPermission>().HasOne(a => a.Permission).WithMany().HasForeignKey(a => a.PermissionId).OnDelete(DeleteBehavior.Restrict);

        }
    }
}
