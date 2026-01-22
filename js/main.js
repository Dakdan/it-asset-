// 1. ตั้งค่า URL (ต้องได้จากการ Deploy แบบ Anyone)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

// 2. ตรวจสอบสถานะการล็อกอินอัตโนมัติ (เพื่อให้ "จำไว้ไม่ต้องลงชื่อบ่อยๆ")
document.addEventListener("DOMContentLoaded", function() {
    checkAuth();
});

function checkAuth() {
    const session = localStorage.getItem('it_user_session');
    const path = window.location.pathname;
    const page = path.split("/").pop();

    if (session) {
        // ถ้าล็อกอินอยู่แล้ว แต่อยู่หน้า Login/Register ให้เด้งไปหน้าหลัก
        if (page === "login.html" || page === "register.html" || page === "") {
            window.location.href = "index.html";
        }
    } else {
        // ถ้ายังไม่ได้ล็อกอิน และไม่ได้อยู่หน้า Login/Register ให้เด้งไปหน้า Login
        if (page !== "login.html" && page !== "register.html") {
            window.location.href = "login.html";
        }
    }
}

// 3. ฟังก์ชันหลักในการรับ-ส่งข้อมูลกับ Google Sheets
async function apiRequest(data) {
    try {
        const response = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(data)
        });
        
        if (!response.ok) throw new Error('Network response was not ok');
        
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        throw error; // ส่ง Error กลับไปให้หน้าบ้านจัดการต่อ
    }
}

// 4. ฟังก์ชันออกจากระบบ (Logout)
function logout() {
    if(confirm("ยืนยันการออกจากระบบ?")) {
        localStorage.removeItem('it_user_session');
        window.location.href = "login.html";
    }
}

// 5. ตัวควบคุมการแสดงผล Loader (หมุนๆ)
function toggleLoader(show) {
    const loader = document.getElementById('loader');
    if(loader) loader.style.display = show ? 'flex' : 'none';
}
