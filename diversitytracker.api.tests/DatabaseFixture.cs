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
        
        DbContext.SaveChanges();
    }

    public void Dispose()
    {
        DbContext.Database.EnsureDeleted();
        DbContext.Dispose();
    }
}
