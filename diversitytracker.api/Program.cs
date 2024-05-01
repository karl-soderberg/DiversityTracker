using System.Reflection;
using System.Text.Json.Serialization;
using diversitytracker.api.Configurations;
using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Repository;
using diversitytracker.api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// builder.Services.AddControllers();
// var config = new ConfigurationBuilder()
// .AddJsonFile("appsettings.json", false, true)
// .AddUserSecrets(Assembly.GetExecutingAssembly(), true)
// .Build();

builder.Services.AddControllers()
.AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("ASPNET_SQL"));
});

builder.Services.AddScoped<IFormsRepository, FormsDataRepository>();
builder.Services.AddScoped<IQuestionsRepository, QuestionsRepository>();
builder.Services.AddScoped<IAiInterpretationRepository, AiInterpretationRepository>();
builder.Services.AddHttpClient<IAiInterpretationService, AiInterpretationService>();

builder.Services.AddAutoMapper(typeof(AutomapperConfig));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = null;
        options.Audience = null;
    });

builder.Services.AddAuthorizationBuilder()
  .AddPolicy("isAdmin", policy =>
    policy.RequireClaim("role", "admin"));

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// if (app.Environment.IsDevelopment())
// {
//     app.UseSwagger();
//     app.UseSwaggerUI();
// }

app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
