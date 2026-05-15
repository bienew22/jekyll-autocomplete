import * as vscode from 'vscode';
import { tagCache } from './tags.cache';
import { fileValidataion } from '../utils/file';
import { isCursorInTags, TAG_EXP } from '../utils/frontmatter';


export class TagsProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
            document: vscode.TextDocument, position: vscode.Position, 
            token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        
        if (!fileValidataion(document.fileName)) {
            return [];
        }

        if (!isCursorInTags(document, position, TAG_EXP.TAGS)) {
            return [];
        }
        
        return tagCache.getAll().map((tag) => {
            const item = new vscode.CompletionItem(tag[0]);

            item.filterText = `t${tag[0]}`;
            item.insertText = `${tag[0]}, `;
            item.sortText = String(99999 - (Number(tag[1]) || 0)).padStart(5, '0') + tag[0];
            item.detail = tag[1];

            return item;
        });
    }
}