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
        public ControlPanelContext(DbContextOptions<ControlPanelContext> options)
           : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<User>().ToTable("Users", "dbo");
            modelBuilder.Entity<User>().Property(a => a.FirstName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.LastName).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Email).HasMaxLength(30).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Gender).HasMaxLength(6);
            modelBuilder.Entity<User>().Property(a => a.Registered).IsRequired();
            modelBuilder.Entity<User>().Property(a => a.Desc).HasMaxLength(300);
            modelBuilder.Entity<User>().Property(a => a.Address).HasMaxLength(200);
        }
    }
}
