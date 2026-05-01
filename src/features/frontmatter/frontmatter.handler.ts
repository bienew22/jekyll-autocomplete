import * as vscode from 'vscode';
import * as yaml from 'js-yaml';
import { frontmatterBuilder } from './frontmatter.builder';
import { extractFileName, fileValidataion } from './frontmatter.utils';

export async function onCreateFileHandler(event: vscode.FileCreateEvent) {
    for (const file of event.files) {
        // 파일 유효성 검사
        if (!fileValidataion(file)) {
            continue;
        }

        // 파일 이름 획득.
        const fileName = extractFileName(file.fsPath);

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

        const newFileName = extractFileName(file.newUri.fsPath);
        const oldFileName = extractFileName(file.oldUri.fsPath);

        // 단순히 파일 이동한 경우, 수행 X
        if (newFileName === oldFileName) {
            continue;
        }

        const edit = new vscode.WorkspaceEdit();

        // 파일 읽기
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

            const newFrontmatter = frontmatterBuilder({
                fileName: newFileName,
                yamlData
            });

            edit.replace(file.newUri, new vscode.Range(sPos, ePos), newFrontmatter);
        }
        await vscode.workspace.applyEdit(edit);
    }
}
