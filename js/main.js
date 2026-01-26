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
  if (loader) loader.style.display = show ? "flex" : "none";
}

function showPopup(msg, title = "แจ้งเตือน") {
  document.getElementById("popup-title").innerText = title;
  document.getElementById("popup-message").innerText = msg;
  document.getElementById("popup").style.display = "flex";
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

// ================= REGISTER =================
async function handleRegister() {
  const data = {
    action: 'registerIT',
    USERID: USERID.value.trim(),
    UserTypeName: UserTypeName.value,
    UserName: UserName.value.trim(),
    UserSname: UserSname.value.trim(),
    UserMail: UserMail.value.trim()
  };

  if (!data.USERID || !data.UserMail || !data.UserName) {
    showPopup("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  toggleLoader(true);

  try {
    const res = await apiRequest(data);
    if (res.success) {
      showPopup("ลงทะเบียนสำเร็จ กรุณาตรวจสอบ Email", "สำเร็จ");
      setTimeout(() => location.href = "login.html", 1200);
    } else {
      showPopup(res.message || "ลงทะเบียนไม่สำเร็จ");
    }
  } catch {
    showPopup("การเชื่อมต่อล้มเหลว");
  } finally {
    toggleLoader(false);
  }
}
