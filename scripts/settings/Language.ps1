<#
 * File: Language.ps1
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
            "&1 English",
        "$($locales.english_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&2 Spanish",
        "$($locales.english_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&3 German",
        "$($locales.english_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&4 Norwegian",
        "$($locales.english_help)"
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&5 Romanian",
        "$($locales.english_help)"
    ))
<#---------------------------------------
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&6 Russian",
        "$($locales.english_help)"
    ))
---------------------------------------#>
    
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
        $locales.language='en'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to English!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    1 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='es'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Spanish!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    2 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='de'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to German!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    3 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='no'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Norwegian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    4 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='ro'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Romanian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    5 {
        .\Settings.ps1
    }
}