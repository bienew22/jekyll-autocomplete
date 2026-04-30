import * as vscode from 'vscode';

export async function frontmatterHandler(event: vscode.FileCreateEvent) {
    for (const file of event.files) {

        // md 파일만 처리
        if (!file.fsPath.endsWith('.md')) {
            continue;
        }

        const editor = await vscode.window.showTextDocument(file);

        const now = new Date().toISOString().split('T')[0];

        const frontMatter =
`---
title: 
date: ${now}
tags: []
categories: []
---
`;

        await editor.edit(editBuilder => {
            editBuilder.insert(new vscode.Position(0, 0), frontMatter);
        });
    }
}