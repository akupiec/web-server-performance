export function spawnProcess(runProcess, resolve, reject) {
  runProcess.stdout.on('data', (data) => console.log('' + data));
  runProcess.stderr.on('data', (data) => console.error('' + data));
  runProcess.on('close', (code) => {
    if (code === 0) {
      resolve();
    } else {
      reject(new Error(`Spawn process critical error check log line above!`));
    }
  });
}
