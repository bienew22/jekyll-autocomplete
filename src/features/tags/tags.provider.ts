import * as vscode from 'vscode';
import { isCursorInTags } from './tags.utils';
import { tagCache } from './tags.cache';
import { fileValidataion } from '../utils/file';


export class TagsProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
            document: vscode.TextDocument, position: vscode.Position, 
            token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        
        if (!fileValidataion(document.fileName)) {
            return [];
        }

        if (!isCursorInTags(document, position)) {
            return [];
        }
        
        return tagCache.getAll().map((tag) => {
            const item = new vscode.CompletionItem(tag[0]);

            item.filterText = `t${tag[0]}`;
            item.insertText = `${tag[0]}, `;
            item.sortText = tag[1];
            item.detail = tag[1];

            return item;
        });
    }
}