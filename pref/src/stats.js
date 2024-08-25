import fs from 'fs';

function generateMarkdownTable(datasets) {
  const metrics = ['min', 'max', 'avg', 'p90', 'p99', 'p999'];
  const firstColPad = 10;
  const dataColPad = 15;

  let table = '';
  const header = `| Metric    | ${Object.keys(datasets)
    .map((v) => v.padEnd(15))
    .join(' | ')} |\n`;
  const separatorRow = `|-----------|${'-----------------|'.repeat(
    Object.keys(datasets).length
  )}\n`;
  table += header;
  table += separatorRow;

  metrics.forEach((metric) => {
    let row = '';
    row += `| ${metric.padEnd(firstColPad)}`;
    for (const cpuData of Object.values(datasets)) {
      row += `| ${('' + cpuData[metric]).padEnd(dataColPad)} `;
    }
    row += '| \n';
    table += row;
  });

  return table;
}

export function saveImageSummary(imageName) {
  const ddos = JSON.parse(fs.readFileSync(`out/ddos_${imageName}.json`, 'utf8'));
  const rust = JSON.parse(fs.readFileSync(`out/usage_${imageName}.json`, 'utf8'));
  const summary = ddos.aggregate.summaries['http.response_time'];
  const data = {
    ddos: {
      min: summary.min,
      max: summary.max,
      avg: summary.mean,
      p50: summary.p50,
      p90: summary.p90,
      p99: summary.p99,
      p999: summary.p999,
    },
    rust,
  };
  fs.writeFileSync(`out/${imageName}.json`, JSON.stringify(data, null, 2));
}

function generateMarkdown(jsonStats) {
  let markdownStats = `# Stress Test Report
  
This file contain results of running artillery requires on all defined containers`;
  markdownStats += '\n\n# CPU\n\n';
  markdownStats += generateMarkdownTable(
    Object.fromEntries(Object.entries(jsonStats).map(([k, v]) => [k, v.rust.cpu]))
  );
  markdownStats += '\n\n# Memory usage\n\n';
  markdownStats += generateMarkdownTable(
    Object.fromEntries(Object.entries(jsonStats).map(([k, v]) => [k, v.rust.mem]))
  );
  markdownStats += '\n\n# Response times\n\n';
  markdownStats += generateMarkdownTable(
    Object.fromEntries(Object.entries(jsonStats).map(([k, v]) => [k, v.ddos]))
  );
  markdownStats += `\nResponse times are provided in milliseconds (at least that I assume if you wanna be usre check artillery docs)`;
  console.log(markdownStats);
  fs.writeFileSync(`out/report.md`, markdownStats);
}

function generateJSON(imagesToTest) {
  const jsonStats = {};
  for (const img of imagesToTest) {
    jsonStats[img] = JSON.parse(fs.readFileSync(`out/${img}.json`, 'utf8'));
  }
  fs.writeFileSync(`out/report.json`, JSON.stringify(jsonStats, null, 2));
  return jsonStats;
}

export function saveSummary(imagesToTest) {
  const jsonStats = generateJSON(imagesToTest);
  generateMarkdown(jsonStats);
}
