using diversitytracker.api.Models;
using diversitytracker.api.Models.OpenAi;
using Microsoft.EntityFrameworkCore;

namespace diversitytracker.api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }
        public DbSet<FormSubmission> FormSubmissionsData { get; set; }
        public DbSet<QuestionType> QuestionTypes { get; set; }
        public DbSet<Person> People { get; set; }
        public DbSet<AiInterpretation> AiInterpretations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Person to FormSubmission relationship
            modelBuilder.Entity<Person>()
                .HasMany(p => p.FormSubmissions)
                .WithOne(fs => fs.Person)
                .HasForeignKey(fs => fs.PersonId);

            // FormSubmission to Question relationship
            modelBuilder.Entity<FormSubmission>()
                .HasMany(fs => fs.Questions)
                .WithOne(q => q.FormSubmission)
                .HasForeignKey(q => q.FormSubmissionId);

            // Question to QuestionType relationship
            modelBuilder.Entity<Question>()
                .HasOne(q => q.QuestionType)
                .WithMany()
                .HasForeignKey(q => q.QuestionTypeId);
        }
    }
}