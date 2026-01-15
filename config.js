// === CONFIG กลาง ===
const API_URL = "https://script.google.com/macros/s/AKfycbwPg1Hwof0sUcM-gAvxBwE2PQ0HLdh_578aCHg_Cgq-JeQOcpQPm1zAE5C_uM7FqSg/exec";

function api(action, params = {}) {
  params.action = action;
  const q = new URLSearchParams(params).toString();
  return fetch(API_URL + "?" + q).then(r => r.json());
}
