import * as vscode from 'vscode';
import { frontmatterRegister } from './features/frontmatter/frontmatter.register';

export function activate(context: vscode.ExtensionContext) {

	// frontmatter - 이벤트 등록
	frontmatterRegister(context);
}

export function deactivate() {}