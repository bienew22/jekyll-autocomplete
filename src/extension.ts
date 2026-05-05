import * as vscode from 'vscode';
import { frontmatterRegister } from './features/frontmatter/frontmatter.register';
import { completionRegister } from './features/completion/completion.register';

export function activate(context: vscode.ExtensionContext) {

	// frontmatter - 이벤트 등록
	frontmatterRegister(context);

	// 자동완성 이벤트 등록
	completionRegister(context);
}

export function deactivate() {}