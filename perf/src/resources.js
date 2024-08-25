import { exec } from "child_process";
import fs from "fs";
import {
  convertToBytes,
  rawStatsToBytesHuman,
  rawStatsToPercentages,
} from "./utils/human.js";

let memoryUsageTotal = [];
let cpuUsageTotal = [];
let intervalHandler;

async function getStats(containerId) {
  exec(
    `docker stats --no-stream --format "{{json .}}" ${containerId}`,
    (err, stdout) => {
      if (err) {
        return;
      }
      const stats = JSON.parse(stdout);
      const memoryUsage = convertToBytes(stats.MemUsage.split("/")[0]);
      const cpuUsage = parseFloat(stats.CPUPerc);
      memoryUsageTotal.push(memoryUsage);
      cpuUsageTotal.push(cpuUsage);
    },
  );
}

async function getSize(imageName) {
  return new Promise((resolve, reject) => {
    exec(`docker image ls --format json ${imageName}`, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(JSON.parse(stdout).Size);
    });
  });
}

export function startMonitoringHardware(containerId, interval = 1000) {
  memoryUsageTotal = [];
  cpuUsageTotal = [];
  intervalHandler = setInterval(getStats, interval, containerId);
}

function calculateStats(values) {
  if (!Array.isArray(values) || values.length === 0) {
    throw new Error("Input must be a non-empty array of numbers.");
  }

  values.sort((a, b) => a - b);

  const n = values.length;
  const min = parseFloat(values[0].toFixed(2));
  const max = parseFloat(values[n - 1].toFixed(2));
  const avg = parseFloat(
    (values.reduce((sum, value) => sum + value, 0) / n).toFixed(2),
  );

  function getPercentile(percentile) {
    const index = (percentile / 100) * (n - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    if (lower === upper) return parseFloat(values[lower].toFixed(2));
    return parseFloat(
      (
        values[lower] * (upper - index) +
        values[upper] * (index - lower)
      ).toFixed(2),
    );
  }

  const p50 = getPercentile(50);
  const p90 = getPercentile(90);
  const p99 = getPercentile(99);
  const p999 = getPercentile(99.9);

  return { min, max, avg, p50, p90, p99, p999 };
}

export async function saveHardwareUsage(imageName) {
  clearInterval(intervalHandler);
  const mem = rawStatsToBytesHuman(calculateStats(memoryUsageTotal));
  const cpu = rawStatsToPercentages(calculateStats(cpuUsageTotal));
  const size = await getSize(imageName);

  memoryUsageTotal = [];
  cpuUsageTotal = [];

  const data = { mem, cpu, size };
  fs.writeFileSync(
    `out/usage_${imageName}.json`,
    JSON.stringify(data, null, 2),
  );
}
