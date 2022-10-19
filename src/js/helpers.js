import { TIMEOUT_SCE } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const respose = await Promise.race([fetchPro, timeout(TIMEOUT_SCE)]);
    const data = await respose.json();

    if (!respose.ok) throw new Error(`${data.message} (${respose.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const fetchPro = fetch(url);
//     const respose = await Promise.race([fetchPro, timeout(TIMEOUT_SCE)]);
//     const data = await respose.json();

//     if (!respose.ok) throw new Error(`${data.message} (${respose.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });
//     const respose = await Promise.race([fetchPro, timeout(TIMEOUT_SCE)]);
//     const data = await respose.json();

//     if (!respose.ok) throw new Error(`${data.message} (${respose.status})`);
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };
