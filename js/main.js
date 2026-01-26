const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

/* ======================
   UTIL
====================== */

function showLoader(show = true) {
  const el = document.getElementById("loader");
  if (!el) return;
  el.style.display = show ? "flex" : "none";
}

function showPopup(msg, title = "แจ้งเตือน") {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-message").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* ======================
   API
====================== */

async function apiRequest(data) {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("HTTP ERROR");
    }

    return await res.json();
  } catch (err) {
    console.error(err);
    throw new Error("ไม่สามารถเชื่อมต่อระบบได้");
  }
}

/* ======================
   LOGIN
====================== */

async function handleLogin() {
  const userid = document.getElementById("USERID")?.value.trim();

  if (!userid) {
    showPopup("กรุณากรอก User ID");
    return;
  }

  showLoader(true);

  try {
    const result = await apiRequest({
      action: "login",
      USERID: userid,
    });

    if (result.status === "success") {
      localStorage.setItem("USER", JSON.stringify(result.data));
      window.location.href = "index.html";
    } else {
      showPopup(result.message || "ไม่พบผู้ใช้งาน");
    }
  } catch (err) {
    showPopup(err.message);
  } finally {
    showLoader(false);
  }
}

/* ======================
   REGISTER
====================== */

async function handleRegister() {
  const data = {
    action: "register",
    USERID: document.getElementById("USERID").value.trim(),
    UserName: document.getElementById("UserName").value.trim(),
    UserSname: document.getElementById("UserSname").value.trim(),
    UserMail: document.getElementById("UserMail").value.trim(),
    UserTypeName: document.getElementById("UserTypeName").value,
  };

  if (!data.USERID || !data.UserName || !data.UserMail) {
    showPopup("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  showLoader(true);

  try {
    const result = await apiRequest(data);

    if (result.status === "success") {
      showPopup("สมัครสมาชิกสำเร็จ", "สำเร็จ");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      showPopup(result.message || "ไม่สามารถสมัครได้");
    }
  } catch (err) {
    showPopup(err.message);
  } finally {
    showLoader(false);
  }
}

/* ======================
   CHECK LOGIN (INDEX)
====================== */

function checkLogin() {
  const user = localStorage.getItem("USER");
  if (!user) {
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("USER");
  window.location.href = "login.html";
}
