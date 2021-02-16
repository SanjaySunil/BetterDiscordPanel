<#
 * File: Language.ps1
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
        "Select English."
	))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&2 French",
        "Select French."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&3 Spanish",
        "Select Spanish."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&4 German",
        "Select German."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&5 Norwegian",
        "Select Norwegian."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&6 Romanian",
        "Select Romanian."
    ))
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&7 Hungarian",
        "Select Hungarian."
    ))
	$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&8 Dutch",
        "Select Dutch."
    ))
<#---------------------------------------
$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
            -ArgumentList `
            "&9 Russian",
        "Select Russian"
    ))
---------------------------------------#>

$choices.Add((
        New-Object Management.Automation.Host.ChoiceDescription `
          -ArgumentList `
          "&9 $($locales.go_back)",
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
        $locales.language='fr'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to French!"
        Start-Sleep -s 2
        .\Settings.ps1
	}
    2 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='es'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Spanish!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    3 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='de'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to German!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    4 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='no'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Norwegian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    5 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='ro'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Romanian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    6 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='hu'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Hungarian!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
	7 {
        $locales = (Get-Content "../../config/config.json" -Raw) | ConvertFrom-Json
        $locales.language='nl'
        $locales | ConvertTo-Json -depth 32| set-content '../../config/config.json'
        Write-Host "Successfully changed language to Dutch!"
        Start-Sleep -s 2
        .\Settings.ps1
    }
    8 {
        .\Settings.ps1
    }
}
