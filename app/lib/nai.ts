import { SYSTEM_PROMPT } from "./system-prompt";

/**
 * NAI Core Interface
 * 
 * Centraliza la carga del System Prompt para asegurar consistencia 
 * arquitectónica entre la capa técnica y pedagógica.
 */

export async function getSystemPrompt(): Promise<string> {
    // Retorna directamente la constante exportada desde la capa técnica (ASCII-only)
    // Esto asegura que cualquier sanitización impacte a todo el sistema.
    return SYSTEM_PROMPT;
}
