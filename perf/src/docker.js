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

const buildDockerImage = (imageName, imagePath) => {
  return new Promise((resolve, reject) => {
    console.log(`Building Docker image ${imageName}...`);

    const runProcess = spawn("docker", ["build", "-t", imageName, imagePath]);
    spawnProcess(runProcess, resolve, reject);
  });
};

const runDockerContainer = (imageName) => {
  return new Promise((resolve, reject) => {
    console.log(`Running Docker container c_${imageName}...`);

    const runProcess = spawn("docker", [
      "run",
      "-d",
      "--name",
      "c_" + imageName,
      "-p",
      "3000:3000",
      imageName,
    ]);
    spawnProcess(runProcess, resolve, reject);
  });
};

const removeDockerContainer = (imageName) => {
  return new Promise((resolve, reject) => {
    console.log(`RM Docker container c_${imageName}...`);

    const runProcess = spawn("docker", ["rm", "c_" + imageName]);
    spawnProcess(runProcess, resolve, reject);
  });
};

const stopDockerContainer = (imageName) => {
  return new Promise((resolve, reject) => {
    console.log(`RM Docker container c_${imageName}...`);

    const runProcess = spawn("docker", ["stop", "c_" + imageName]);
    spawnProcess(runProcess, resolve, reject);
  });
};

export const buildAndRunDockerImage = async (imageName, imagePath) => {
  await buildDockerImage(imageName, imagePath);
  await runDockerContainer(imageName);
};

export const stopAndRemoveDockerImage = async (imageName) => {
  await stopDockerContainer(imageName);
  await removeDockerContainer(imageName);
};
