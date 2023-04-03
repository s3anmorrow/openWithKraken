// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { exec } from 'child_process';

// command identifier
const COMMAND_ID:string = 'openwithkraken.open';

let myStatusBarItem: vscode.StatusBarItem;

// --------------------------------------- private methods

// --------------------------------------- boilerplate methods
export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar item is selected
	subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {

		console.log(vscode.workspace.workspaceFolders);




		// open gitkraken for all folders in workspace
		vscode.workspace.workspaceFolders?.forEach(folder => {

			// TODO error check for undefined meaning no workspace folder is open
			// console.log(`${folder.uri.path}`);
			
			// invoke command to open gitkraken for each folder in the workspace (works for single folder or multi-root workspace)
			exec(`gitkraken -p ${folder.uri.path}`, (err:any, stdout:any, stderr:any) => {
				if (err) {
					console.log(`ERROR: {err.message}`);
					vscode.window.showInformationMessage(`ERROR: Do you have GitKraken installed? [${err.message}]`);
				}
			});
		});
	}));

	// create a new status bar item that we can now manage
	myStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
	
	// myStatusBarItem.color = "#FFFFFF";

	myStatusBarItem.command = COMMAND_ID;
	myStatusBarItem.tooltip = "Open project folder with GitKraken";
	subscriptions.push(myStatusBarItem);


	console.log("OpenWithKraken activated!");


	// update status bar item once at start
	myStatusBarItem.text = `$(repo-forked) GitKraken`;
	myStatusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
