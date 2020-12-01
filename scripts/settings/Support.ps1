<#
 * File: Support.ps1
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
Support
---------------------------------------#>

$caption = "$($locales.support):
 "
$description = "[BetterDiscordPanel]: $($locales.select_option)
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.discordserver)",
    "$($locales.discord_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.submit_issue)",
    "$($locales.issue_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.go_back)",
    "$($locales.go_back_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&$($locales.exit)",
    "$($locales.exit_help)"
  ))

$selection = $host.ui.PromptForChoice($caption, $description, $choices, -1)
Write-Host

switch ($selection) {
  0 {
    Start-Process 'https://discord.com/invite/9h822H3'
    .\Support.ps1
  }
  1 {
    Start-Process 'https://github.com/D3VSJ/BetterDiscordPanel/issues/new/choose'
    .\Support.ps1
  }
  2 {
    .\Settings.ps1
  }
  3 {
    Exit
  }
}