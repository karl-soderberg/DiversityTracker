using System.Text.Json.Serialization;
using diversitytracker.api.Configurations;
using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
.AddJsonOptions(options => {
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("dockerDb"));
});

builder.Services.AddScoped<IFormsRepository, FormsDataRepository>();
builder.Services.AddScoped<IQuestionsRepository, QuestionsRepository>();

builder.Services.AddAutoMapper(typeof(AutomapperConfig));

builder.Services.AddAuthorizationBuilder()
  .AddPolicy("isAdmin", policy =>
    policy.RequireClaim("role", "admin"));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
