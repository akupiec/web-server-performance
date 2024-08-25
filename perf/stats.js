import fs from "fs";

export  function genStats(imageName) {
    const ddos = JSON.parse( fs.readFileSync(`out/ddos_${imageName}.json`, 'utf8'));
    const usage = JSON.parse( fs.readFileSync(`out/usage_${imageName}.json`, 'utf8'));
    const data = JSON.stringify({ddos: ddos.aggregate.summaries['http.response_time'], usage}, null, 2);
    fs.writeFileSync(`out/${imageName}.json`, data);
}
