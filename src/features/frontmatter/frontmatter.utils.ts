import * as vscode from 'vscode';


/**
 * 파일 유효성 검사
 * @param file 파일 uri
 * @returns boolean, 문제없으면 true
 */
export function fileValidataion(file: vscode.Uri): boolean {
    // 1. md 파일만 처리
    if (!file.fsPath.endsWith('.md')) {
        return false;
    }

    // 2. _posts 폴더 제한 
    if (!file.fsPath.includes('_posts')) {
        return false;
    }

    // 3. 파일명 양식 yyyy-mm-dd-title.md 검사
    const fileName = extractFileName(file.fsPath);
    const regex = /^\d{4}-\d{2}-\d{2}-.+\.md$/;

    if (!regex.test(fileName)) {
        return false;
    }

    return true;
}

/**
 * 파일 경로 스트링(file://file.txt)에서 파일 이름 추출.
 * @param uri 파일 경로
 * @returns 파일 이름
 */
export function extractFileName(uri: string): string {
    return uri.split(/[/\\]/).pop() || "";
}

/**
 * 파일 이름 (yyyy-mm-dd-title.md) 에서 title 만 추출하는 기능.
 * @param fileName 파일 이름
 * @returns 제목
 */
export function extractTitle(fileName: string): string {
    return fileName
		.replace(/^\d{4}-\d{2}-\d{2}-/, '') // 날쩨 제거
		.replace('.md', '');                // 확장자 제거
}

/**
 * Date를 `yyyy-mm-dd hh:mi:ss` 문자열로 변경
 * @param d Date 객체
 * @returns 변환된 문자열.
 */
export function formatDateTime(d: Date): string {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');

	const hh = String(d.getHours()).padStart(2, '0');
	const mi = String(d.getMinutes()).padStart(2, '0');
	const ss = String(d.getSeconds()).padStart(2, '0');

	return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}
