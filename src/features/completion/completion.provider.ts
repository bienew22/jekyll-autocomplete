import * as vscode from 'vscode';
import { AutoCompleteCommands, PREDEFINED_COMMANDS } from './completion.dsl';
import { fileValidataion } from '../utils/file';
import { getFrontMatterRange } from '../utils/frontmatter';


export class CompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, 
        token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        
        if (!fileValidataion(document.fileName)) {
            return [];
        }

        const frontmatterRange = getFrontMatterRange(document);

        if (frontmatterRange?.contains(position)) {
            return [];
        }

        const start = position.translate(0, -1);

        return getCommands()
            .map(cmd => this.createItem(cmd, start, position));
    }

    private createItem(cmd: AutoCompleteCommands, start: vscode.Position, end: vscode.Position): vscode.CompletionItem {
        const item = new vscode.CompletionItem(
            cmd.label,
            vscode.CompletionItemKind.Snippet
        );

        // 명령어 검색 설정 - 라벨과 설명 허용
        item.filterText = `/${cmd.label} /${cmd.desc}`;
        
        // 명령어 정렬 기준 설정
        item.sortText = cmd.sort;

        // 명령어 설명 설정
        item.detail = cmd.desc;

        // 명령어 선택 시 교체되는 문구 설정
        item.range = new vscode.Range(start, end);
        item.insertText = new vscode.SnippetString(cmd.insert);

        return item;
    }

}

function getCommands(): AutoCompleteCommands[] {
    const userConfig = vscode.workspace.getConfiguration("jekll.autocomplete");
    const obj = userConfig.get<Record<string, any>>("commands", {});

    const userCommands = Object.entries(obj).map(([label, cmd]) => ({
        label,
        sort: cmd.sort ?? "999",
        desc: cmd.desc ?? "",
        insert: cmd.insert
    }));

    return [...PREDEFINED_COMMANDS, ...userCommands];
}