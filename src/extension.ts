import * as vscode from 'vscode';
import { frontmatterRegister } from './features/frontmatter/frontmatter.register';
import { completionRegister } from './features/completion/completion.register';
import { commandRegister } from './features/commands/commands.register';
import { buildTagCache } from './features/tags/tag.scanner';
import { tagsRegister } from './features/tags/tags.register';


export async function activate(context: vscode.ExtensionContext) {

	await buildTagCache(context);

	// frontmatter - 이벤트 등록
	frontmatterRegister(context);

	// 자동완성 이벤트 등록
	completionRegister(context);

	// 명령어 추가
	commandRegister(context);

	// 태그 자동 완성
	tagsRegister(context);

	console.log("EXTENSION ACTIVATED");
}

export function deactivate() {}