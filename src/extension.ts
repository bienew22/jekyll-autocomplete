import * as vscode from 'vscode';
import { registerFrontmatter } from './features/frontmatter/registerFrontmatter';

export function activate(context: vscode.ExtensionContext) {

	// frontmatter - 이벤트 등록
	registerFrontmatter(context);
}

export function deactivate() {}