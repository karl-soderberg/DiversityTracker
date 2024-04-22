using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diversitytracker.api.Data.Migrations
{
    /// <inheritdoc />
    public partial class fix_dbset_QuestionType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions_QuestionType_QuestionTypeId",
                table: "Questions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionType",
                table: "QuestionType");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Questions",
                table: "Questions");

            migrationBuilder.RenameTable(
                name: "QuestionType",
                newName: "QuestionTypes");

            migrationBuilder.RenameTable(
                name: "Questions",
                newName: "Question");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_QuestionTypeId",
                table: "Question",
                newName: "IX_Question_QuestionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Questions_FormSubmissionId",
                table: "Question",
                newName: "IX_Question_FormSubmissionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionTypes",
                table: "QuestionTypes",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Question",
                table: "Question",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Question_FormSubmissionsData_FormSubmissionId",
                table: "Question",
                column: "FormSubmissionId",
                principalTable: "FormSubmissionsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Question_QuestionTypes_QuestionTypeId",
                table: "Question",
                column: "QuestionTypeId",
                principalTable: "QuestionTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Question_FormSubmissionsData_FormSubmissionId",
                table: "Question");

            migrationBuilder.DropForeignKey(
                name: "FK_Question_QuestionTypes_QuestionTypeId",
                table: "Question");

            migrationBuilder.DropPrimaryKey(
                name: "PK_QuestionTypes",
                table: "QuestionTypes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Question",
                table: "Question");

            migrationBuilder.RenameTable(
                name: "QuestionTypes",
                newName: "QuestionType");

            migrationBuilder.RenameTable(
                name: "Question",
                newName: "Questions");

            migrationBuilder.RenameIndex(
                name: "IX_Question_QuestionTypeId",
                table: "Questions",
                newName: "IX_Questions_QuestionTypeId");

            migrationBuilder.RenameIndex(
                name: "IX_Question_FormSubmissionId",
                table: "Questions",
                newName: "IX_Questions_FormSubmissionId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_QuestionType",
                table: "QuestionType",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Questions",
                table: "Questions",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_FormSubmissionsData_FormSubmissionId",
                table: "Questions",
                column: "FormSubmissionId",
                principalTable: "FormSubmissionsData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_QuestionType_QuestionTypeId",
                table: "Questions",
                column: "QuestionTypeId",
                principalTable: "QuestionType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
