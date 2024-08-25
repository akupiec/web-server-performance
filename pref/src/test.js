import { spawn } from 'child_process';
import { spawnProcess } from './utils/spawn.js';

export const runStressTest = (imageName) => {
  return new Promise((resolve, reject) => {
    console.log(`Running test!`);

    const runProcess = spawn('artillery', [
      'run',
      '-k',
      '-o',
      `out/ddos_${imageName}.json`,
      'artillery_test.yaml',
    ]);
    spawnProcess(runProcess, resolve, reject);
  });
};
