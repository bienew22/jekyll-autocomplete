import * as vscode from 'vscode';
import { frontmatterHandler } from './frontmatterHandler';


export function registerFrontmatter(context: vscode.ExtensionContext) {
    // 파일 생성시 frontmatter 자동 주입.
    const onCreate = vscode.workspace.onDidCreateFiles(async (event) => {
        frontmatterHandler(event);
    });



    context.subscriptions.push(onCreate);
}