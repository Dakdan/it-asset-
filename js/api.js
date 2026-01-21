const API_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

async function apiGetJobs() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function apiUpdateJob(jobId, action, user) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ jobId, action, user })
  });
  return await res.json();
}
