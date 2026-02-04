const http = require('http');

const url = 'http://localhost:3000/api/status_update?asignatura=CNEYT&nivel=I';

http.get(url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const status = JSON.parse(data);
        console.log('--- CNEYT AUDIT RESULT ---');
        console.log('Asignatura:', status.asignatura_activa);
        console.log('PF ID:', status.proposito_formativo_id);
        console.log('Estado:', status.acreditacion.estado_proposito);
        console.log('Decision:', status.decision_academica.resultado);
        console.log('Accion:', status.decision_academica.accion_siguiente);
        console.log('Trayecto Concluido:', status.trayecto_concluido);

        if (status.asignatura_activa === 'CNEYT' &&
            status.proposito_formativo_id === 'CNEYT-I-PF1' &&
            status.acreditacion.estado_proposito === 'NO_INICIADO' &&
            status.decision_academica.resultado === 'AVANZA' &&
            status.trayecto_concluido === false) {
            console.log('>>> VERIFICATION PASSED: CONTRACT COMPLIANT <<<');
        } else {
            console.log('>>> VERIFICATION FAILED: CONTRACT VIOLATION DETECTED <<<');
        }
    });
});
