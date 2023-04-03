// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// command identifier
const COMMAND_ID:string = 'openwithkraken.open';
let myStatusBarItem: vscode.StatusBarItem;

// --------------------------------------- private methods

// --------------------------------------- boilerplate methods
export function activate({ subscriptions }: vscode.ExtensionContext) {
	// register a command that is invoked when the status bar
	// item is selected
	subscriptions.push(vscode.commands.registerCommand(COMMAND_ID, () => {

		console.log(vscode.workspace.workspaceFolders);


		vscode.workspace.workspaceFolders?.forEach(folder => {
			console.log(folder.uri.path);

			const cp = require('child_process');
			cp.exec(`gitkraken -p ${folder.uri.path}`, (err:any, stdout:any, stderr:any) => {
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

	// // register some listener that make sure the status bar 
	// // item always up-to-date
	// subscriptions.push(vscode.window.onDidChangeActiveTextEditor(updateStatusBarItem));
	// subscriptions.push(vscode.window.onDidChangeTextEditorSelection(updateStatusBarItem));

	// update status bar item once at start
	myStatusBarItem.text = `$(repo-forked) GitKraken`;
	myStatusBarItem.show();
}

// This method is called when your extension is deactivated
export function deactivate() {}
