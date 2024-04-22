using System.Text.Json.Serialization;
using diversitytracker.api.Configurations;
using diversitytracker.api.Contracts;
using diversitytracker.api.Data;
using diversitytracker.api.Repository;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options => {
    options.UseSqlServer(builder.Configuration.GetConnectionString("dockerDb"));
});

builder.Services.AddScoped<IFormsDataRepository, FormsDa>();

builder.Services.AddAutoMapper(typeof(AutomapperConfig));

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
