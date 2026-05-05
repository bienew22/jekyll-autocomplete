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
}