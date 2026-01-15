// config.js
const GAS_URL = "https://script.google.com/macros/s/AKfycbwj8TX_Lwv_oRLd3CtFL7ORBSu4CyweKfdoxF5vi-7UBqPeml6EBNmCCLDJ7qmsKqjD/exec";

function api(action, data = {}) {
  return fetch(GAS_URL, {
    method: "POST",
    body: JSON.stringify({ action, ...data }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(r => r.json());
}
