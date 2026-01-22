const table=document.querySelector("#jobTable tbody");
const working=document.getElementById("working");

async function loadJobs(){
  table.innerHTML="";
  working.innerHTML="";

  let d=await apiGet("getJobs");

  d.forEach(j=>{
    if(j.Status==="กำลังดำเนินการ"){
      working.innerHTML+=`
        <div class="job">
          <b>${j.JobID}</b><br>
          ${j.JobType}<br>
          <button class="btn-close"
           onclick="update('${j.JobID}','ดำเนินการแล้วเสร็จ')">
           ปิดงาน
          </button>
        </div>`;
    }

    table.innerHTML+=`
      <tr>
        <td>${j.JobID}</td>
        <td>${j.JobType}</td>
        <td>${j.Status}</td>
        <td>
          ${j.Status==="รอรับงาน"
            ?`<button class="btn-start"
              onclick="update('${j.JobID}','กำลังดำเนินการ')">
              รับงาน</button>`:""}
        </td>
      </tr>`;
  });
}

function update(id,status){
  apiPost({action:"updateStatus",jobId:id,status})
    .then(loadJobs);
}

loadJobs();
