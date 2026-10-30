using Prometheus;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Cấu hình Serilog từ appsettings.json
builder.Host.UseSerilog((context, services, configuration) => configuration
    .ReadFrom.Configuration(context.Configuration)
    .ReadFrom.Services(services)
    .Enrich.FromLogContext());

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Đảm bảo có Middleware bắt Exception để log tự động
app.UseSerilogRequestLogging();

// 1. Thu thập HTTP Request Metrics tự động (Rate, Duration, Status Code)
app.UseHttpMetrics();

app.UseRouting();

// 2. Public endpoint metrics để Prometheus cào dữ liệu
app.MapMetrics();

// 3. Endpoint giả lập lỗi HTTP 500 (Dùng để test Error Rate trên Dashboard RED)
app.MapGet("/simulate-error", () =>
{
    // Cố tình gây ra NullReferenceException để ứng dụng trả về HTTP 500 Internal Server Error
    string? text = null;
    int length = text.Length;

    return Results.Ok(new { message = "Success" });
});

// 4. Endpoint mẫu bình thường (HTTP 200) để test Rate & Latency
app.MapGet("/normal-api", async () =>
{
    // Giả lập độ trễ xử lý (Latency) nhẹ khoảng 100ms
    await Task.Delay(100);
    return Results.Ok(new { message = "Everything is running smoothly!" });
});

app.Run();
