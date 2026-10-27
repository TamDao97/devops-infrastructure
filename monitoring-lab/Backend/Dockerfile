# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Chỉ copy file csproj của project Web API (thay 'Backend.csproj' bằng tên file csproj thực tế của bạn)
COPY ["Backend.csproj", "./"]
RUN dotnet restore "Backend.csproj"

# Copy toàn bộ source code còn lại
COPY . .
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# --- Stage 2: Run ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]