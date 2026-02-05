import { NextResponse } from 'next/server';
import { processChat } from '@/app/actions/chat';
import { getPropositoFormativo } from '@/app/lib/canonical-pf-data';

export async function GET(request: Request) {
    try {
        const testUserId = "audit-bff-" + Date.now();
        const asignatura = "CNEYT";

        console.log(`🔍 [BFF-TEST] Iniciando verificación para usuario: ${testUserId}`);

        // 1. Ejecutar chat (simular inicio)
        const response = await processChat("Hola, quiero aprender ciencia", testUserId, asignatura);

        // 2. Extraer texto del modelo
        const aiMessage = response.answer || "";
        // Usar proposito_formativo_actual que es el ID oficial
        const pfId = response.status_update?.proposito_formativo_actual ||
            response.status_update?.proposito_formativo_id ||
            "CNEYT-I-PF1";

        console.log(`📝 [BFF-TEST] Mensaje AI: "${aiMessage.substring(0, 100)}..."`);
        console.log(`🎯 [BFF-TEST] PF Detectado: ${pfId}`);

        // 3. Obtener texto oficial canónico
        const pfCanonical = getPropositoFormativo(pfId);
        if (!pfCanonical) {
            return NextResponse.json({
                status: "error",
                message: `PF Canónico no encontrado para ${pfId}`
            }, { status: 500 });
        }

        const textoOficial = pfCanonical.texto_oficial;

        // 4. VERIFICACIÓN 1: Fidelidad del Texto (BFF Contract 15.1)
        // El texto oficial DEBE estar contenido en el mensaje.
        // Normalizamos espacios para evitar falsos negativos por formatting.
        const normalizedAiMsg = aiMessage.replace(/\s+/g, ' ').toLowerCase();
        const normalizedOfficial = textoOficial.replace(/\s+/g, ' ').toLowerCase();

        const containsVersbatim = normalizedAiMsg.includes(normalizedOfficial);

        // 5. VERIFICACIÓN 2: No mezcla de niveles (BFF Contract 15.2)
        // Palabras clave de niveles avanzados que NO deberían estar en CNEYT-I-PF1
        const prohibitedKeywords = [
            "célula", "genética", "mitosis", // CNEYT VI
            "derivada", "límite", // PM V
            "entropía", // CNEYT II
        ];

        const violations = prohibitedKeywords.filter(w => normalizedAiMsg.includes(w));

        const result = {
            test: "BFF Contract Compliance",
            timestamp: new Date().toISOString(),
            pf_active: pfId,
            verbatim_check: {
                passed: containsVersbatim,
                expected_fragment: textoOficial.substring(0, 50) + "..."
            },
            level_integrity_check: {
                passed: violations.length === 0,
                violations_detected: violations
            },
            full_response: aiMessage
        };

        return NextResponse.json(result);

    } catch (error) {
        const fs = require('fs');
        const path = require('path');
        const logPath = path.join(process.cwd(), 'bff-error.log');
        fs.appendFileSync(logPath, `[${new Date().toISOString()}] ERROR: ${String(error)}\nStack: ${error instanceof Error ? error.stack : 'No stack'}\n`);

        return NextResponse.json({
            status: "error",
            error: String(error)
        }, { status: 500 });
    }
}
