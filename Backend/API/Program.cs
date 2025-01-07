using System.Text;
using API.Workers;
using Application;
using Application.Helpers;
using Application.Interfaces;
using Infrastructure;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add configuration files
builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                     .AddJsonFile($"appsettings.{builder.Environment.EnvironmentName}.json", optional: true, reloadOnChange: true)
                     .AddJsonFile("appsettings.override.json", optional: true, reloadOnChange: true);

// Env variables
var ConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var jwtKey = Encoding.ASCII.GetBytes(builder.Configuration.GetSection("JwtSettings")["Key"]);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.AllowAnyOrigin()
                   .AllowAnyMethod()
                   .AllowAnyHeader();
        });
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(jwtKey)
        };
    });

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DatabaseContext>(options =>
{
    options.UseSqlServer(ConnectionString, sqlOptions => sqlOptions.MigrationsAssembly("API"));
});

builder.Services.AddScoped<ITransferService, TransferService>();
builder.Services.AddScoped<ITransferRepo, TransferRepo>();

builder.Services.AddScoped<IManagementService, ManagementService>();
builder.Services.AddScoped<IManagementRepo, ManagementRepo>();

builder.Services.AddSingleton<JWTSettings>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepo, UserRepo>();

builder.Services.AddHostedService<TransferWorker>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<DatabaseContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
