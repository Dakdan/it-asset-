// ===== CONFIG =====
const GAS_URL = "https://script.google.com/macros/s/AKfycbwj8TX_Lwv_oRLd3CtFL7ORBSu4CyweKfdoxF5vi-7UBqPeml6EBNmCCLDJ7qmsKqjD/exec";

// ===== API CALL =====
function api(action, params = {}) {
  return new Promise((resolve, reject) => {
    const cb = "cb_" + Date.now();
    params.action = action;
    params.callback = cb;

    const query = Object.keys(params)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
      .join("&");

    const s = document.createElement("script");
    s.src = `${GAS_URL}?${query}`;

    window[cb] = (res) => {
      resolve(res);
      delete window[cb];
      document.body.removeChild(s);
    };

    s.onerror = reject;
    document.body.appendChild(s);
  });
}
