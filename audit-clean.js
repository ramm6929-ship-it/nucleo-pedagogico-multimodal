const http = require('http');

async function getStatus(subject) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000/api/status_update?asignatura=${subject}&nivel=I`, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
    });
}

async function run() {
    const cneyt = await getStatus('CNEYT');
    const pm = await getStatus('PM');

    console.log('--- PF STATUS CONTRACT AUDIT ---');
    console.log(`[CNEYT] Status: ${cneyt.acreditacion.estado_proposito} | PF: ${cneyt.proposito_formativo_id}`);
    console.log(`[PM]    Status: ${pm.acreditacion.estado_proposito} | PF: ${pm.proposito_formativo_id}`);

    if (cneyt.acreditacion.estado_proposito === 'EN_PROCESO' && pm.acreditacion.estado_proposito === 'EN_PROCESO') {
        console.log('>>> VERIFICATION PASSED: BOTH SUBJECTS COMPLIANT <<<');
    } else {
        console.log('>>> VERIFICATION FAILED: STATUS DISCREPANCY DETECTED <<<');
    }
}

run();
