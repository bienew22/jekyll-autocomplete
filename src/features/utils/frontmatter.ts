import * as vscode from 'vscode';

/**
 * 현재 커서 위치가 front matter > tags 에 위치해 있는가?
 * @param document 현재 편집중인 문서
 * @param position 현재 커서 위치`
 * @returns boolean
 */

type TagExpression =  {
    exp: RegExp
}

export const TAG_EXP = {
    "TAGS": { exp: /tags:\s*\[([\s\S]*?)\]/ },
    "SLUG": { exp: /slug:\s*\"([\s\S]*?)\"/ }
};

export function isCursorInTags(document: vscode.TextDocument, position: vscode.Position, tag: TagExpression) {
    
    const range = getFrontMatterRange(document);

    if (!range || !range.contains(position)) {
        return false;
    }

    const text = document.getText(range);

    // tags: [ ... ] 전체 찾기
    const match = text.match(tag.exp);
    if (!match) {
        return false;
    }

    const startOffset = document.offsetAt(range.start) + match.index!;
    const endOffset = startOffset + match[0].length;

    const cursorOffset = document.offsetAt(position);

    return cursorOffset >= startOffset && cursorOffset <= endOffset;
}


function getFrontMatterRange(document: vscode.TextDocument) {
    const text = document.getText();

    const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);

    if (!match) {
        return null;
    }

    const start = document.positionAt(match.index!);
    const end = document.positionAt(match.index! + match[0].length);

    return new vscode.Range(start, end);
}