const http = require('http');

async function checkStatus(asignatura) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000/api/status_update?asignatura=${asignatura}&nivel=I`, (res) => {
            let data = '';
            res.on('data', (chunk) => { data += chunk; });
            res.on('end', () => {
                const s = JSON.parse(data);
                console.log(`[AUDIT] ${asignatura}: Status is ${s.acreditacion.estado_proposito} (PF: ${s.proposito_formativo_id})`);
                resolve(s.acreditacion.estado_proposito);
            });
        });
    });
}

async function run() {
    console.log('--- PF STATUS AUDIT (CONTRACT FIX) ---');
    await checkStatus('CNEYT');
    await checkStatus('PM');
    console.log('---------------------------------------');
}

run();
