import * as vscode from 'vscode';
import { TagsProvider } from './tags.provider';


export function tagsRegister(context: vscode.ExtensionContext) {
    // tag auto completion
    const tagsCompletion = vscode.languages.registerCompletionItemProvider(
        { language: 'markdown' },
        new TagsProvider(),
        't' // triger character
    );
    
    context.subscriptions.push(tagsCompletion);
}