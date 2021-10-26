<#
 * File: Update.ps1
 * Author: Sanjay Sunil
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

ElseIf ($config.language -eq 'fr') {
	$locales = (Get-Content '../../locales/fr/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'de') {
	$locales = (Get-Content '../../locales/de/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'es') {
	$locales = (Get-Content '../../locales/es/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'no') {
	$locales = (Get-Content '../../locales/no/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'ro') {
	$locales = (Get-Content '../../locales/ro/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'ru') {
	$locales = (Get-Content '../../locales/ru/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'hu') {
	$locales = (Get-Content '../../locales/hu/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'nl') {
	$locales = (Get-Content '../../locales/nl/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'tr') {
	$locales = (Get-Content '../../locales/tr/panel.json' -Raw) | ConvertFrom-Json
}

Else {
	Start-Sleep -Seconds 0.1
	Write-Host "[ERROR]: INVALID LANGUAGE."
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
        "&1 $($locales.go_back)",
      "$($locales.go_back_help)"
    ))
  $choices.Add((
      New-Object Management.Automation.Host.ChoiceDescription `
        -ArgumentList `
        "&2 $($locales.exit)",
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

If (-Not (Test-Path "node_modules")) {
  Write-Host "[BetterDiscordPanel]: Installing dependicies."
  Write-Host

  npm install
  If (-Not ($?)) {
    Write-Host "[BetterDiscordPanel]: $($locales.updating_failure)"
    Write-Host "[BetterDiscordPanel]: $($locales.get_help) https://discord.gg/9h822H3"
    Write-Host

    Exit-BetterDiscordPanel-Updater
  }
}

# Update was successful
Set-Location scripts
Set-Location boot
.\Start.ps1
