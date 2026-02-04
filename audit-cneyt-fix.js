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
    console.log('--- FINAL CNEYT SEQUENCE AUDIT ---');

    // RESET CNEYT I & II to force fresh state
    await api('POST', '/api/test/reset', { asignatura: 'CNEYT', nivel: 'I' });
    await api('POST', '/api/test/reset', { asignatura: 'CNEYT', nivel: 'II' });

    const cneyt1 = await api('GET', '/api/status_update?asignatura=CNEYT&nivel=I');
    const cneyt2 = await api('GET', '/api/status_update?asignatura=CNEYT&nivel=II');

    console.log(`[CNEYT I]  Status: ${cneyt1.acreditacion.estado_proposito} | PF: ${cneyt1.proposito_formativo_id} (Expected: CNEYT-I-PF1)`);
    console.log(`[CNEYT II] Status: ${cneyt2.acreditacion.estado_proposito} | PF: ${cneyt2.proposito_formativo_id} (Expected: CNEYT-II-PF1)`);

    // Verify Total Count for I (Should be 8 now)
    // We can infer total count if trayecto is false at PF1.
    // Actually, status_update doesn't return total count in JSON directly, but we can verify sequence logic via PF Next.
    console.log(`[CNEYT I]  Next PF: ${cneyt1.proposito_formativo_siguiente}`);

    const passedI = cneyt1.proposito_formativo_id === 'CNEYT-I-PF1';
    const passedII = cneyt2.proposito_formativo_id === 'CNEYT-II-PF1';

    if (passedI && passedII && cneyt1.proposito_formativo_siguiente === 'CNEYT-I-PF2') {
        console.log('>>> VERIFICATION PASSED: START INDEX IS 1 & SEQUENCE IS LINKED <<<');
    } else {
        console.log('>>> VERIFICATION FAILED <<<');
    }
}

run();
