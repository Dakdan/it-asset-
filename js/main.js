// ================= LOGIN =================
async function handleLogin() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    showPopup("กรุณากรอก Username และ Password");
    return;
  }

  toggleLoader(true);

  try {
    const res = await apiRequest({
      action: "login",
      username: username,
      password: password
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
