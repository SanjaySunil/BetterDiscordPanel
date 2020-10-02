Function Exit-BetterDiscordPanel-Updater {
  $caption = "
  "
  $description = "
  "
  Write-Host
  $choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Go back.",
        "Go back to selection panel."
  ))
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Exit",
        "Exit this script.
        "
  ))

  $selection = $host.ui.PromptForChoice($empty, $empty2, $choices, -1)
  Write-Host

  switch($selection) {
    0 {
      .\scripts\Selection.ps1
    }
    1 {
      Exit
    }
  }
}
  cls
  $caption = "Are you sure you want to reinstall the panel?
  "
  $description = "All files will be deleted and the panel will be reinstalled from GitHub.
  "
  Write-Host
  $choices = New-Object Collections.ObjectModel.Collection[Management.Automation.Host.ChoiceDescription]
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Yes, I am sure.",
        "Reinstall BetterDiscordPanel."
  ))
    $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&No, go back.",
        "Go back to selection panel."
  ))
  $choices.Add((
    New-Object Management.Automation.Host.ChoiceDescription `
      -ArgumentList `
        "&Exit",
        "Exit this script.
        "
  ))

  $selection = $host.ui.PromptForChoice($caption, $description, $choices, -1)
  Write-Host

  switch($selection) {
    0 {
      .\scripts\Reset.ps1
    }
    1 {
      .\scripts\Selection.ps1
    }
    2 {
      Exit
    }
  }
