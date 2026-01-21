const API =
"https://script.google.com/macros/s/AKfycbzNSgpYNigJX7W-RUPq8SLN4e687pE55p72KsbM-nWFcPefKDhjzYAflsm78i42IW7qrw/exec";

function apiGet(a){return fetch(API+"?action="+a).then(r=>r.json())}
function apiPost(d){
 return fetch(API,{method:"POST",body:JSON.stringify(d)}).then(r=>r.json())
}
