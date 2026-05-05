import * as vscode from 'vscode';
import { MarkdownCompletionProvider } from './markdown.completion.provider';


export function completionRegister(context: vscode.ExtensionContext) {
    // markdown auto completion
    const markdownCompletion = vscode.languages.registerCompletionItemProvider(
        { language: 'markdown' },
        new MarkdownCompletionProvider(),
        '/' // triger character
    );

    console.log("EXTENSION ACTIVATED");
    

    context.subscriptions.push(markdownCompletion);

//     vscode.workspace.onDidChangeTextDocument(event => {
//     const editor = vscode.window.activeTextEditor;
    
//     if (!editor) {
//         return;
//     }

//     const change = event.contentChanges[0];
    
//     if (!change) {
//         return;
//     }
    
//     // "/" 입력 감지
//     if (change.text === '/') {
//         vscode.commands.executeCommand('editor.action.triggerSuggest');
//     }
// });
}