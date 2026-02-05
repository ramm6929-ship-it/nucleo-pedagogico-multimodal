const http = require('http');

console.log("🚀 Iniciando Test BFF (Nativo)...");

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test-bff',
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

const req = http.request(options, (res) => {
    console.log(`📡 Status Code: ${res.statusCode}`);

    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            if (res.statusCode === 200) {
                const json = JSON.parse(data);
                console.log("✅ Respuesta recibida:");
                console.log(JSON.stringify(json, null, 2));

                if (json.verbatim_check && json.verbatim_check.passed &&
                    json.level_integrity_check && json.level_integrity_check.passed) {
                    console.log("🎉 VERIFICACIÓN EXITOSA: El agente cumple el Contrato BFF.");
                } else {
                    console.error("❌ VERIFICACIÓN FALLIDA: Violación detectada.");
                    if (!json.verbatim_check?.passed) console.error("   -> Falló chequeo Verbatim.");
                    if (!json.level_integrity_check?.passed) console.error("   -> Falló chequeo Integridad de Nivel.");
                }
            } else {
                console.error(`❌ Error Server: ${data}`);
            }
        } catch (e) {
            console.error("❌ Error parseando respuesta:", e);
            console.log("Raw Response:", data);
        }
    });
});

req.on('error', (e) => {
    console.error(`❌ Error de conexión: ${e.message}`);
});

req.end();
