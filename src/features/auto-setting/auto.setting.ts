import * as vscode from 'vscode';

export async function autoSetting() {
    const config = vscode.workspace.getConfiguration("jekll.autocomplete");

    // gemini api key 옵션 자동 추가
    const apiKey = config.get<string>("gemini.api");
    
    if (!apiKey) {
        await config.update(
            "gemini.api",
            "fill your api key",
            vscode.ConfigurationTarget.Workspace
        );
    }

    // 사용자 정의 명령어 구조 추가

    const userCommand = config.get<Record<string, any>>("commands", {});

    if (!userCommand || Object.keys(userCommand).length === 0) {
        const defaultCommands = {
            "custom-code": {
              sort: "999",
              desc: "코드 블럭",
              insert: "```$1\n$2\n```"
            },

            "명령어 이름": {
                sort: "정렬 순서 (문자열 숫자, 예: 001)",
                desc: "명령어 설명 텍스트",
                insert: "삽입될 스니펫"
            }
        };

        await config.update(
            "commands",
            defaultCommands,
            vscode.ConfigurationTarget.Workspace
        );
    }



}