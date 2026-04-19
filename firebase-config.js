// ===== Firebase 설정 =====
// 아래 내용을 Firebase 콘솔에서 받은 값으로 교체하세요
const firebaseConfig = {
    apiKey: "AIzaSyChtSgbLn4q0IC26BROb9fXlkl40Blr8QU",
    authDomain: "bugo-munja-free.firebaseapp.com",
    projectId: "bugo-munja-free",
    storageBucket: "bugo-munja-free.firebasestorage.app",
    messagingSenderId: "389374758202",
    appId: "1:389374758202:web:020a094894976df80d5403"
};

// Firebase 초기화
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ===== Firestore 컬렉션 상수 =====
const COLLECTION_NAME = 'celebrations';

// ===== Firestore 저장/불러오기 =====

// 짧은 ID 생성 (6자리 영숫자)
function generateShortId() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

// 축하장 데이터 저장
async function saveCelebrationData(data) {
    const shortId = generateShortId();
    const now = new Date();
    const expireDate = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000); // 180일 후

    try {
        await db.collection(COLLECTION_NAME).doc(shortId).set({
            ...data,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            expireAt: firebase.firestore.Timestamp.fromDate(expireDate)
        });
        return shortId;
    } catch (error) {
        console.error('저장 오류:', error);
        return null;
    }
}

// 축하장 데이터 불러오기
async function loadCelebrationData(shortId) {
    try {
        const doc = await db.collection(COLLECTION_NAME).doc(shortId).get();
        if (!doc.exists) return null;

        const data = doc.data();

        // 만료 체크
        if (data.expireAt && data.expireAt.toDate() < new Date()) {
            await db.collection(COLLECTION_NAME).doc(shortId).delete();
            return null;
        }

        return data;
    } catch (error) {
        console.error('불러오기 오류:', error);
        return null;
    }
}

// 만료된 데이터 정리 (접속 시 랜덤으로 실행)
async function cleanupExpired() {
    if (Math.random() > 0.1) return; // 10% 확률로만 실행

    try {
        const now = firebase.firestore.Timestamp.now();
        const snapshot = await db.collection(COLLECTION_NAME)
            .where('expireAt', '<', now)
            .limit(10)
            .get();

        const batch = db.batch();
        snapshot.forEach(doc => batch.delete(doc.ref));
        if (!snapshot.empty) await batch.commit();
    } catch (error) {
        // 조용히 실패
    }
}
