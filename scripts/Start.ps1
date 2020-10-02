cls
Write-Host "[BetterDiscordPanel]: Checking BetterDiscordPanel system ..."
If (Test-Path ".\index.html") {
  Write-Host "[BetterDiscordPanel]: System check successful."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Booting up BetterDiscordPanel ..."
  Write-Host

  Start-Process '../../index.html'

  Write-Host "[BetterDiscordPanel]: Done!"

  
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
Else {
  Write-Host "[BetterDiscordPanel]: System check failed."
  Write-Host

  Write-Host "[BetterDiscordPanel]: Check if index.html exists."
  Write-Host "[BetterDiscordPanel]: Please reinstall the panel and try again."
  Write-Host "[BetterDiscordPanel]: Get Help/Support for BetterDiscordPanel: https://discord.gg/9h822H3"
}
Write-Host

