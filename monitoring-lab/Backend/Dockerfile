# --- Stage 1: Build ---
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# 1. Chỉ copy file csproj trước để tận dụng cache restore
COPY ["Backend.csproj", "./"]
RUN dotnet restore "Backend.csproj"

# 2. Sau đó mới copy toàn bộ mã nguồn còn lại
COPY . .
RUN dotnet publish "Backend.csproj" -c Release -o /app/publish

# --- Stage 2: Run ---
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Backend.dll"]