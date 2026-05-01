import * as vscode from 'vscode';
import { onCreateFileHandler, onRenameeFileHandler } from './frontmatter.handler';



export function registerFrontmatter(context: vscode.ExtensionContext) {
    // 파일 생성시 frontmatter 자동 주입.
    const onCreate = vscode.workspace.onDidCreateFiles(async (event) => {
        onCreateFileHandler(event);
    });

    // 파일 이름 수정시 frontmatter 자동 변경.
    const onChange = vscode.workspace.onDidRenameFiles(async (event) => {
        onRenameeFileHandler(event);
    });

    context.subscriptions.push(onCreate);
    context.subscriptions.push(onChange);
}