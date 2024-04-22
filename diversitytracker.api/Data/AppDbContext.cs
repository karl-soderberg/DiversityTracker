using diversitytracker.api.Models;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }
        public DbSet<FormSubmission> FormSubmissionsData { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Person> People { get; set; }
    }
}