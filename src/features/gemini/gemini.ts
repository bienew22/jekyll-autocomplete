import * as vscode from 'vscode';

let aiInstance: Promise<any> | null = null;

export async function getGemini() {
    if (!aiInstance) {
        const config = vscode.workspace.getConfiguration("jekll.autocomplete");
        const key = config.get<string>("gemini.api");

        aiInstance = (async () => {
            const { GoogleGenAI } = await import("@google/genai");

            return new GoogleGenAI({
                apiKey: key
            });
        })();
    }

    return aiInstance;
}
