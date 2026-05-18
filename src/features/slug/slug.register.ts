import * as vscode from 'vscode';
import { SlugProvider } from './slug.provider';


export function slugRegister(context: vscode.ExtensionContext) {
    
    // slug suggestion
    const tagsCompletion = vscode.languages.registerCompletionItemProvider(
        { language: 'markdown' },
        new SlugProvider(),
        '/' // triger character
    );
    
    context.subscriptions.push(tagsCompletion);
}