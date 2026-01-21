// 🔧 แก้ URL ให้เป็น Apps Script ของคุณ
const API_BASE =
  "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

async function apiGet(action) {
  const res = await fetch(`${API_BASE}?action=${action}`);
  return res.json();
}

async function apiPost(data) {
  const res = await fetch(API_BASE, {
    method: "POST",
    body: JSON.stringify(data)
  });
  return res.json();
}
