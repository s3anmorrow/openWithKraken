# Open with GitKraken

A VS Code extension to open the current project folder's repo in GitKraken. If a multi-root workspace is open, all folders' repos within the workspace will be opened in GitKraken.

## Features

The extension adds the following to VS Code:
- a shiny new button to the status bar that opens the current project folder in GitKraken

> ![added status bar button](https://raw.githubusercontent.com/s3anmorrow/openWithKraken/main/images/button.png)

- a new command to the Command Palette (Ctrl+Shift+P) called "Open with GitKraken" that opens the current project folder

> ![added command](https://raw.githubusercontent.com/s3anmorrow/openWithKraken/main/images/command.png)

Selecting either will open up your current project folder in GitKraken. It does this by executing the following shell command:

```
gitkraken -p [path to project folder]
```

The extension will display error messages if: 
- a project / workspace is not currently opened 
- GitKraken is not installed on the machine
- the path to gitkraken.exe is not setup correctly in the PATH environment variable of windows ([C:\Users\[username]\AppData\Local\gitkraken\bin]). This should have been done automatically when installing GitKraken.