using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace License.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Licenses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Organization = table.Column<string>(nullable: true),
                    SerialNumber = table.Column<string>(nullable: true),
                    IssueDate = table.Column<DateTime>(nullable: false),
                    Validity = table.Column<int>(nullable: false),
                    period = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Licenses", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Licenses");
        }
    }
}
