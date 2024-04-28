using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace diversitytracker.api.Data.NewMigrations
{
    /// <inheritdoc />
    public partial class Add_AiInterpretations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AiInterpretations",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ReflectionsInterpretation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RealDataInterpretation = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiInterpretations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AiQuestionInterpretation",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    QuestionTypeId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AnswerInterpretation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ValueInterpretation = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AiInterpretationId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AiQuestionInterpretation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AiQuestionInterpretation_AiInterpretations_AiInterpretationId",
                        column: x => x.AiInterpretationId,
                        principalTable: "AiInterpretations",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AiQuestionInterpretation_QuestionTypes_QuestionTypeId",
                        column: x => x.QuestionTypeId,
                        principalTable: "QuestionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AiQuestionInterpretation_AiInterpretationId",
                table: "AiQuestionInterpretation",
                column: "AiInterpretationId");

            migrationBuilder.CreateIndex(
                name: "IX_AiQuestionInterpretation_QuestionTypeId",
                table: "AiQuestionInterpretation",
                column: "QuestionTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AiQuestionInterpretation");

            migrationBuilder.DropTable(
                name: "AiInterpretations");
        }
    }
}
