using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// =========================================================================
// 🧰 SERVICES REGISTRATION
// =========================================================================
builder.Services.AddControllers();

builder.Services
    .AddAuthentication("Training")
    .AddScheme<AuthenticationSchemeOptions, TrainingAuthHandler>("Training", null);

builder.Services.AddAuthorization();

var app = builder.Build();

// =========================================================================
// 🛣️ MIDDLEWARE PIPELINE ORDER (EXERCISE 1B)
// =========================================================================

// 1. Custom Logging must be FIRST (the absolute outer wrapper)
app.UseMiddleware<RequestLoggingMiddleware>();

// 2. Exception handling slot (wired now for future ProblemDetails exercises)
app.UseExceptionHandler("/error"); 

// 3. Standard pipeline core checkpoints
app.UseHttpsRedirection();
app.UseRouting();

// 4. Security gates
app.UseAuthentication();
app.UseAuthorization();

// 5. Protected Endpoint (Mapped LAST)
app.MapGet("/api/assessments/results", () => Results.Ok(new
{
    courseCode = "CS-101",
    studentId = "S-001",
    letterGrade = "A"
})).RequireAuthorization();

app.MapControllers();

app.Run();