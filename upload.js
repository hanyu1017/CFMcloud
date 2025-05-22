
const admin = require('firebase-admin');
const fs = require('fs');

// 初始化 Firebase Admin
const serviceAccount = require('./cfmcloud-firebase-adminsdk-fbsvc-42755301a3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// 讀取 JSON 資料
const data = JSON.parse(fs.readFileSync('./manufacturing_events_8days.json', 'utf8'));

async function uploadData() {
  for (const path in data) {
    const [collection, docId] = path.split('/');
    const content = data[path];
    try {
      await db.collection(collection).doc(docId).set(content, { merge: true });
      console.log(`✅ 上傳成功: ${collection}/${docId}`);
    } catch (err) {
      console.error(`❌ 上傳失敗: ${collection}/${docId}`, err);
    }
  }
  console.log('🎉 所有資料上傳完成！');
}

uploadData();
