import * as fs from "fs";
import * as vscode from "vscode";
import matter from "gray-matter";
import { tagCache } from "./tags.cache";


export async function buildTagCache(context: vscode.ExtensionContext) {

    // 캐시로부터 tag 정보 가져오기.
    const saved = context.workspaceState.get("tagCache");

    if (saved) {
        tagCache.deserialize(saved);
        console.log("use cache");
        return;
    } 

    console.log("full scan");

    // 최초 1회 전체 스캔하여 tag 정보 획득.
    const files = await vscode.workspace.findFiles("_posts/**/*.md");

    for (const file of files) {
        const tags = extractTagFromFile(file.fsPath);

        for (const tag of tags) {
            tagCache.add(tag);
        }
    }

    // tag 정보 저장
    await context.workspaceState.update(
        "tagCache",
        tagCache.serialize()
    );
}


function extractTagFromFile(filePath: string): string[] {
    try {
        const content = fs.readFileSync(filePath, "utf-8");
        const parsed = matter(content);

        const tags = parsed.data.tags;

        if (!Array.isArray(tags)) {
            return [];
        } 

        return tags.map(tag => String(tag).trim()).filter(Boolean);
    } catch (e) {
        return [];
    }
}