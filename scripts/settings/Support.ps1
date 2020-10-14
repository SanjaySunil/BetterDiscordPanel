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
Support
---------------------------------------#>

$caption = "Support:
 "
$description = "[BetterDiscordPanel]: Select the option you would like to perform.
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Discord Server",
    "$($locales.discord_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Submit a Issue/Bug Report/Suggestion",
    "$($locales.issue_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Go Back",
    "$($locales.go_back_help)"
  ))
$choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
      "&Exit",
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