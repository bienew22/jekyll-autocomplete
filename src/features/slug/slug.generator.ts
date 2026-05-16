import * as vscode from 'vscode';
import { getGemini } from "../gemini/gemini";

export async function generateSlug(title: string): Promise<string> {

    const config = vscode.workspace.getConfiguration("jekll.autocomplete");
    const key = config.get<string>("gemini.api");

    if (!key || key.startsWith('fill')) {
        return "plz fill your gemini api keys";
    }

    const ai = await getGemini();

    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: `You are generating URL slugs for a technical blog.

Given a title, generate a clean, SEO-friendly English slug.

Process:
1. Remove unnecessary prefixes/suffixes (e.g., [], (), site names, tags)
2. Extract only the core technical keywords
3. Translate to natural English if the input is not English
4. Keep only meaningful words (remove stop words like "the", "a", "of")
5. Normalize into slug format

Formatting Rules:
- lowercase letters only
- words separated by hyphens
- no special characters
- 2 to 6 words preferred

Content Rules:
- prioritize technical and domain-specific terms
- avoid vague or generic words
- avoid redundancy
- keep it concise but descriptive

Prefer patterns like:
- {tech}-{concept}
- {platform}-{feature}
- {topic}-{guide}

If meaningful keywords cannot be extracted, fallback to a simple descriptive slug.

Examples:

Input: "[프로그래머스] 야근 지수"
Output: programmers-overtime-index

Input: "Jekyll 게시글 작성법"
Output: jekyll-post-guide

Input: "[Spring] OAuth JWT 인증 구현 방법"
Output: spring-oauth-jwt-authentication

Return only the slug.
No explanations, no quotes, no extra text.

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
