import { readFile } from "fs/promises";
import { join } from "path";

export async function getSystemPrompt(): Promise<string> {
    try {
        const promptPath = join(process.cwd(), "docs", "prompts", "system_prompt_MAT-IA_v1.0.md");
        const promptContent = await readFile(promptPath, "utf-8");
        return promptContent;
    } catch (error) {
        console.error("Error loading system prompt:", error);
        throw new Error("Failed to load NAI system prompt");
    }
}
