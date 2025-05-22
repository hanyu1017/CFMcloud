// 載入動畫
document.addEventListener('DOMContentLoaded', function() {
    // 模擬載入時間
    setTimeout(function() {
        document.querySelector('.loading-overlay').style.display = 'none';
    }, 800);
    
    // 初始化側邊選單功能
    initSideMenu();
    
    // 初始化其他通用功能
    initNotifications();
});

// 側邊選單功能
function initSideMenu() {
    // 開啟選單
    const menuToggle = document.querySelector('.menu-icon');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.side-menu').classList.add('active');
            document.querySelector('.overlay').classList.add('active');
        });
    }
    
    // 關閉選單
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            document.querySelector('.side-menu').classList.remove('active');
            document.querySelector('.overlay').classList.remove('active');
        });
    }
    
    // 點擊遮罩關閉選單
    const overlay = document.querySelector('.overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            document.querySelector('.side-menu').classList.remove('active');
            this.classList.remove('active');
        });
    }
}

// 通知功能
function initNotifications() {
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        userInfo.addEventListener('click', function() {
            // 這裡可以實現彈出通知列表的功能
            alert('您有3則未讀通知');
        });
    }
}

// 工廠選擇功能
function initFactorySelector() {
    const factoryToggle = document.querySelector('.factory-toggle');
    if (factoryToggle) {
        factoryToggle.addEventListener('click', function() {
            // 這裡可以實現彈出工廠選擇選單的功能
            alert('工廠選擇功能將在未來版本中實現');
        });
    }
}

// 時間選擇器功能
function initTimeSelector() {
    const timeButtons = document.querySelectorAll('.time-btn');
    if (timeButtons.length > 0) {
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                timeButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // 這裡可以根據選擇的時間範圍更新資料
                if (typeof updateCharts === 'function') {
                    updateCharts(this.innerText.trim());
                }
            });
        });
    }
}

// 格式化數字為千分位格式
function formatNumber(number) {
    return new Intl.NumberFormat().format(number);
}

// 日期格式化
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
}

// 時間格式化
function formatTime(date) {
    const d = new Date(date);
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}

// 日期時間格式化
function formatDateTime(date) {
    return `${formatDate(date)} ${formatTime(date)}`;
}

// 標籤頁切換功能
function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    if (tabs.length > 0) {
        tabs.forEach((tab, index) => {
            tab.addEventListener('click', function() {
                // 移除所有active類別
                document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
                
                // 為當前標籤添加active類別
                this.classList.add('active');
                const tabContents = document.querySelectorAll('.tab-content');
                if (tabContents[index]) {
                    tabContents[index].classList.add('active');
                }
            });
        });
    }
}

// 表單驗證
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('invalid');
            isValid = false;
        } else {
            input.classList.remove('invalid');
        }
    });
    
    // 如果是電子郵件欄位，則驗證格式
    const emailInputs = form.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (input.value.trim() && !emailRegex.test(input.value.trim())) {
            input.classList.add('invalid');
            isValid = false;
        }
    });
    
    return isValid;
}

// 添加登入頁面標籤切換功能
function initLoginTabs() {
    const loginTabs = document.querySelectorAll('.login-tab');
    if (loginTabs.length > 0) {
        loginTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabName = this.getAttribute('data-tab');
                
                // 移除所有active類別
                document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.login-form').forEach(f => f.classList.remove('active'));
                
                // 為當前標籤添加active類別
                this.classList.add('active');
                document.getElementById(`${tabName}-form`).classList.add('active');
            });
        });
    }
}

// 初始化頁面特定功能
document.addEventListener('DOMContentLoaded', function() {
    // 檢查當前頁面類型並初始化相應功能
    
    // 登入頁面
    if (document.querySelector('.login-page')) {
        initLoginTabs();
    }
    
    // 首頁儀表板
    if (document.querySelector('.time-selector')) {
        initTimeSelector();
        initFactorySelector();
    }
    
    // 有標籤頁的頁面
    if (document.querySelector('.nav-tabs')) {
        initTabs();
    }
    
    // 設定頁面的選單
    const settingsMenu = document.querySelectorAll('.settings-menu-item');
    if (settingsMenu.length > 0) {
        settingsMenu.forEach(item => {
            item.addEventListener('click', function() {
                // 移除所有active類別
                document.querySelectorAll('.settings-menu-item').forEach(i => i.classList.remove('active'));
                document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
                
                // 為當前項目添加active類別
                this.classList.add('active');
                const tabName = this.getAttribute('data-tab');
                document.getElementById(`${tabName}-panel`).classList.add('active');
            });
        });
    }
    
    // 工廠選擇標籤
    const factoryTabs = document.querySelectorAll('.factory-tab');
    if (factoryTabs.length > 0) {
        factoryTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                factoryTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                // 這裡可以更新相應的工廠數據
            });
        });
    }
});

// 統一處理按鈕點擊事件
document.addEventListener('click', function(e) {
    // 匯出數據按鈕
    if (e.target.closest('.action-btn') && e.target.closest('.action-btn').innerHTML.includes('匯出數據')) {
        alert('數據匯出功能將在未來版本中實現');
    }
    
    // 模型模擬按鈕
    if (e.target.closest('.model-btn') || (e.target.closest('.action-btn') && e.target.closest('.action-btn').innerHTML.includes('模型模擬'))) {
        window.location.href = 'carbon-model.html';
    }
    
    // 模型分享按鈕
    if (e.target.closest('.share-model-btn')) {
        const overlay = document.querySelector('.model-share-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }
    
    // 關閉彈窗
    if (e.target.closest('.close-popup') || e.target.closest('.close-popup-btn')) {
        const overlay = e.target.closest('.model-share-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
});

// 模擬Firebase配置預留位置
const firebaseConfig = {
    // 這裡將來放置Firebase配置
};

// 將來用於初始化Firebase的函數
function initFirebase() {
    // 這裡將來初始化Firebase
    console.log('Firebase將在未來版本中整合');
}