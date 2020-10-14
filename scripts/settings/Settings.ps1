<#
 * File: Settings.ps1
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
Settings Menu
---------------------------------------#>

$caption = "Settings:
 "
$description = "[BetterDiscordPanel]: Select the option you would like to perform.
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Check for Updates",
    "$($locales.update_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Language",
    "$($locales.language_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Support",
    "$($locales.support_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Go Back",
    "$($locales.go_back_help)"
  ))

$selection = $host.ui.PromptForChoice($caption, $description, $choices, -1)
Write-Host

switch ($selection) {
  0 {
    .\Update.ps1
  }
  1 {
    .\Language.ps1
  }
  2 {
    .\Support.ps1
  }
  3 {
    Set-Location ..
    .\Selection.ps1
  }
}