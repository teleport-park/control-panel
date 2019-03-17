﻿// <auto-generated />
using System;
using ControlPanel.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace ControlPanel.Migrations
{
    [DbContext(typeof(ControlPanelContext))]
    [Migration("20190317132729_Stuff-StuffGroups-Permissions-StuffGroupPermissions")]
    partial class StuffStuffGroupsPermissionsStuffGroupPermissions
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("ControlPanel.DAL.Entities.Permission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("Permissions","dbo");
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.Stuff", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<bool>("IsEnabled");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<int>("StuffGroupId");

                    b.HasKey("Id");

                    b.HasIndex("StuffGroupId");

                    b.ToTable("Stuff","dbo");
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.StuffGroup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.HasKey("Id");

                    b.ToTable("StuffGroups","dbo");
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.StuffGroupPermission", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PermissionId");

                    b.Property<int>("StuffGroupId");

                    b.HasKey("Id");

                    b.HasIndex("PermissionId");

                    b.HasIndex("StuffGroupId");

                    b.ToTable("StuffGroupPermissions","dbo");
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address")
                        .HasMaxLength(200);

                    b.Property<DateTime?>("DateOfBirth");

                    b.Property<string>("Desc")
                        .HasMaxLength(300);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Gender")
                        .HasMaxLength(6);

                    b.Property<bool>("IsActive");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(30);

                    b.Property<string>("Phone");

                    b.Property<DateTime>("Registered");

                    b.HasKey("Id");

                    b.ToTable("Users","dbo");
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.Stuff", b =>
                {
                    b.HasOne("ControlPanel.DAL.Entities.StuffGroup", "StuffGroup")
                        .WithMany()
                        .HasForeignKey("StuffGroupId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("ControlPanel.DAL.Entities.StuffGroupPermission", b =>
                {
                    b.HasOne("ControlPanel.DAL.Entities.Permission", "Permission")
                        .WithMany()
                        .HasForeignKey("PermissionId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("ControlPanel.DAL.Entities.StuffGroup", "StuffGroup")
                        .WithMany("Permissions")
                        .HasForeignKey("StuffGroupId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
