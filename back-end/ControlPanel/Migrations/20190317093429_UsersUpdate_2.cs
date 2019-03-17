using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ControlPanel.Migrations
{
    public partial class UsersUpdate_2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Address",
                schema: "dbo",
                table: "Users",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOfBirth",
                schema: "dbo",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Desc",
                schema: "dbo",
                table: "Users",
                maxLength: 300,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                schema: "dbo",
                table: "Users",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Gender",
                schema: "dbo",
                table: "Users",
                maxLength: 6,
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsActive",
                schema: "dbo",
                table: "Users",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                schema: "dbo",
                table: "Users",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Registered",
                schema: "dbo",
                table: "Users",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Address",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "DateOfBirth",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Desc",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Email",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Gender",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "IsActive",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Phone",
                schema: "dbo",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "Registered",
                schema: "dbo",
                table: "Users");
        }
    }
}
