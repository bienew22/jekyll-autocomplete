import * as vscode from 'vscode';

/**
 * 현재 커서 위치가 front matter > tags 에 위치해 있는가?
 * @param document 현재 편집중인 문서
 * @param position 현재 커서 위치`
 * @returns boolean
 */

type FeildExpression =  {
    exp: RegExp
}

export const FEILD_EXP = {
    "TAGS": { exp: /tags:\s*\[([\s\S]*?)\]/ },
    "SLUG": { exp: /slug:\s*\"([\s\S]*?)\"/ }
};

/**
 * 커서의 위치가 현재 특정 필드에 존재여부를 확인
 * @param document 현재 문서
 * @param position 현재 커서 위치
 * @param field 검사하고자 하는 필드
 * @returns boolean
 */
export function isCursorInField(document: vscode.TextDocument, position: vscode.Position, feild: FeildExpression) {
    
    const range = getFrontMatterRange(document);

    if (!range || !range.contains(position)) {
        return false;
    }

    const text = document.getText(range);

    // tags: [ ... ] 전체 찾기
    const match = text.match(feild.exp);
    if (!match) {
        return false;
    }

    const startOffset = document.offsetAt(range.start) + match.index!;
    const endOffset = startOffset + match[0].length;

    const cursorOffset = document.offsetAt(position);

    return cursorOffset >= startOffset && cursorOffset <= endOffset;
}

export function getFrontMatterRange(document: vscode.TextDocument) {
    const text = document.getText();

    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) {
        return null;
    }

    const start = document.positionAt(match.index!);
    const end = document.positionAt(match.index! + match[0].length);

    return new vscode.Range(start, end);
}