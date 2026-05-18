import * as vscode from 'vscode';

/**
 * 현재 커서 위치가 front matter > tags 에 위치해 있는가?
 * @param document 현재 편집중인 문서
 * @param position 현재 커서 위치`
 * @returns boolean
 */

type FieldExpression =  {
    name: string,
    exp: RegExp
}

export const FIELD_EXP = {
    "TAGS": { name: "tags", exp: /tags:\s*\[([\s\S]*?)\]/ },
    "SLUG": { name: "slug", exp: /slug:\s*\"([\s\S]*?)\"/ }
};

/**
 * 커서의 위치가 현재 특정 필드에 존재여부를 확인
 * @param document 현재 문서
 * @param position 현재 커서 위치
 * @param field 검사하고자 하는 필드
 * @returns boolean
 */
export function isCursorInField(document: vscode.TextDocument, position: vscode.Position, field: FieldExpression) {
    
    // 현재 파일에 frontmatter가 없거나 범위 밖인 경우
    const range = getFrontMatterRange(document);

    if (!range || !range.contains(position)) {
        return false;
    }

    const frontmatter = document.getText(range);

    // frontmatter에 해당 필드가 없는 경우
    const match = frontmatter.match(field.exp);
    if (!match) {
        return false;
    }

    // 현재 정규식 안에 존재 여부 확인
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