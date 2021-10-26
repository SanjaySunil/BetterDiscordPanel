<#
 * File: Languages2.ps1
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
Language Settings
---------------------------------------#>

$caption = "[BetterDiscordPanel]: $($locales.language):
 "
$description = "[BetterDiscordPanel]: $($locales.language_help)
 "

$choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&1 Norwegian",
        "Select Norwegian."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&2 Romanian",
        "Select Romanian."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&3 Hungarian",
        "Select Hungarian."
    ))
	$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&4 Dutch",
        "Select Dutch."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&5 More Languages",
        "More languages."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
          -ArgumentList `
          "&6 $($locales.go_back)",
        "$($locales.go_back_help)"
      ))

$selection = $host.ui.PromptForChoice($caption, $description, $choices, -1)
Write-Host

switch ($selection) {
    0 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='no'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Norwegian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    1 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='ro'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Romanian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    2 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='hu'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Hungarian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    3 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='nl'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Dutch!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    4 {
      .\Languages\Languages3.ps1
    }
    5 {
      .\Languages\Languages1.ps1
    }
}
