import { spawn } from "child_process";

function spawnProcess(runProcess, resolve, reject) {
  runProcess.stdout.on("data", (data) => console.log("" + data));
  runProcess.stderr.on("data", (data) => console.error("" + data));
  runProcess.on("close", (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Docker run process exited with code ${code}`));
    }
  });
}

export const runStressTest = (imageName) => {
  return new Promise((resolve, reject) => {
    console.log(`Running test!`);

    const runProcess = spawn("artillery", [
      "run",
      "-k",
      "-o",
      `out/ddos_${imageName}.json`,
      "artillery_test.yaml",
    ]);
    spawnProcess(runProcess, resolve, reject);
  });
};
