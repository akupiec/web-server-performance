import {buildAndRunDockerImage, stopAndRemoveDockerImage} from "./docker.js";
import {runTest} from "./test.js";
import {showStats, startMonitoring} from "./resources.js";
import {genStats} from "./stats.js";


async function runServerAndTest(imageName) {
    await buildAndRunDockerImage(imageName, '../' + imageName)
    startMonitoring('c_' + imageName, 500);
    await runTest(imageName);
    await showStats(imageName);
    await stopAndRemoveDockerImage(imageName)
    genStats(imageName)
}

await runServerAndTest('go-fiber');
await runServerAndTest('go-gin');
await runServerAndTest('node-fastify');
await runServerAndTest('python-fastapi');
