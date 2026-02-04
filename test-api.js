const http = require('http');

const postData = JSON.stringify({
    asignatura: 'PM',
    nivel: 'I'
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/test/reset',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
    }
};

const req = http.request(options, (res) => {
    res.on('data', () => { });
    res.on('end', () => {
        console.log('State reset. Fetching current status...');
        http.get('http://localhost:3000/api/status_update?asignatura=PM&nivel=I', (res2) => {
            let data = '';
            res2.on('data', (chunk) => { data += chunk; });
            res2.on('end', () => {
                console.log('--- Current Status ---');
                console.log(data);
            });
        });
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
