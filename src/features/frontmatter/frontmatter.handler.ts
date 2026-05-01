import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import { frontmatterBuilder } from './frontmatter.builder';

export async function onCreateFileHandler(event: vscode.FileCreateEvent) {
    for (const file of event.files) {
        // 파일 유효성 검사
        if (!fileValidataion(file)) {
            continue;
        }

        // 파일 이름 획득.
        const fileName = file.fsPath.split(/[/\\]/).pop() || '';

        // 파일에 frontmatter 추가
        const edit = new vscode.WorkspaceEdit();

        edit.insert(file, new vscode.Position(0, 0), frontmatterBuilder({ fileName }));

        await vscode.workspace.applyEdit(edit);
    }
}

export async function onRenameeFileHandler(event: vscode.FileRenameEvent) {
    for (const file of event.files) {
        // 파일 유효성 검사
        if (!fileValidataion(file.newUri)) {
            continue;
        }

        const newFileName = file.newUri.fsPath.split(/[/\\]/).pop() || '';
        const oldFileName = file.oldUri.fsPath.split(/[/\\]/).pop() || '';

        // 단순히 파일 이동한 경우, 수행 X
        if (newFileName === oldFileName) {
            console.log("equal name");
            continue;
        }

        // 파일 읽기
        const edit = new vscode.WorkspaceEdit();
        const document = await vscode.workspace.openTextDocument(file.newUri);
        const text = document.getText();

        // 변경된 파일에 이미 frontmatter 존재 여부 확인
        const frontmatterMatch = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);

        if (!frontmatterMatch) {
            // 수정한 파일에 frontmatter가 없는 경우.
            // 새로 만들어서 추가.
            edit.insert(file.newUri, new vscode.Position(0, 0), frontmatterBuilder({ fileName: newFileName }));
        } else {
            // 수정한 파일에 이미 frontmatter가 있는 경우.
            const sPos = document.positionAt(frontmatterMatch.index || 0);
            const ePos = document.positionAt((frontmatterMatch.index || 0) + frontmatterMatch[0].length);

            const yamlData = yaml.load(frontmatterMatch[1]) || {};

            console.log(yamlData);

            const newFrontmatter = frontmatterBuilder({
                fileName: newFileName,
                yamlData
            });

            edit.replace(file.newUri, new vscode.Range(sPos, ePos), newFrontmatter);
        }
        await vscode.workspace.applyEdit(edit);
    }
}

/**
 * 파일 유효성 검사
 * @param file 파일 uri
 * @returns boolean, 문제없으면 true
 */
function fileValidataion(file: vscode.Uri): boolean {
    // 1. md 파일만 처리
    if (!file.fsPath.endsWith('.md')) {
        return false;
    }

    // 2. _posts 폴더 제한 
    if (!file.fsPath.includes('_posts')) {
        return false;
    }

    // 3. 파일명 양식 yyyy-mm-dd-title.md 검사
    const fileName = file.fsPath.split(/[/\\]/).pop() || '';
    const regex = /^\d{4}-\d{2}-\d{2}-.+\.md$/;

    if (!regex.test(fileName)) {
        return false;
    }

    return true;
}