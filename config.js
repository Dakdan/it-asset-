// config.js
const GAS_URL = "https://script.google.com/macros/s/AKfycbwPg1Hwof0sUcM-gAvxBwE2PQ0HLdh_578aCHg_Cgq-JeQOcpQPm1zAE5C_uM7FqSg/exec";

function api(action, data = {}) {
  return fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify({ action, ...data }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}
