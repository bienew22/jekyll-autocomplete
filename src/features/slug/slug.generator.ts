import * as vscode from 'vscode';
import { getGemini } from "../gemini/gemini";

export async function genSlug(title: string): Promise<string> {

    const config = vscode.workspace.getConfiguration("jekll.autocomplete");
    const key = config.get<string>("gemini.api");

    if (!key || key.startsWith('fill')) {
        return "plz fill your gemini api keys";
    }

    const ai = await getGemini();

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `Given a title, generate a clean English slug for a URL.

Requirements:
- Use lowercase letters
- Replace spaces with hyphens
- Remove special characters
- Keep it concise and meaningful

Example1:
Input: "[프로그래머스] 야근 지수"
Output: programmers-overtime-index

Example2:
Input: "Jeykll 게시글 작성법"
Output: jekyll-post-writing-guide

Return only the slug.
Do not include "Output:", quotes, or any additional text.

Title: ${title}`});

        return response.text;
    } catch (err: any) {
        if (err.status === 400) {
            return "check your api key";
        } else {
            return "api usage limit reached.";
        }
    }
} 
