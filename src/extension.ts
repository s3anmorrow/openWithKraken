// publishing instructions: https://code.visualstudio.com/api/working-with-extensions/publishing-extension

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ExecException, exec } from 'child_process';
import { platform } from "node:os";

// command identifier
const COMMAND_ID:string = 'openwithkraken.open';

let myStatusBarItem: vscode.StatusBarItem;

// --------------------------------------- boilerplate methods
export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar item is selected
	subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {

		// error checking for no workspace folder opened
		if (vscode.workspace.workspaceFolders === undefined) {
			vscode.window.showErrorMessage("ERROR: No workspace / project folder is open");
			return;
		}

		// open gitkraken for all folders in workspace
		let command:string = "";
		vscode.workspace.workspaceFolders?.forEach((folder,index) => {		
			let path = folder.uri.path;
			// strip out starting "/" that is added to uri.path on windows machines
			if ((platform() === "win32") && (path.charAt(0) === "/")) {
				path = path.substring(1);
			}
			// add to shell command
			command += `gitkraken -p "${path}"`;

			// console.log(index);
			// console.log(vscode.workspace.workspaceFolders?.length);

			let length:number|undefined = vscode.workspace.workspaceFolders?.length;
			if ((length !== undefined) && (index < (length - 1))){
				command += " && ";
			}
		});

		// console.log(command);

		// invoke command to open gitkraken for each folder in the workspace (works for single folder or multi-root workspace)
		exec(command, (err:ExecException|null) => {
			if (err) {
				vscode.window.showErrorMessage(`ERROR: GitKraken not installed or path not setup in environment variables [${err.message}]`);
			}
		});
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	myStatusBarItem.command = COMMAND_ID;
	myStatusBarItem.tooltip = "Open project folder with GitKraken";
	subscriptions.push(myStatusBarItem);

	// update status bar item once at start
	myStatusBarItem.text = `$(repo-forked) GitKraken`;
	myStatusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}