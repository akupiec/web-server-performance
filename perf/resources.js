import {exec} from "child_process";
import fs from "fs";


let memoryUsageTotal = [];
let cpuUsageTotal = [];
let intervalHandler;

function convertToBytes(size) {
    // Define size units and their conversion factors to bytes
    const units = {
        'B': 1,
        'KIB': 1024,
        'MIB': 1024 * 1024,
        'GIB': 1024 * 1024 * 1024,
        'TIB': 1024 * 1024 * 1024 * 1024
    };

    // Regular expression to parse the size string
    const regex = /^(\d+\.?\d*)(B|KiB|MiB|GiB|TiB)$/i;
    const match = size.trim().match(regex);

    if (!match) {
        throw new Error(size + 'Invalid size format');
    }

    const value = parseFloat(match[1]);
    const unit = match[2].toUpperCase();

    // Convert to bytes
    return value * units[unit];
}

function bytesToReadable(bytes) {
    if (bytes === 0) return '0 B';

    const units = ['B', 'KiB', 'MiB', 'GiB', 'TiB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    // Calculate the size in the chosen unit
    const size = bytes / Math.pow(1024, i);

    // Format the size with two decimal places
    return `${size.toFixed(2)}${units[i]}`;
}

async function getStats(containerId) {
    exec(`docker stats --no-stream --format "{{json .}}" ${containerId}`, (err, stdout) => {
        if (err) {
            return;
        }
        const stats = JSON.parse(stdout);
        const memoryUsage = convertToBytes(stats.MemUsage.split('/')[0]);
        const cpuUsage = parseFloat(stats.CPUPerc);
        memoryUsageTotal.push(memoryUsage);
        cpuUsageTotal.push(cpuUsage);
    })
}

async function getSize(imageName) {
    return new Promise((resolve, reject) => {
        exec(`docker image ls --format json ${imageName}`, (error, stdout) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(JSON.parse(stdout).Size);
        })
    })
}

export function startMonitoring(containerId, interval = 1000) {
    memoryUsageTotal = [];
    cpuUsageTotal = [];
    intervalHandler = setInterval(getStats, interval, containerId);
}

export async function showStats(imageName) {
    clearInterval(intervalHandler);
    const count = memoryUsageTotal.length;
    const averageMemoryUsage = bytesToReadable(memoryUsageTotal.reduce((acc, v) => v + acc, 0) / count);
    const averageCpuUsage = (cpuUsageTotal.reduce((acc, v) => v + acc, 0) / count).toFixed(2) + '%';
    const imageSize = await getSize(imageName);

    const data = {averageMemoryUsage, averageCpuUsage, imageSize};
    fs.writeFileSync(`out/usage_${imageName}.json`, JSON.stringify(data, null, 2));

    console.log(`Average Memory Usage: ${averageMemoryUsage}`);
    console.log(`Average CPU Usage: ${averageCpuUsage}`);
}
