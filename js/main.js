// ================= CONFIG =================
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

// ================= API =================
async function apiRequest(data) {
  const res = await fetch(SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return await res.json();
}

// ================= UI =================
function toggleLoader(show) {
  const loader = document.getElementById("loader");
  if (loader) {
    loader.style.display = show ? "flex" : "none";
  }
}

function showPopup(msg, title = "แจ้งเตือน") {
  const popup = document.getElementById("popup");
  const titleEl = document.getElementById("popup-title");
  const msgEl = document.getElementById("popup-message");

  if (!popup || !titleEl || !msgEl) {
    alert(msg);
    return;
  }

  titleEl.innerText = title;
  msgEl.innerText = msg;
  popup.style.display = "flex";
}

function closePopup() {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "none";
}

// ================= REGISTER =================
async function handleRegister() {
  const USERID = document.getElementById("USERID")?.value.trim();
  const UserName = document.getElementById("UserName")?.value.trim();
  const UserSname = document.getElementById("UserSname")?.value.trim();
  const UserMail = document.getElementById("UserMail")?.value.trim();
  const UserTypeName = document.getElementById("UserTypeName")?.value;

  if (!USERID || !UserName || !UserMail) {
    showPopup("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  toggleLoader(true);

  try {
    const res = await apiRequest({
      action: "registerIT",
      USERID,
      UserName,
      UserSname,
      UserMail,
      UserTypeName
    });

    if (res.success) {
      showPopup("ลงทะเบียนสำเร็จ กรุณาตรวจสอบ Email", "สำเร็จ");
      setTimeout(() => {
        location.href = "login.html";
      }, 1200);
    } else {
      showPopup(res.message || "ลงทะเบียนไม่สำเร็จ");
    }
  } catch (err) {
    showPopup("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  } finally {
    toggleLoader(false);
  }
}

// ================= LOGIN =================
async function handleLogin() {
  const username = document.getElementById("username")?.value.trim();
  const password = document.getElementById("password")?.value.trim();

  if (!username || !password) {
    showPopup("กรุณากรอก Username และ Password");
    return;
  }

  toggleLoader(true);

  try {
    const res = await apiRequest({
      action: "login",
      username,
      password
    });

    if (res.success) {
      localStorage.setItem("it_session", JSON.stringify(res.data));
      location.href = "index.html";
    } else {
      showPopup(res.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  } catch (err) {
    showPopup("ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้");
  } finally {
    toggleLoader(false);
  }
}

// ================= SESSION CHECK =================
function requireLogin() {
  const session = localStorage.getItem("it_session");
  if (!session) {
    location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("it_session");
  location.href = "login.html";
}
