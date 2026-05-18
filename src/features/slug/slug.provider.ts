import * as vscode from 'vscode';
import matter from "gray-matter";
import { fileValidataion } from '../utils/file';
import { isCursorInField, FIELD_EXP } from '../utils/frontmatter';


export class SlugProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
            document: vscode.TextDocument, position: vscode.Position, 
            token: vscode.CancellationToken, context: vscode.CompletionContext) {
        if (!fileValidataion(document.fileName)) {
            return [];
        }

        if (!isCursorInField(document, position, FIELD_EXP.SLUG)) {
            return [];
        }
        
        const item = new vscode.CompletionItem(
            "create slug",
            vscode.CompletionItemKind.Snippet
        );

        item.detail = "gemini api로 slug 생성";
        item.insertText = "";
        item.filterText = "s";

        item.command = {
            command: "jekyll.autocomplete.generateSlug",
            title: "Generate Slug with gemini",
            arguments: [document, position]
        };

        return [item];
    }
}