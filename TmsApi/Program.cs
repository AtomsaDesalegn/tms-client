using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.DependencyInjection;
// 👆 This links everything together if your project uses a namespace
using TmsApi; 

var builder = WebApplication.CreateBuilder(args);

// =========================================================================
// 🧰 SERVICES REGISTRATION (Dependency Injection Container)
// =========================================================================
builder.Services.AddControllers();

// Register the temporary training authentication services
builder.Services
    .AddAuthentication("Training")
    .AddScheme<AuthenticationSchemeOptions, TrainingAuthHandler>("Training", null);

builder.Services.AddAuthorization();

var app = builder.Build();

// =========================================================================
// 🛣️ HTTP REQUEST PIPELINE MIDDLEWARE ORDER (Your TODOs)
// =========================================================================

// TODO1: Register routing in the pipeline where it belongs for your app.
app.UseRouting();

// TODO2: Register authentication and authorization in the pipeline 
// where your template expect them for a protected route.
app.UseAuthentication();
app.UseAuthorization();

// TODO3: Map GET /api/assessments/results with the same response body as the starter, 
// but require authorization for that route.
app.MapGet("/api/assessments/results", () => Results.Ok(new
{
    courseCode = "CS-101",
    studentId = "S-001",
    letterGrade = "A"
})).RequireAuthorization();

// Keep controller endpoints mapping active
app.MapControllers();

app.Run();