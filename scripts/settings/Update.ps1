<#
 * File: Update.ps1
 * Author: Sanjay Sunil (a.k.a D3VSJ)
 * License: GPL-3.0
#>

Clear-Host

<#---------------------------------------
Language Translator 
---------------------------------------#>

$config = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json

If ($config.language -eq 'en') {
    $locales = (Get-Content '../../locales/en/panel.json' -Raw) | ConvertFrom-Json
}

<#
ElseIf ($config.language -eq 'New Language') {
    $locales = (Get-Content '../../locales/New Language/panel.json' -Raw) | ConvertFrom-Json
} 
#>

Else {
    Start-Sleep -Seconds 0.1
    Write-Host "[ERROR]: LANGUAGE NOT DEFINED / INVALID LANGUAGE."
    Exit
}

<#---------------------------------------
Updater
---------------------------------------#>

Function Exit-BetterDiscordPanel-Updater {
  $caption = ""
  $description = ""

  Write-Host

  $choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
  $choices.Add((
      New-Object Management.Automation.Host.ChoiceDescription `
        -ArgumentList `
        "&Go back.",
      "$($locales.go_back_help)"
    ))
  $choices.Add((
      New-Object Management.Automation.Host.ChoiceDescription `
        -ArgumentList `
        "&Exit",
      "$($locales.exit_help)"
    ))

  $selection = $host.ui.PromptForChoice($empty, $empty2, $choices, -1)
  Write-Host

  switch ($selection) {
    0 {
      Set-Location scripts
      Set-Location Settings
      .\Settings.ps1
    }
    1 {
      Exit
    }
  }
}


Write-Host "[BetterDiscordPanel]: $($locales.checking_system)"

Set-Location ..
Set-Location ..

If (-Not (Test-Path ".git")) {
  Write-Host "[BetterDiscordPanel]: $($locales.check_failure)"
  Write-Host

  Write-Host "[BetterDiscordPanel]: $($locales.check_installation)"
  Write-Host "[BetterDiscordPanel]: $($locales.check_repo_download_method)"
  Write-Host "[BetterDiscordPanel]: $($locales.get_help) https://discord.gg/9h822H3"

  Exit-BetterDiscordPanel-Updater
}

Clear-Host

Write-Host "[BetterDiscordPanel]: $($locales.check_success)"
Write-Host

Write-Host "[BetterDiscordPanel]: $($locales.updating)"
Write-Host

git pull
If (-Not ($?)) {
  Write-Host "[BetterDiscordPanel]: $($locales.updating_failure)"
  Write-Host "[BetterDiscordPanel]: $($locales.get_help) https://discord.gg/9h822H3"
  Write-Host

  Exit-BetterDiscordPanel-Updater
}


# Update was successful
Exit-BetterDiscordPanel-Updater