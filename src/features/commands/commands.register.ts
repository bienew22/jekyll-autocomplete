import * as vscode from 'vscode';
import { rebuildTagCacheCommand } from './rebuild.tag.cache';
import { generateSlugCommand } from './generate.slug';

export function commandRegister(context: vscode.ExtensionContext) {
    // 사용자 정의 자동완성 설정 열기 명령어
    const openSettingsCmd = vscode.commands.registerCommand(
        "jekll.autocomplete.openSettings",
        () => {
            vscode.commands.executeCommand(
                "workbench.action.openSettings",
                "jekll.autocomplete.commands"
            );
        }
    );

    context.subscriptions.push(openSettingsCmd);

    // 사용자가 직접 태그 리스트 다시 스캔 하기
    const rebuildTagCacheCmd  = vscode.commands.registerCommand(
        "jekyll.autocomplete.rebuildCache",
        async () => { await rebuildTagCacheCommand(context); }
    );

    context.subscriptions.push(rebuildTagCacheCmd);

    const generateSlugCmd = vscode.commands.registerCommand(
        "jekyll.autocomplete.generateSlug",
        (document, position) => { generateSlugCommand(document, position); }
    );

    context.subscriptions.push(generateSlugCmd);
}