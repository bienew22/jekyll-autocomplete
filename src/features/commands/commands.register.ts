import * as vscode from 'vscode';

export function commandRegister(context: vscode.ExtensionContext) {
    const openSettings = vscode.commands.registerCommand(
        "jekll.autocomplete.openSettings",
        () => {
            vscode.commands.executeCommand(
                "workbench.action.openSettings",
                "jekll.autocomplete.commands"
            );
        }
    );

    context.subscriptions.push(openSettings);
}