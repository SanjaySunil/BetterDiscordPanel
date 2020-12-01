<#
 * File: Selection.ps1
 * Author: Sanjay Sunil (a.k.a D3VSJ)
 * License: GPL-3.0
#>

Clear-Host

<#---------------------------------------
Language Translator 
---------------------------------------#>

$config = (Get-Content "../config/config.json" -Raw) | ConvertFrom-Json

If ($config.language -eq 'en') {
    $locales = (Get-Content '../locales/en/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'de') {
    $locales = (Get-Content '../locales/de/panel.json' -Raw) | ConvertFrom-Json
} 

Else {
    Start-Sleep -Seconds 0.1
    Write-Host "[ERROR]: INVALID LANGUAGE."
    Exit
}

<#---------------------------------------
Selection
---------------------------------------#>

$caption = "[BetterDiscordPanel]: $($locales.welcome) $env:UserName!
 "
$description = "[BetterDiscordPanel]: $($locales.select_option)
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&$($locales.start_web)",
        "$($locales.betterdiscordpanel_help)"
    ))
<#
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&DESKTOP APP - BetterDiscordPanel",
        "$($locales.desktop_panel_help)"
    ))
#>
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&$($locales.settings)",
        "$($locales.settings_help)"
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
        Set-Location boot
        .\Start.ps1
    }
    1 {
        Set-Location Settings
        .\Settings.ps1
    }
    2 {
        Exit
    }
}