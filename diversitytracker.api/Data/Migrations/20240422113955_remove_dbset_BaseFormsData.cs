using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diversitytracker.api.Data.Migrations
{
    /// <inheritdoc />
    public partial class remove_dbset_BaseFormsData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_People_PersonId",
                table: "Questions");

            migrationBuilder.DropTable(
                name: "BaseFormsData");

            migrationBuilder.DropIndex(
                name: "IX_Questions_PersonId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "PersonId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "FormSubmissionId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions",
                column: "FormSubmissionId",
                principalTable: "FormSubmissionsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "FormSubmissionId",
                table: "Questions",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "PersonId",
                table: "Questions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "BaseFormsData",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionTypeId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BaseFormsData", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BaseFormsData_QuestionType_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "QuestionType",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Questions_PersonId",
                table: "Questions",
                column: "PersonId");

            migrationBuilder.CreateIndex(
                name: "IX_BaseFormsData_QuestionTypeId",
                table: "BaseFormsData",
                column: "QuestionTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions",
                column: "FormSubmissionId",
                principalTable: "FormSubmissionsData",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_People_PersonId",
                table: "Questions",
                column: "PersonId",
                principalTable: "People",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
