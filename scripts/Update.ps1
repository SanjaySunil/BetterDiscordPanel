Function Exit-BetterDiscordPanel-Updater {
  Write-Host
  Write-Host "[BetterDiscordPanel]: Get Help/Support at discord.gg/9h822h3."
  Write-Host

  Exit-PSSession
}


# Check if BetterDiscordPanel is installed correctly
Write-Host "[BetterDiscordPanel]: Checking BetterDiscordPanel system..."
If (-Not (Test-Path ".git")) {
  Write-Host "[BetterDiscordPanel]: System check failed."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Check if you have installed BetterDiscordPanel correctly."
  Write-Host "[BetterDiscordPanel]: Follow the installation guide."

  Exit-BetterDiscordPanel-Updater
}
Write-Host "[BetterDiscordPanel]: System check successful."
Write-Host


# Pull new changes to BetterDiscordPanel from GitHub
Write-Host "[BetterDiscordPanel]: Updating BetterDiscordPanel..."
Write-Host

git pull
If (-Not ($?)) {
  Write-Host "[BetterDiscordPanel]: Unable to update BetterDiscordPanel, error while updating BetterDiscordPanel."
  Write-Host "[BetterDiscordPanel]: Contact BetterDiscordPanel Support for help."
  Write-Host

  Exit-BetterDiscordPanel-Updater
}


# Update was successful
Write-Host "[BetterDiscordPanel]: BetterDiscordPanel was successfully updated."
Write-Host

Write-Host "[BetterDiscordPanel]: Ready to boot up and start running!"

Exit-BetterDiscordPanel-Updater
