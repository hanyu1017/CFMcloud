// 碳排模型決策系統專用腳本

// 模型參數預設值
const defaultParameters = {
    gf: 3000,
    gs: 2500,
    price: 85,
    cycle: 45,
    carbonPrice: 120
};

// 模型標籤頁管理
function initModelTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', function() {
            // 移除所有標籤頁的活動狀態
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // 設置當前標籤頁為活動狀態
            this.classList.add('active');
            tabContents[index]?.classList.add('active');
            
            // 如果切換到需要載入數據的標籤頁，可以在這裡處理
            if (index === 1) { // 成本分析標籤頁
                if (tabContents[index].querySelector('.placeholder-message')) {
                    loadCostAnalysisContent();
                }
            } else if (index === 2) { // 碳排來源標籤頁
                if (tabContents[index].querySelector('.placeholder-message')) {
                    loadCarbonSourceContent();
                }
            } else if (index === 3) { // 敏感度分析標籤頁
                if (tabContents[index].querySelector('.placeholder-message')) {
                    loadSensitivityContent();
                }
            } else if (index === 4) { // 決策地圖標籤頁
                if (tabContents[index].querySelector('.placeholder-message')) {
                    loadDecisionMapContent();
                }
            } else if (index === 5) { // 策略比較標籤頁
                if (tabContents[index].querySelector('.placeholder-message')) {
                    loadStrategyComparisonContent();
                }
            }
        });
    });
}

// 策略項目切換管理
function initStrategyItems() {
    const strategyItems = document.querySelectorAll('.strategy-item');
    
    strategyItems.forEach(item => {
        item.addEventListener('click', function() {
            // 如果是添加新策略按鈕，則顯示新策略彈窗
            if (this.classList.contains('add-new')) {
                showAddStrategyPopup();
                return;
            }
            
            // 移除所有策略項目的活動狀態
            strategyItems.forEach(i => i.classList.remove('active'));
            
            // 設置當前策略項目為活動狀態
            this.classList.add('active');
            
            // 載入對應的策略數據
            const strategyName = this.textContent.trim();
            loadStrategyData(strategyName);
        });
    });
}

// 初始化模型參數範圍和步長
function initParameterSliders() {
    const paramInputs = [
        { id: 'gf', min: 1000, max: 5000, step: 100, defaultValue: defaultParameters.gf },
        { id: 'gs', min: 1000, max: 5000, step: 100, defaultValue: defaultParameters.gs },
        { id: 'price', min: 50, max: 120, step: 1, defaultValue: defaultParameters.price },
        { id: 'cycle', min: 20, max: 90, step: 1, defaultValue: defaultParameters.cycle },
        { id: 'carbon-price', min: 50, max: 300, step: 5, defaultValue: defaultParameters.carbonPrice }
    ];
    
    paramInputs.forEach(param => {
        const input = document.getElementById(param.id);
        if (input) {
            input.min = param.min;
            input.max = param.max;
            input.step = param.step;
            input.value = param.defaultValue;
        }
    });
}

// 計算模型按鈕事件處理
function initModelButtons() {
    const calculateBtn = document.querySelector('.btn-primary');
    const resetBtn = document.querySelector('.btn-outline');
    const saveBtn = document.querySelector('.btn-secondary');
    
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            // 獲取當前的參數設定
            const params = collectModelParameters();
            
            // 計算並更新模型結果
            calculateModel(params);
            
            // 更新圖表顯示
            updateModelCharts(params);
        });
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            // 重置參數至預設值
            resetModelParameters();
        });
    }
    
    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            // 顯示保存策略彈窗
            showSaveStrategyPopup();
        });
    }
    
    // 模型模擬按鈕
    const modelBtns = document.querySelectorAll('.model-btn');
    modelBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 獲取推薦建議相關的參數
            const recommendation = this.closest('.recommendation-item');
            if (recommendation) {
                const title = recommendation.querySelector('.recommendation-title').textContent;
                applyRecommendationToModel(title);
            }
        });
    });
    
    // 採用策略按鈕
    const adoptStrategyBtn = document.querySelector('.strategy-actions .btn-primary');
    if (adoptStrategyBtn) {
        adoptStrategyBtn.addEventListener('click', function() {
            const activeStrategy = document.querySelector('.strategy-item.active');
            if (activeStrategy) {
                const strategyName = activeStrategy.textContent.trim();
                adoptStrategy(strategyName);
            }
        });
    }
    
    // 匯出比較報告按鈕
    const exportReportBtn = document.querySelector('.strategy-actions .btn-outline');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function() {
            exportStrategyReport();
        });
    }
}

// 收集當前模型參數
function collectModelParameters() {
    return {
        gf: parseInt(document.getElementById('gf')?.value || defaultParameters.gf),
        gs: parseInt(document.getElementById('gs')?.value || defaultParameters.gs),
        price: parseFloat(document.getElementById('price')?.value || defaultParameters.price),
        cycle: parseInt(document.getElementById('cycle')?.value || defaultParameters.cycle),
        carbonPrice: parseInt(document.getElementById('carbon-price')?.value || defaultParameters.carbonPrice)
    };
}

// 重置模型參數
function resetModelParameters() {
    const inputs = [
        { id: 'gf', value: defaultParameters.gf },
        { id: 'gs', value: defaultParameters.gs },
        { id: 'price', value: defaultParameters.price },
        { id: 'cycle', value: defaultParameters.cycle },
        { id: 'carbon-price', value: defaultParameters.carbonPrice }
    ];
    
    inputs.forEach(input => {
        const element = document.getElementById(input.id);
        if (element) {
            element.value = input.value;
            // 觸發input事件以更新顯示值
            const event = new Event('input', { bubbles: true });
            element.dispatchEvent(event);
        }
    });
    
    // 重新計算模型
    calculateModel(defaultParameters);
    
    // 更新圖表
    updateModelCharts(defaultParameters);
}

// 計算模型結果
function calculateModel(params) {
    // 這裡將來可以添加更詳細的模型計算邏輯
    console.log('計算模型參數:', params);
    
    // 更新狀態徽章
    updateStatusBadge(params);
    
    // 展示加載動畫，模擬計算過程
    document.querySelector('.loading-overlay').style.display = 'flex';
    setTimeout(() => {
        document.querySelector('.loading-overlay').style.display = 'none';
    }, 800);
    
    // 計算並更新結果
    const costs = calculateCosts(params);
    updateCostDisplay(costs);
}

// 更新狀態徽章
function updateStatusBadge(params) {
    const badge = document.querySelector('.status-badge');
    if (!badge) return;
    
    // 根據參數判斷是否接近最優解
    const isNearOptimal = 
        Math.abs(params.gf - 3300) <= 300 && 
        Math.abs(params.gs - 2200) <= 300 && 
        Math.abs(params.price - 88) <= 3;
    
    if (isNearOptimal) {
        badge.textContent = '接近最佳點';
        badge.className = 'status-badge status-optimal';
    } else {
        badge.textContent = '可優化空間';
        badge.className = 'status-badge status-warning';
    }
}

// 更新成本顯示
function updateCostDisplay(costs) {
    const costValues = document.querySelectorAll('.cost-value');
    if (costValues.length >= 4) {
        costValues[0].textContent = '¥' + new Intl.NumberFormat().format(costs.total);
        costValues[1].textContent = '¥' + new Intl.NumberFormat().format(costs.investment);
        costValues[2].textContent = '¥' + new Intl.NumberFormat().format(costs.procurement);
        costValues[3].textContent = '¥' + new Intl.NumberFormat().format(costs.carbon);
    }
}

// 載入策略數據
function loadStrategyData(strategyName) {
    console.log('載入策略:', strategyName);
    
    // 根據策略名稱載入不同預設參數
    let params;
    
    switch (strategyName) {
        case '策略A (成本優先)':
            params = {
                gf: 3300,
                gs: 2200,
                price: 88,
                cycle: 45,
                carbonPrice: 120
            };
            break;
        case '策略B (風險最小)':
            params = {
                gf: 3800,
                gs: 2600,
                price: 90,
                cycle: 40,
                carbonPrice: 120
            };
            break;
        case '策略C (高碳價情境)':
            params = {
                gf: 4000,
                gs: 2800,
                price: 92,
                cycle: 35,
                carbonPrice: 180
            };
            break;
        case '策略D (增產方案)':
            params = {
                gf: 3500,
                gs: 3000,
                price: 82,
                cycle: 30,
                carbonPrice: 120
            };
            break;
        default:
            // 當前策略，使用實際參數
            params = collectModelParameters();
            break;
    }
    
    // 更新參數顯示但不更改實際滑塊值
    displayStrategyParameters(params);
    
    // 更新圖表
    updateStrategyChart(params);
}

// 顯示策略參數
function displayStrategyParameters(params) {
    // 這裡只顯示策略參數而不改變滑塊的實際值
    console.log('顯示策略參數:', params);
}

// 更新策略比較圖表
function updateStrategyChart(params) {
    // 計算並更新策略圖表
    if (!window.carbonModelCharts || !window.carbonModelCharts.strategyChart) return;
    
    const costs = calculateCosts(params);
    
    window.carbonModelCharts.strategyChart.data.datasets[0].data = [
        costs.total,
        costs.total * (1 + 0.037),
        costs.total * (1 + 0.105),
        costs.total * (1 + 0.182)
    ];
    
    window.carbonModelCharts.strategyChart.data.datasets[1].data = [
        costs.total,
        costs.optimizedTotal * (1 - 0.022),
        costs.optimizedTotal * (1 - 0.036),
        costs.optimizedTotal * (1 - 0.009)
    ];
    
    window.carbonModelCharts.strategyChart.update();
}

// 顯示保存策略彈窗
function showSaveStrategyPopup() {
    alert('保存策略功能將在未來版本中實現');
}

// 顯示添加策略彈窗
function showAddStrategyPopup() {
    alert('添加新策略功能將在未來版本中實現');
}

// 採用策略
function adoptStrategy(strategyName) {
    alert(`已採用 "${strategyName}"\n此功能將在未來版本中完全實現。`);
}

// 匯出策略報告
function exportStrategyReport() {
    alert('策略比較報告匯出功能將在未來版本中實現');
}

// 應用推薦建議到模型
function applyRecommendationToModel(recommendationTitle) {
    // 根據建議標題設置參數
    let params = collectModelParameters();
    
    switch (recommendationTitle) {
        case '照明系統優化':
            // 假設推薦設置
            params.gf = 3200;
            params.gs = 2500;
            break;
        case '空調系統效能提升':
            // 假設推薦設置
            params.gf = 3500;
            params.gs = 2800;
            break;
        case '可再生能源導入':
            // 假設推薦設置
            params.gf = 3800;
            params.gs = 3000;
            break;
        default:
            // 使用最優策略建議
            params.gf = 3300;
            params.gs = 2200;
            params.price = 88;
            break;
    }
    
    // 導航到碳排模型頁面
    window.location.href = 'carbon-model.html';
}

// 載入標籤頁內容
function loadCostAnalysisContent() {
    const tabContent = document.querySelectorAll('.tab-content')[1];
    if (!tabContent) return;
    
    tabContent.innerHTML = `
        <div class="placeholder-message">
            <i class="fas fa-spinner fa-spin"></i>
            <p>正在載入成本分析模組...</p>
        </div>
    `;
    
    // 模擬載入數據的延遲
    setTimeout(() => {
        tabContent.innerHTML = `
            <div class="card">
                <h3>成本分析將在未來版本中完整實現</h3>
                <p>這裡將顯示詳細的成本結構分析和優化建議。</p>
            </div>
        `;
    }, 1200);
}

// 載入其他標籤頁內容的函數
function loadCarbonSourceContent() {
    // 類似 loadCostAnalysisContent 的實現
}

function loadSensitivityContent() {
    // 類似 loadCostAnalysisContent 的實現
}

function loadDecisionMapContent() {
    // 類似 loadCostAnalysisContent 的實現
}

function loadStrategyComparisonContent() {
    // 類似 loadCostAnalysisContent 的實現
}

// 頁面載入時初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化標籤頁
    initModelTabs();
    
    // 初始化參數滑塊
    initParameterSliders();
    
    // 初始化策略項目
    initStrategyItems();
    
    // 初始化模型按鈕事件
    initModelButtons();
    
    // 初始化模型圖表
    // 這個函數在 charts.js 中定義
});
