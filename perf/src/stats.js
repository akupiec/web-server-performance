import fs from "fs";

export function saveImageSummary(imageName) {
  const ddos = JSON.parse(
    fs.readFileSync(`out/ddos_${imageName}.json`, "utf8"),
  );
  const rust = JSON.parse(
    fs.readFileSync(`out/usage_${imageName}.json`, "utf8"),
  );
  const data = { ddos: ddos.aggregate.summaries["http.response_time"], rust };
  fs.writeFileSync(`out/${imageName}.json`, JSON.stringify(data, null, 2));
}

export function saveSummary(imagesToTest) {
  const stats = {};
  for (const img of imagesToTest) {
    stats[img] = JSON.parse(fs.readFileSync(`out/${img}.json`, "utf8"));
  }
  fs.writeFileSync(`out/report.json`, JSON.stringify(stats, null, 2));
}
