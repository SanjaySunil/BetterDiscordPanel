Function Exit-BetterDiscordPanel-Updater {
  $caption = "
  "
  $description = "
  "
  Write-Host
  $choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Go back.",
        "Go back to selection panel."
  ))
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Exit",
        "Exit this script.
        "
  ))

  $selection = $host.ui.PromptForChoice($empty, $empty2, $choices, -1)
  Write-Host

  switch($selection) {
    0 {
      .\scripts\Selection.ps1
    }
    1 {
      Exit
    }
  }
}


# Check if BetterDiscordPanel is installed correctly
Write-Host "[BetterDiscordPanel]: Checking BetterDiscordPanel system..."
If (-Not (Test-Path ".git")) {
  Write-Host "[BetterDiscordPanel]: System check failed."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Check if you have installed BetterDiscordPanel correctly."
  Write-Host "[BetterDiscordPanel]: Get Help/Support for BetterDiscordPanel: https://discord.gg/9h822H3"

  Exit-BetterDiscordPanel-Updater
}
cls
Write-Host "[BetterDiscordPanel]: System check successful."
Write-Host


# Pull new changes to BetterDiscordPanel from GitHub
Write-Host "[BetterDiscordPanel]: Updating BetterDiscordPanel..."
Write-Host

git pull
If (-Not ($?)) {
  Write-Host "[BetterDiscordPanel]: Unable to update BetterDiscordPanel, error while updating BetterDiscordPanel."
  Write-Host "[BetterDiscordPanel]: Get Help/Support for BetterDiscordPanel: https://discord.gg/9h822H3"
  Write-Host

  Exit-BetterDiscordPanel-Updater
}


# Update was successful
Exit-BetterDiscordPanel-Updater
