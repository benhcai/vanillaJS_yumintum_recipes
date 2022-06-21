// For functions used many times
import { API_KEY, TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const options = uploadData
      ? {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(uploadData),
        }
      : undefined;
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`💥 ${response.status} - Not resolved: ${data.message}`);
    const result = await response.json();
    return result;
  } catch (err) {
    throw err;
  }
};

// getJSON and Error handling
const getJSON = async function (url) {
  try {
    // const res = await Promise.race([timeout(TIMEOUT_SEC), fetch(url)]);
    const res = await fetch(url);
    const data = await res.json();
    // Check for valid url
    if (!res.ok) throw new Error(`💥 ${res.status} - Not resolved: ${data.message}`);

    // Destructure for recipe object and return
    return data;
  } catch (err) {
    throw err;
  }
};

const sendJSON = async function (url, uploadData) {
  try {
    // POST requires an options parameter
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(`💥 ${res.status} - Not resolved: ${data.message}`);

    return data;
  } catch (err) {
    throw err;
  }
};

export { getJSON, sendJSON };
