FROM microsoft/dotnet:2.2-sdk AS build
WORKDIR /src
COPY ControlPanel/. ./ControlPanel/
RUN dotnet restore "ControlPanel/ControlPanel.csproj"
WORKDIR "/src/ControlPanel"
RUN dotnet build "ControlPanel.csproj" -c Release -o /app
RUN dotnet publish "ControlPanel.csproj" -c Release -o /app


FROM microsoft/dotnet:2.2-aspnetcore-runtime AS final
WORKDIR /app
COPY --from=build /app .
ENTRYPOINT ["dotnet", "ControlPanel.dll"]
EXPOSE 80

