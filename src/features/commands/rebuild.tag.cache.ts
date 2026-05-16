import * as vscode from 'vscode';
import { tagCache } from '../tags/tags.cache';
import { buildTagCache } from '../tags/tag.scanner';

export async function rebuildTagCacheCommand(context: vscode.ExtensionContext) {
    try {
        vscode.window.showInformationMessage("Rebuilding tag cache ...");

        // 1. 기존 캐시 삭제
        await context.workspaceState.update("tagCache", undefined);

        // 2. 메모리 캐시 초기화
        tagCache.clear();

        // 3. 전체 재스캔
        await buildTagCache(context);

        vscode.window.showInformationMessage("Tag cache rebuilt successfully ✅");
    } catch (e) {
        console.error(e);
        vscode.window.showErrorMessage("Failed to rebuild tag cache ❌");
    }
}