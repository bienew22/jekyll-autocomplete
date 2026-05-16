import * as vscode from 'vscode';
import { frontmatterRegister } from './features/frontmatter/frontmatter.register';
import { completionRegister } from './features/completion/completion.register';
import { commandRegister } from './features/commands/commands.register';
import { tagsRegister } from './features/tags/tags.register';
import { slugRegister } from './features/slug/slug.register';
import { autoSetting } from './features/auto-setting/auto.setting';


export async function activate(context: vscode.ExtensionContext) {

	// 기본적인 설정 추가.
	autoSetting();

	// frontmatter - 이벤트 등록
	frontmatterRegister(context);

	// 자동완성 이벤트 등록
	completionRegister(context);

	// 명령어 추가
	commandRegister(context);

	// 태그 자동 완성
	await tagsRegister(context);

	// slug 자동 완성
	slugRegister(context);

	console.log("EXTENSION ACTIVATED");
}

export function deactivate() {}