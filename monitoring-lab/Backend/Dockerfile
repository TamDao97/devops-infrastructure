# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 1. Copy file cấu hình project trước
COPY ["Backend.csproj", "./"]
RUN dotnet restore "Backend.csproj"

# 2. Thay vì dùng 'COPY . .', hãy copy tường minh các thư mục mã nguồn C# thực tế của bạn
COPY Controllers/ ./Controllers/
COPY Models/ ./Models/
COPY Services/ ./Services/
COPY Program.cs ./
COPY appsettings.json ./

# 3. Tiến hành publish
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# --- Stage 2: Run ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]