const jobList = document.getElementById("jobList");
const IT_USER = localStorage.getItem("IT_USER") || prompt("กรุณาใส่ชื่อ IT");

localStorage.setItem("IT_USER", IT_USER);

loadJobs();

async function loadJobs() {
  try {
    const data = await apiGetJobs();
    renderJobs(data);
  } catch (e) {
    jobList.innerHTML = "โหลดข้อมูลไม่ได้";
  }
}

function renderJobs(jobs) {
  if (!jobs.length) {
    jobList.innerHTML = "ไม่มีงาน";
    return;
  }

  jobList.innerHTML = "";
  jobs.forEach(j => {
    const div = document.createElement("div");
    div.className = "job";
    div.innerHTML = `
      <b>${j.JobID}</b><br>
      อุปกรณ์: ${j.AssetName}<br>
      สถานะ: ${j.Status || "ใหม่"}<br><br>
      <button onclick="updateJob('${j.JobID}','START')">รับงาน</button>
      <button onclick="updateJob('${j.JobID}','CLOSE')">ปิดงาน</button>
    `;
    jobList.appendChild(div);
  });
}

async function updateJob(jobId, action) {
  await apiUpdateJob(jobId, action, IT_USER);
  loadJobs();
}
