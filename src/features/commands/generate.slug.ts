import matter from 'gray-matter';
import * as vscode from 'vscode';
import { generateSlug } from '../slug/slug.generator';

export async function generateSlugCommand(document: vscode.TextDocument, position: vscode.Position) {
    try {
        vscode.window.withProgress({
            location: vscode.ProgressLocation.Notification,
            title: "Slug 생성 중...",
            cancellable: false
        }, async () => {
            // 호출 시점에 이미 isCurosrInTags 통하여 frontmatter 존재 확인.
            const frontmatter = matter(document.getText());
            
            // 호출 후 frontmatter 지운 경우.
            if (!frontmatter) {
                vscode.window.showErrorMessage("Front matter is missing.");
                return;
            }

            // 제목이 없는 경우.
            if (!frontmatter || !frontmatter.data.title) {
                vscode.window.showErrorMessage("Plz fill post title.");
                return;
            }
                
            // slug 생성
            const slug = await generateSlug(frontmatter.data.title);
            
            // 적용
            const edit = new vscode.WorkspaceEdit();
            
            // slug 범위 구하기
            const line = document.lineAt(position.line).text;

            const start = line.indexOf('"');
            const end = line.lastIndexOf('"');

            if (start === -1 || end === -1 || start === end) {
                vscode.window.showErrorMessage('Invalid slug format. valid format is `slug: "asdf"`');
                return;
            }

            const range = new vscode.Range(position.line, start + 1, position.line, end);

            // 삽입
            edit.replace(document.uri, range, slug);

            await vscode.workspace.applyEdit(edit);

            vscode.window.showInformationMessage("Slug generated successfully.");

        });
    } catch (e) {
        vscode.window.showErrorMessage("Failed to generate slug.");
    }
}