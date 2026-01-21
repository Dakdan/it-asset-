document.addEventListener("DOMContentLoaded", async () => {
  const jobTypeSelect = document.getElementById("jobType");
  const jobSubTypeSelect = document.getElementById("jobSubType");

  const jobTypes = await fetchJobTypes();
  jobTypeSelect.innerHTML = `<option value="">เลือกประเภทงาน</option>`;

  jobTypes.forEach(j => {
    jobTypeSelect.innerHTML += `<option value="${j.code}">${j.name}</option>`;
  });

  jobTypeSelect.addEventListener("change", async () => {
    const code = jobTypeSelect.value;
    jobSubTypeSelect.innerHTML = `<option value="">เลือกงานย่อย</option>`;

    if (!code) return;

    const subs = await fetchJobSubTypes(code);
    subs.forEach(s => {
      jobSubTypeSelect.innerHTML += `<option value="${s.code}">${s.name}</option>`;
    });
  });
});
