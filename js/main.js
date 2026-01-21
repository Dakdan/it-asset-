const jobTypeSelect = document.getElementById("jobType");
const jobSubTypeSelect = document.getElementById("jobSubType");
const jobForm = document.getElementById("jobForm");

// โหลด JobType
async function loadJobTypes() {
  const data = await apiGet("getJobTypes");
  data.forEach(row => {
    const opt = document.createElement("option");
    opt.value = row.JobTypeID;
    opt.textContent = row.JobTypeName;
    jobTypeSelect.appendChild(opt);
  });
}

// โหลด JobSubType
async function loadJobSubTypes(jobTypeId) {
  jobSubTypeSelect.innerHTML =
    '<option value="">เลือกงานย่อย</option>';

  const data = await apiGet("getJobSubTypes");
  data
    .filter(r => r.JobTypeID === jobTypeId)
    .forEach(row => {
      const opt = document.createElement("option");
      opt.value = row.SubTypeID;
      opt.textContent = row.SubTypeName;
      jobSubTypeSelect.appendChild(opt);
    });
}

// Event
jobTypeSelect.addEventListener("change", e => {
  loadJobSubTypes(e.target.value);
});

// เปิดงาน
jobForm.addEventListener("submit", async e => {
  e.preventDefault();

  const payload = {
    action: "createJob",
    jobType: jobTypeSelect.value,
    jobSubType: jobSubTypeSelect.value,
    problem: document.getElementById("problem").value,
    reporter: document.getElementById("reporter").value,
    contact: document.getElementById("contact").value,
    status: "รอรับงาน",
    createBy: "IT"
  };

  const result = await apiPost(payload);

  alert("สร้างงานสำเร็จ\nJobID: " + result.jobId);
  jobForm.reset();
});

// เริ่มต้น
loadJobTypes();
