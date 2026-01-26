/************** CONFIG **************/
const SS_ID = '1TUcThdPyAqFRwkFg1NTMtwqbFVjrkJXWqYw0AlwwriI';

/************** ENTRY **************/
function doGet(e) {
  return json({ success: false, message: 'GET not supported' });
}

function doPost(e) {
  let data = {};
  try {
    data = JSON.parse(e.postData.contents || '{}');
  } catch (err) {
    return json({ success: false, message: 'invalid json' });
  }

  switch (data.action) {
    case 'login':
      return json(loginITUser(data));

    case 'registerIT':
      return json(registerITUser(data));

    default:
      return json({ success: false, message: 'invalid action' });
  }
}

/************** LOGIN **************/
function loginITUser(data) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('ITUser');
  if (!sheet) return { success: false, message: 'ไม่พบตาราง ITUser' };

  const range = sheet.getDataRange();
  const rows = range.getValues();
  if (rows.length < 2) return { success: false, message: 'ยังไม่มีผู้ใช้' };

  const header = rows.shift();
  const idx = indexMap(header);

  const username = String(data.username || '').trim();
  const password = String(data.password || '').trim();
  if (!username || !password) {
    return { success: false, message: 'ข้อมูลไม่ครบ' };
  }

  const hashedInput = hashPassword(password);

  for (let i = 0; i < rows.length; i++) {
    const r = rows[i];
    if (String(r[idx.USERID]).trim() !== username) continue;

    const storedPW = String(r[idx.UserPW]).trim();

    // ===== CASE 1: password ถูก (plain) =====
    if (storedPW === password) {

      // 🔁 migrate → hash
      const newHash = hashedInput;
      sheet.getRange(i + 2, idx.UserPW + 1).setValue(newHash);

      return {
        success: true,
        data: buildUserData(r, idx)
      };
    }

    // ===== CASE 2: password ถูก (hash) =====
    if (isHashed(storedPW) && storedPW === hashedInput) {
      return {
        success: true,
        data: buildUserData(r, idx)
      };
    }

    return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
  }

  return { success: false, message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' };
}


/************** REGISTER **************/
function registerITUser(data) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName('ITUser');
  if (!sheet) return { success: false, message: 'ไม่พบตาราง ITUser' };

  const rows = sheet.getDataRange().getValues();
  const header = rows[0];
  const idx = indexMap(header);

  const USERID = String(data.USERID || '').trim();
  const UserName = String(data.UserName || '').trim();
  const UserSname = String(data.UserSname || '').trim();
  const UserMail = String(data.UserMail || '').trim();

  if (!USERID || !UserName || !UserMail) {
    return { success: false, message: 'ข้อมูลไม่ครบ' };
  }

  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][idx.USERID]).trim() === USERID) {
      return { success: false, message: 'User นี้มีอยู่แล้ว' };
    }
  }

  const nextNo = rows.length;
  const defaultPW = '1234';

  const newRow = [];
  newRow[idx.ITUSERNO] = nextNo;
  newRow[idx.USERID] = USERID;
  newRow[idx.UserPW] = hashPassword(defaultPW); // 🔒 hash
  newRow[idx.UserTypeID] = 1;
  newRow[idx.UserTypeName] = data.UserTypeName || 'IT';
  newRow[idx.UserName] = UserName;
  newRow[idx.UserSname] = UserSname;
  newRow[idx.UserMail] = UserMail;

  sheet.appendRow(newRow);

  return { success: true };
}


/************** UTIL **************/
function indexMap(header) {
  return {
    ITUSERNO: header.indexOf('ITUSERNO'),
    USERID: header.indexOf('USERID'),
    UserPW: header.indexOf('UserPW'),
    UserTypeID: header.indexOf('UserTypeID'),
    UserTypeName: header.indexOf('UserTypeName'),
    UserName: header.indexOf('UserName'),
    UserSname: header.indexOf('UserSname'),
    UserMail: header.indexOf('UserMail')
  };
}
function buildUserData(r, idx) {
  return {
    ITUSERNO: r[idx.ITUSERNO],
    USERID: r[idx.USERID],
    UserTypeID: r[idx.UserTypeID],
    UserTypeName: r[idx.UserTypeName],
    UserName: r[idx.UserName],
    UserSname: r[idx.UserSname],
    UserMail: r[idx.UserMail]
  };
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
