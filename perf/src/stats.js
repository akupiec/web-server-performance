import fs from "fs";

export  function saveImageSummary(imageName) {
    const ddos = JSON.parse( fs.readFileSync(`out/ddos_${imageName}.json`, 'utf8'));
    const rust = JSON.parse( fs.readFileSync(`out/usage_${imageName}.json`, 'utf8'));
    const data = JSON.stringify({ddos: ddos.aggregate.summaries['http.response_time'], rust}, null, 2);
    fs.writeFileSync(`out/${imageName}.json`, data);
}
