import * as vscode from 'vscode';
import matter from "gray-matter";
import { fileValidataion } from '../utils/file';
import { isCursorInTags, TAG_EXP } from '../utils/frontmatter';
import { genSlug } from './slug.generator';



export class SlugProvider implements vscode.CompletionItemProvider {
    async provideCompletionItems(
            document: vscode.TextDocument, position: vscode.Position, 
            token: vscode.CancellationToken, context: vscode.CompletionContext) {
        if (!fileValidataion(document.fileName)) {
            return [];
        }

        if (!isCursorInTags(document, position, TAG_EXP.SLUG)) {
            return [];
        }

        // isCurosrInTags를 통하여 이미 검증 완료 -> null 일수 없음.
        const frontmatter = matter(document.getText());

        if (!frontmatter.data.title) {
            const emptyTitle = new vscode.CompletionItem("plz fill post title.");
            emptyTitle.filterText = 's plz fill post tile.';
            emptyTitle.insertText = "plz fill post title.";
            return [emptyTitle];
        }
        
        const slug = await genSlug(frontmatter.data.title);
        
        const suggestion = new vscode.CompletionItem(slug);
        suggestion.filterText = 's';
        suggestion.insertText = slug;

        return [ suggestion ];
    }
}
// const item = new vscode.CompletionItem(tag[0]);

//             item.filterText = `t${tag[0]}`;
//             item.insertText = `${tag[0]}, `;
//             item.sortText = String(99999 - (Number(tag[1]) || 0)).padStart(5, '0') + tag[0];
//             item.detail = tag[1];

//             return item;

// function 