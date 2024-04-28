using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diversitytracker.api.Data.NewMigrations
{
    /// <inheritdoc />
    public partial class AIInterpretation_Add_AiAnswerData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "aiAnswerDataId",
                table: "AiQuestionInterpretation",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AiAnswerData",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    WordLength = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiAnswerData", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AiQuestionInterpretation_aiAnswerDataId",
                table: "AiQuestionInterpretation",
                column: "aiAnswerDataId");

            migrationBuilder.AddForeignKey(
                name: "FK_AiQuestionInterpretation_AiAnswerData_aiAnswerDataId",
                table: "AiQuestionInterpretation",
                column: "aiAnswerDataId",
                principalTable: "AiAnswerData",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AiQuestionInterpretation_AiAnswerData_aiAnswerDataId",
                table: "AiQuestionInterpretation");

            migrationBuilder.DropTable(
                name: "AiAnswerData");

            migrationBuilder.DropIndex(
                name: "IX_AiQuestionInterpretation_aiAnswerDataId",
                table: "AiQuestionInterpretation");

            migrationBuilder.DropColumn(
                name: "aiAnswerDataId",
                table: "AiQuestionInterpretation");
        }
    }
}
