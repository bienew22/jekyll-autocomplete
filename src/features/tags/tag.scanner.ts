import * as fs from "fs";
import * as vscode from "vscode";
import matter from "gray-matter";
import { tagCache } from "./tags.provider";


export async function buildTagCache() {

    const files = await vscode.workspace.findFiles("**/*.md");

    for (const file of files) {
        const tags = extractTagFromFile(file.fsPath);

        for (const tag of tags) {
            tagCache.add(tag);
        }
    }

    console.log(tagCache);
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