import * as vscode from 'vscode';
import { isCursorInTags } from './tags.utils';
import { TagCache } from './tags.cache';


export const tagCache = new TagCache();

export class TagsProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
            document: vscode.TextDocument, position: vscode.Position, 
            token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {

        if (!isCursorInTags(document, position)) {
            return;
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