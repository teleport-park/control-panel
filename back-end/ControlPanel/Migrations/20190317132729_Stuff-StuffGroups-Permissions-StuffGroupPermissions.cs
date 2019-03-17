using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ControlPanel.Migrations
{
    public partial class StuffStuffGroupsPermissionsStuffGroupPermissions : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Permissions",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Permissions", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StuffGroups",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StuffGroups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stuff",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(maxLength: 30, nullable: false),
                    LastName = table.Column<string>(maxLength: 30, nullable: false),
                    StuffGroupId = table.Column<int>(nullable: false),
                    IsEnabled = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stuff", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Stuff_StuffGroups_StuffGroupId",
                        column: x => x.StuffGroupId,
                        principalSchema: "dbo",
                        principalTable: "StuffGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "StuffGroupPermissions",
                schema: "dbo",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    StuffGroupId = table.Column<int>(nullable: false),
                    PermissionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StuffGroupPermissions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StuffGroupPermissions_Permissions_PermissionId",
                        column: x => x.PermissionId,
                        principalSchema: "dbo",
                        principalTable: "Permissions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_StuffGroupPermissions_StuffGroups_StuffGroupId",
                        column: x => x.StuffGroupId,
                        principalSchema: "dbo",
                        principalTable: "StuffGroups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Stuff_StuffGroupId",
                schema: "dbo",
                table: "Stuff",
                column: "StuffGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_StuffGroupPermissions_PermissionId",
                schema: "dbo",
                table: "StuffGroupPermissions",
                column: "PermissionId");

            migrationBuilder.CreateIndex(
                name: "IX_StuffGroupPermissions_StuffGroupId",
                schema: "dbo",
                table: "StuffGroupPermissions",
                column: "StuffGroupId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Stuff",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StuffGroupPermissions",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "Permissions",
                schema: "dbo");

            migrationBuilder.DropTable(
                name: "StuffGroups",
                schema: "dbo");
        }
    }
}
