async function run() {
    try {
        const res = await fetch("http://localhost:3000/api/status_update?asignatura=CNEYT");
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Body:", text);
    } catch (e) {
        console.error(e);
    }
}
run();
