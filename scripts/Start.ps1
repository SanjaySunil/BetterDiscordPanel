Write-Host "[BetterDiscordPanel]: Checking BetterDiscordPanel system ..."
If (Test-Path ".\index.html") {
  Write-Host "[BetterDiscordPanel]: System check successful."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Booting up BetterDiscordPanel ..."
  Write-Host

  Start-Process '../../index.html'
}
Else {
  Write-Host "[BetterDiscordPanel]: System check failed."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Check if index.html file exists"
  Write-Host "[BetterDiscordPanel]: Please reinstall the panel."
}
Write-Host



