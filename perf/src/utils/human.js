export function convertToBytes(size) {
  // Define size units and their conversion factors to bytes
  const units = {
    B: 1,
    KIB: 1024,
    MIB: 1024 * 1024,
    GIB: 1024 * 1024 * 1024,
    TIB: 1024 * 1024 * 1024 * 1024,
  };

  // Regular expression to parse the size string
  const regex = /^(\d+\.?\d*)(B|KiB|MiB|GiB|TiB)$/i;
  const match = size.trim().match(regex);

  if (!match) {
    throw new Error(size + "Invalid size format");
  }

  const value = parseFloat(match[1]);
  const unit = match[2].toUpperCase();

  // Convert to bytes
  return value * units[unit];
}

export function bytesToReadable(bytes) {
  if (bytes === 0) return "0 B";

  const units = ["B", "KiB", "MiB", "GiB", "TiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  // Calculate the size in the chosen unit
  const size = bytes / Math.pow(1024, i);

  // Format the size with two decimal places
  return `${size.toFixed(2)}${units[i]}`;
}

function rawStatsToHuman(stats, calcFn) {
  return Object.fromEntries(
    Object.entries(stats).map(([k, v]) => [k, calcFn(v)]),
  );
}

export function rawStatsToBytesHuman(stats) {
  return rawStatsToHuman(stats, (v) => bytesToReadable(v));
}

export function rawStatsToPercentages(stats) {
  return rawStatsToHuman(stats, (v) => v + "%");
}
