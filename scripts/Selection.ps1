<#
 * File: Selection.ps1
 * Author: Sanjay Sunil
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

ElseIf ($config.language -eq 'fr') {
    $locales = (Get-Content '../locales/fr/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'de') {
    $locales = (Get-Content '../locales/de/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'es') {
    $locales = (Get-Content '../locales/es/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'no') {
    $locales = (Get-Content '../locales/no/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'ro') {
    $locales = (Get-Content '../locales/ro/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'ru') {
    $locales = (Get-Content '../locales/ru/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'hu') {
    $locales = (Get-Content '../locales/hu/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'nl') {
    $locales = (Get-Content '../locales/nl/panel.json' -Raw) | ConvertFrom-Json
}

ElseIf ($config.language -eq 'tr') {
	$locales = (Get-Content '../locales/tr/panel.json' -Raw) | ConvertFrom-Json
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
            "&1 Start $($locales.start_app)",
        "$($locales.desktop_panel_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&2 $($locales.settings)",
        "$($locales.settings_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&3 $($locales.exit)",
        "$($locales.exit_help)"
    ))

$selection = $host.ui.PromptForChoice($caption, $description, $choices, -1)
Write-Host

switch ($selection) {
    0 {
        Set-Location boot
        .\Checks.ps1
    }
    1 {
        Set-Location Settings
        .\Settings.ps1
    }
    2 {
        Exit
    }
}
