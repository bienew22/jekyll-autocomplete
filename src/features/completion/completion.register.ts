import * as vscode from 'vscode';
import { CompletionProvider } from './completion.provider';


export function completionRegister(context: vscode.ExtensionContext) {
    // auto completion
    const markdownCompletion = vscode.languages.registerCompletionItemProvider(
        { language: 'markdown' },
        new CompletionProvider(),
        '/' // triger character
    );

    console.log("EXTENSION ACTIVATED");
    
    context.subscriptions.push(markdownCompletion);
}