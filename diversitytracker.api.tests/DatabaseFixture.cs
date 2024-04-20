using Microsoft.EntityFrameworkCore;
using diversitytracker.api.Data;
using diversitytracker.api.Models;

public class DatabaseFixture
{
    public AppDbContext DbContext { get; private set; }

    public DatabaseFixture()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: "DiversityTrackerTestsDb")
            .Options;

        DbContext = new AppDbContext(options);
        SeedDatabase();
        DbContext.SaveChanges();
    }
    private void SeedDatabase()
    {
        var forms = new List<BaseForm>
        {
            new BaseForm { Id = 1, QuestionType = QuestionType.leadership, Value = 5, Description = "Leadership Quality Insights" },
            new BaseForm { Id = 2, QuestionType = QuestionType.represented, Value = 10, Description = "Representation in Upper Management" },
            new BaseForm { Id = 3, QuestionType = QuestionType.leadership, Value = 15, Description = "Survey on Leadership Styles" },
            new BaseForm { Id = 4, QuestionType = QuestionType.represented, Value = 20, Description = "Diversity in Tech Roles" }
        };

        DbContext.BaseFormsData.AddRange(forms);
        DbContext.Database.EnsureCreated();
    }
    public void Dispose()
    {
        DbContext.Database.EnsureDeleted();
        DbContext.Dispose();
    }
}
