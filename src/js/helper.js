// For functions used many times
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s);
  });
};

// getJSON and Error handling
const getJSON = async function (url) {
  try {
    const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const data = await res.json();
    // Check for valid url
    if (!res.ok) throw new Error(`💥 ${res.status} - Not resolved: ${data.message}`);

    // Destructure for recipe object and return
    return data;
  } catch (err) {
    throw err;
  }
};

export { getJSON };
