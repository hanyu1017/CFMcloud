// Firebase 配置腳本

// Firebase 配置
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
};

// 初始化 Firebase (注意：這只是示範，實際使用時需要替換為真實的配置信息)
function initFirebase() {
    // 檢查 Firebase SDK 是否已載入
    if (typeof firebase === 'undefined') {
        console.error('Firebase SDK 未載入');
        return false;
    }
    
    try {
        // 初始化 Firebase
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase 初始化成功');
        
        // 初始化 Firebase 服務
        initFirebaseAuth();
        initFirestore();
        
        return true;
    } catch (error) {
        console.error('Firebase 初始化失敗:', error);
        return false;
    }
}

// 初始化 Firebase 認證
function initFirebaseAuth() {
    // 獲取 Firebase 認證實例
    const auth = firebase.auth();
    
    // 監聽認證狀態變化
    auth.onAuthStateChanged(function(user) {
        if (user) {
            // 用戶已登入
            console.log('用戶已登入:', user.uid);
            fetchUserData(user.uid);
        } else {
            // 用戶未登入
            console.log('用戶未登入');
            
            // 檢查是否在登入頁面
            if (!window.location.pathname.includes('login.html') && 
                !window.location.pathname.includes('register.html')) {
                // 重定向到登入頁面
                window.location.href = 'login.html';
            }
        }
    });
    
    // 將 auth 實例導出為全局變數
    window.firebaseAuth = auth;
}

// 初始化 Firestore
function initFirestore() {
    // 獲取 Firestore 實例
    const db = firebase.firestore();
    
    // 將 db 實例導出為全局變數
    window.firestore = db;
}

// 從 Firestore 獲取用戶數據
async function fetchUserData(uid) {
    try {
        const doc = await window.firestore.collection('users').doc(uid).get();
        
        if (doc.exists) {
            const userData = doc.data();
            
            // 更新本地存儲的用戶數據
            localStorage.setItem('carbonDashboardUser', JSON.stringify({
                id: uid,
                name: userData.name,
                email: userData.email,
                role: userData.role,
                company: userData.company,
                department: userData.department
            }));
            
            // 更新 UI
            updateUIWithUserData(userData);
        } else {
            console.error('用戶數據不存在');
        }
    } catch (error) {
        console.error('獲取用戶數據失敗:', error);
    }
}

// Firebase 認證方法 - 電子郵件密碼登入
async function firebaseEmailLogin(email, password) {
    try {
        const userCredential = await window.firebaseAuth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error('登入失敗:', error);
        throw error;
    }
}

// Firebase 認證方法 - 電子郵件密碼註冊
async function firebaseEmailRegister(email, password) {
    try {
        const userCredential = await window.firebaseAuth.createUserWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        console.error('註冊失敗:', error);
        throw error;
    }
}

// Firebase 認證方法 - Google 登入
function firebaseGoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return window.firebaseAuth.signInWithPopup(provider);
}

// Firebase 認證方法 - Microsoft 登入
function firebaseMicrosoftLogin() {
    const provider = new firebase.auth.OAuthProvider('microsoft.com');
    return window.firebaseAuth.signInWithPopup(provider);
}

// Firebase 認證方法 - 登出
function firebaseLogout() {
    return window.firebaseAuth.signOut();
}

// Firebase Firestore 方法 - 保存用戶數據
async function saveUserToFirestore(uid, userData) {
    try {
        await window.firestore.collection('users').doc(uid).set(userData);
        console.log('用戶數據保存成功');
        return true;
    } catch (error) {
        console.error('保存用戶數據失敗:', error);
        return false;
    }
}

// Firebase Firestore 方法 - 獲取廠區數據
async function fetchFactoryData() {
    try {
        const snapshot = await window.firestore.collection('factories').get();
        const factories = [];
        
        snapshot.forEach(doc => {
            factories.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return factories;
    } catch (error) {
        console.error('獲取廠區數據失敗:', error);
        throw error;
    }
}

// Firebase Firestore 方法 - 獲取碳排放數據
async function fetchCarbonData(factoryId, startDate, endDate) {
    try {
        const query = window.firestore.collection('carbonData')
            .where('factoryId', '==', factoryId)
            .where('date', '>=', startDate)
            .where('date', '<=', endDate)
            .orderBy('date');
            
        const snapshot = await query.get();
        const carbonData = [];
        
        snapshot.forEach(doc => {
            carbonData.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        return carbonData;
    } catch (error) {
        console.error('獲取碳排放數據失敗:', error);
        throw error;
    }
}

// Firebase Firestore 方法 - 保存模型策略
async function saveModelStrategy(strategyData) {
    try {
        const docRef = await window.firestore.collection('strategies').add({
            ...strategyData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            userId: window.firebaseAuth.currentUser.uid
        });
        
        console.log('策略保存成功, ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('保存策略失敗:', error);
        throw error;
    }
}

// 導出 Firebase 功能
window.firebaseApp = {
    init: initFirebase,
    auth: {
        emailLogin: firebaseEmailLogin,
        emailRegister: firebaseEmailRegister,
        googleLogin: firebaseGoogleLogin,
        microsoftLogin: firebaseMicrosoftLogin,
        logout: firebaseLogout
    },
    firestore: {
        saveUser: saveUserToFirestore,
        fetchFactories: fetchFactoryData,
        fetchCarbonData: fetchCarbonData,
        saveStrategy: saveModelStrategy
    }
};
