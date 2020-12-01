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

ElseIf ($config.language -eq 'de') {
    $locales = (Get-Content '../../locales/de/panel.json' -Raw) | ConvertFrom-Json
} 

Else {
    Start-Sleep -Seconds 0.1
    Write-Host "[ERROR]: INVALID LANGUAGE."
    Exit
}

<#---------------------------------------
Settings Menu
---------------------------------------#>

$caption = "$($locales.settings):
 "
$description = "[BetterDiscordPanel]: $($locales.select_option)
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.update)",
    "$($locales.update_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.language)",
    "$($locales.language_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.support)",
    "$($locales.support_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.go_back)",
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