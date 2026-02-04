const http = require('http');

async function api(method, path, body = null) {
    return new Promise((resolve) => {
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: path,
            method: method,
            headers: body ? { 'Content-Type': 'application/json' } : {}
        };
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        if (body) req.write(JSON.stringify(body));
        req.end();
    });
}

async function run() {
    console.log('--- FINAL PF STATUS AUDIT (CONTRACT FIX) ---');

    // Reset PM to PF1
    await api('POST', '/api/test/reset', { asignatura: 'PMI', nivel: 'I' });

    // Check both
    const cneyt = await api('GET', '/api/status_update?asignatura=CNEYT&nivel=I');
    const pm = await api('GET', '/api/status_update?asignatura=PMI&nivel=I');

    console.log(`[CNEYT] PF: ${cneyt.proposito_formativo_id} | Status: ${cneyt.acreditacion.estado_proposito}`);
    console.log(`[PM]    PF: ${pm.proposito_formativo_id} | Status: ${pm.acreditacion.estado_proposito}`);

    if (cneyt.acreditacion.estado_proposito === 'EN_PROCESO' && pm.acreditacion.estado_proposito === 'EN_PROCESO') {
        console.log('>>> VERIFICATION PASSED: BOTH SUBJECTS ARE EN_PROCESO <<<');
    } else {
        console.log('>>> VERIFICATION FAILED: STATUS VIOLATION DETECTED <<<');
    }
}

run();
