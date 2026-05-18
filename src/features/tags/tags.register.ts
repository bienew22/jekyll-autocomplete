import * as vscode from 'vscode';
import { TagsProvider } from './tags.provider';
import { buildTagCache, removeFileTags, updateFileTags } from './tag.scanner';


export async function tagsRegister(context: vscode.ExtensionContext) {
    // tag 목록 갖고오기
    await buildTagCache(context);

    // 파일 생성 수정 삭제 시 업데이트 (yyyy-mm-dd-title.md)
    const watcher = vscode.workspace.createFileSystemWatcher("**/_posts/**/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]-*.md");

    watcher.onDidCreate(uri => updateFileTags(context, uri));
    watcher.onDidChange(uri => updateFileTags(context, uri));
    watcher.onDidDelete(uri => removeFileTags(context, uri));

    context.subscriptions.push(watcher);
    
    // tag auto completion
    const tagsCompletion = vscode.languages.registerCompletionItemProvider(
        { language: 'markdown' },
        new TagsProvider(),
        '/' // triger character
    );
    
    context.subscriptions.push(tagsCompletion);
}