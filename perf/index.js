import {
  buildAndRunDockerImage,
  stopAndRemoveDockerImage,
} from "./src/docker.js";
import { saveHardwareUsage, startMonitoringHardware } from "./src/resources.js";
import { runStressTest } from "./src/test.js";
import { saveImageSummary, saveSummary } from "./src/stats.js";

async function runServerAndTest(imageName) {
  await buildAndRunDockerImage(imageName, "../" + imageName);
  startMonitoringHardware("c_" + imageName, 500);
  await runStressTest(imageName);
  await saveHardwareUsage(imageName);
  await stopAndRemoveDockerImage(imageName);
  saveImageSummary(imageName);
}

const imagesToTest = ["go-fiber", "go-gin", "node-fastify", "python-fastapi"];

for (const img of imagesToTest) {
  await runServerAndTest(img);
}

saveSummary(imagesToTest);
