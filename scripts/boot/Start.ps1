<#
 * File: Start.ps1
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
BetterDiscordPanel Web Boot-up
---------------------------------------#>

Write-Host "[BetterDiscordPanel]: $($locales.checking_system)"
If (Test-Path "..\..\index.html") {
    Write-Host "[BetterDiscordPanel]: $($locales.check_success)"
    Write-Host

    Write-Host "[BetterDiscordPanel]: $($locales.booting)"
    Write-Host

    Start-Process '../../index.html'

    Write-Host "[BetterDiscordPanel]: $($locales.done)"

  
    $caption = ""
    $description = ""

    Write-Host
    $choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
    $choices.Add((
            New-Object Management.Automation.Host.ChoiceDescription `
                -ArgumentList `
                "&Go back.",
            "Go back to the selection panel."
        ))
    $choices.Add((
            New-Object Management.Automation.Host.ChoiceDescription `
                -ArgumentList `
                "&Exit",
            "Exit this script."
        ))

    $selection = $host.ui.PromptForChoice($empty, $empty2, $choices, -1)

    Write-Host

    switch ($selection) {
        0 {
            Set-Location ..
            .\Selection.ps1
        }
        1 {
            Exit
        }
    }

}
Else {
    Write-Host "[BetterDiscordPanel]: $($locales.check_failure)"
    Write-Host

    Write-Host "[BetterDiscordPanel]: $($locales.check_index)"
    Write-Host "[BetterDiscordPanel]: $($locales.get_help)"
}
Write-Host
