const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxAo8kefBM-H2M_xGjACZ_eHX26j1GPb6nwUvisG9s77G1I65AhjHbJiNxKQg3wz3zfnA/exec";

/* =========================
   CORE REQUEST
========================= */
async function apiRequest(payload) {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  return res.json();
}

/* =========================
   API WRAPPER (สำคัญมาก)
========================= */
const api = {

  login: (username, password) => {
    return apiRequest({
      action: "login",
      username,
      password
    });
  },

  register: (data) => {
    return apiRequest({
      action: "register",
      ...data
    });
  },

  verifyEmail: (userid, code) => {
    return apiRequest({
      action: "verifyEmail",
      userid,
      code
    });
  }

};
