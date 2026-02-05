import { SYSTEM_PROMPT } from "./system-prompt";
import fs from 'fs';
import path from 'path';

/**
 * NAI Core Interface
 * 
 * Centraliza la carga del System Prompt para asegurar consistencia 
 * arquitectónica entre la capa técnica y pedagógica.
 * 
 * AHORA INCLUYE: Carga dinámica de Skills desde .agent/skills
 */

export async function getSystemPrompt(): Promise<string> {
    let combinedPrompt = SYSTEM_PROMPT;

    try {
        // Ruta a la carpeta de skills (ajustada para entorno de ejecución Next.js server-side)
        // Nota: En producción esto dependerá de dónde se despliegue, asumimos sistema de archivos local.
        const skillsDir = path.join(process.cwd(), '.agent', 'skills');

        if (fs.existsSync(skillsDir)) {
            const skills = fs.readdirSync(skillsDir);
            let skillsContent = "\n\n===============================================================================\nSKILLS ACTIVOS DEL SISTEMA (CARGA DINÁMICA)\n===============================================================================\n";

            for (const skill of skills) {
                const skillPath = path.join(skillsDir, skill, 'SKILL.md');
                if (fs.existsSync(skillPath)) {
                    const content = fs.readFileSync(skillPath, 'utf-8');
                    skillsContent += `\n--- INICIO SKILL: ${skill} ---\n${content}\n--- FIN SKILL: ${skill} ---\n`;
                }
            }

            combinedPrompt += skillsContent;
            console.log(`[NAI] Skills cargados dinámicamente: ${skills.join(', ')}`);
        } else {
            console.warn("[NAI] Advertencia: No se encontró el directorio .agent/skills");
        }
    } catch (error) {
        console.error("[NAI] Error cargando skills dinámicos:", error);
        // Fallback: retornar prompt base sin skills en caso de error de FS
    }

    return combinedPrompt;
}
