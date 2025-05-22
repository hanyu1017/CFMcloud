// 認證相關腳本

// 用戶登入狀態管理
let currentUser = null;

// 初始化認證功能
document.addEventListener('DOMContentLoaded', function() {
    // 檢查是否在登入/註冊頁面
    const isLoginPage = document.querySelector('.login-page');
    if (!isLoginPage) {
        // 如果不在登入頁面，則檢查登入狀態
        checkAuthStatus();
    } else {
        // 如果在登入頁面，則初始化登入/註冊表單
        initLoginForm();
        initRegisterForm();
    }
    
    // 為登出按鈕添加事件監聽器
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// 檢查用戶登入狀態
function checkAuthStatus() {
    // 從本地存儲獲取用戶數據
    const userData = localStorage.getItem('carbonDashboardUser');
    
    if (userData) {
        try {
            currentUser = JSON.parse(userData);
            updateUIWithUserData(currentUser);
        } catch (error) {
            console.error('無法解析用戶數據:', error);
            // 清除無效的用戶數據
            localStorage.removeItem('carbonDashboardUser');
            redirectToLogin();
        }
    } else {
        // 未找到用戶數據，重定向到登入頁面
        redirectToLogin();
    }
}

// 使用用戶數據更新UI
function updateUIWithUserData(user) {
    // 更新側邊欄中的用戶資訊
    const userNameElements = document.querySelectorAll('.user-name');
    const userRoleElements = document.querySelectorAll('.user-role');
    
    userNameElements.forEach(element => {
        element.textContent = user.name;
    });
    
    userRoleElements.forEach(element => {
        element.textContent = user.role;
    });
}

// 初始化登入表單
function initLoginForm() {
    const loginForm = document.getElementById('login-form');
    const loginSubmitBtn = loginForm ? loginForm.querySelector('.login-btn') : null;
    
    if (loginSubmitBtn) {
        loginSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me')?.checked || false;
            
            // 簡單驗證
            if (!email || !password) {
                alert('請填寫電子郵件和密碼');
                return;
            }
            
            // 模擬登入過程
            login(email, password, rememberMe);
        });
    }
    
    // 社交媒體登入按鈕
    const googleLoginBtn = document.querySelector('.social-btn.google');
    const microsoftLoginBtn = document.querySelector('.social-btn.microsoft');
    
    if (googleLoginBtn) {
        googleLoginBtn.addEventListener('click', function() {
            // 模擬 Google 登入
            socialLogin('google');
        });
    }
    
    if (microsoftLoginBtn) {
        microsoftLoginBtn.addEventListener('click', function() {
            // 模擬 Microsoft 登入
            socialLogin('microsoft');
        });
    }
}

// 初始化註冊表單
function initRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const registerSubmitBtn = registerForm ? registerForm.querySelector('.register-btn') : null;
    
    if (registerSubmitBtn) {
        registerSubmitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('register-name')?.value;
            const email = document.getElementById('register-email')?.value;
            const password = document.getElementById('register-password')?.value;
            const confirmPassword = document.getElementById('register-confirm-password')?.value;
            const company = document.getElementById('register-company')?.value;
            const role = document.getElementById('register-role')?.value;
            const agreeTerms = document.getElementById('agree-terms')?.checked || false;
            
            // 簡單驗證
            if (!name || !email || !password || !company) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('兩次輸入的密碼不一致');
                return;
            }
            
            if (!agreeTerms) {
                alert('請同意服務條款和隱私政策');
                return;
            }
            
            // 模擬註冊過程
            register(name, email, password, company, role);
        });
    }
}

// 登入功能
function login(email, password, rememberMe = false) {
    // 顯示載入動畫
    document.querySelector('.loading-overlay').style.display = 'flex';
    
    // 模擬 API 請求延遲
    setTimeout(function() {
        // 模擬後端驗證 (實際應通過 API 調用)
        // 在真實環境中，永遠不要在前端進行密碼驗證
        if (email === 'admin@example.com' && password === '123456') {
            // 創建用戶對象
            const user = {
                id: '001',
                name: '王大明',
                email: email,
                role: '管理員',
                company: '碳創科技股份有限公司',
                department: '永續發展部'
            };
            
            // 保存用戶數據到本地存儲
            saveUserData(user, rememberMe);
            
            // 重定向到首頁
            window.location.href = 'index.html';
        } else {
            // 隱藏載入動畫
            document.querySelector('.loading-overlay').style.display = 'none';
            alert('電子郵件或密碼錯誤');
        }
    }, 1500);
}

// 社交媒體登入
function socialLogin(provider) {
    // 顯示載入動畫
    document.querySelector('.loading-overlay').style.display = 'flex';
    
    // 模擬 API 請求延遲
    setTimeout(function() {
        // 模擬社交媒體登入成功
        const user = {
            id: provider === 'google' ? 'g-001' : 'm-001',
            name: '王大明',
            email: 'wang@example.com',
            role: '管理員',
            company: '碳創科技股份有限公司',
            department: '永續發展部'
        };
        
        // 保存用戶數據到本地存儲
        saveUserData(user, true);
        
        // 重定向到首頁
        window.location.href = 'index.html';
    }, 1500);
}

// 註冊功能
function register(name, email, password, company, role) {
    // 顯示載入動畫
    document.querySelector('.loading-overlay').style.display = 'flex';
    
    // 模擬 API 請求延遲
    setTimeout(function() {
        // 模擬註冊成功
        const user = {
            id: 'new-001',
            name: name,
            email: email,
            role: role || '一般使用者',
            company: company,
            department: ''
        };
        
        // 保存用戶數據到本地存儲
        saveUserData(user, true);
        
        // 重定向到首頁
        window.location.href = 'index.html';
    }, 1500);
}

// 登出功能
function logout() {
    // 清除用戶數據
    localStorage.removeItem('carbonDashboardUser');
    sessionStorage.removeItem('carbonDashboardUser');
    
    // 重定向到登入頁面
    window.location.href = 'login.html';
}

// 保存用戶數據
function saveUserData(user, rememberMe) {
    currentUser = user;
    
    if (rememberMe) {
        // 如果選擇"記住我"，保存到 localStorage (持久存儲)
        localStorage.setItem('carbonDashboardUser', JSON.stringify(user));
    } else {
        // 否則保存到 sessionStorage (臨時存儲，關閉頁面後清除)
        sessionStorage.setItem('carbonDashboardUser', JSON.stringify(user));
    }
}

// 重定向到登入頁面
function redirectToLogin() {
    // 檢查當前頁面是否已經是登入頁面
    if (window.location.pathname.includes('login.html')) {
        return;
    }
    
    // 重定向到登入頁面
    window.location.href = 'login.html';
}
