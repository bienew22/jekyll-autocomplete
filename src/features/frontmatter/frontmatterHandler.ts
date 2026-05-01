import * as vscode from 'vscode';

export async function frontmatterHandler(event: vscode.FileCreateEvent) {
    for (const file of event.files) {
        //--- 파일 유효성 검사 ---//
        // 1. md 파일만 처리
        if (!file.fsPath.endsWith('.md')) {
            continue;
        }
        
        // 2. _posts 폴더 제한 
        if (!file.fsPath.includes('_posts')) {
            continue;
        }

        // 3. yyyy-mm-dd-title.md 조건 검사
        const fileName = file.fsPath.split(/[/\\]/).pop() || '';

        console.log(file.fsPath.split(/[/\\]/));

        const regex = /^\d{4}-\d{2}-\d{2}-.+\.md$/;

        if (!regex.test(fileName)) {
            continue;
        }
        
        //--- frontmatter 기본 정보 추출 ---//

        // 1. 생성 시간
        const now = new Date();

        const date = now.toISOString().split('T')[0];
        const time = now.toLocaleTimeString('en-GB', { hour12: false });

        // 2. 제목 추출
        const title = fileName
            .replace(/^\d{4}-\d{2}-\d{2}-/, '') // 날쩨 제거
            .replace('.md', '');                // 확장자 제거

        const frontMatter = 
`---
title: ${title}
slug: 
description: 
author: bienew22
date: ${date} ${time} +09:00
#last_modified_at: ${date} ${time} +09:00
tags: []
media_subpath: /assets/img/
#image:
#    path: 
---
`;

        // frontmatter 주입
        const edit = new vscode.WorkspaceEdit();

        edit.insert(file, new vscode.Position(0, 0), frontMatter);
        
        await vscode.workspace.applyEdit(edit);
    }
}