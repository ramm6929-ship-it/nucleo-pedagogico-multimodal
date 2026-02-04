const http = require('http');
http.get('http://localhost:3000/api/status_update?asignatura=CNEYT&nivel=I', (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
        const s = JSON.parse(data);
        console.log('--- FINAL AUDIT ---');
        console.log('ASIGNATURA:', s.asignatura_activa);
        console.log('PF:', s.proposito_formativo_id);
        console.log('ESTADO:', s.acreditacion.estado_proposito);
        console.log('RESULTADO:', s.decision_academica.resultado);
        console.log('CONCLUIDO:', s.trayecto_concluido);
    });
});
