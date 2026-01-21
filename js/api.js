const API_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

async function fetchJobTypes() {
  const res = await fetch(`${API_URL}?action=getJobTypes`);
  return res.json();
}

async function fetchJobSubTypes(jobTypeCode) {
  const res = await fetch(`${API_URL}?action=getJobSubTypes&jobTypeCode=${jobTypeCode}`);
  return res.json();
}
