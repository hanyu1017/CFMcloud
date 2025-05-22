// 圖表配置和繪製邏輯

// 初始化首頁圖表
document.addEventListener('DOMContentLoaded', function() {
    // 檢查當前頁面是否為首頁
    const electricityChart = document.getElementById('electricityChart');
    const carbonChart = document.getElementById('carbonChart');
    const energyCompositionChart = document.getElementById('energyCompositionChart');
    
    if (electricityChart && carbonChart && energyCompositionChart) {
        // 初始化圖表
        initDashboardCharts();
    }
    
    // 檢查是否為能源盤查頁面
    const energyTrendChart = document.getElementById('energyTrendChart');
    const equipmentEnergyChart = document.getElementById('equipmentEnergyChart');
    
    if (energyTrendChart && equipmentEnergyChart) {
        // 初始化能源盤查圖表
        initEnergyAuditCharts();
    }
    
    // 檢查是否為碳排模型頁面
    const efficiencyChart = document.getElementById('efficiencyChart');
    const costChart = document.getElementById('costChart');
    const strategyChart = document.getElementById('strategyChart');
    
    if (efficiencyChart && costChart && strategyChart) {
        // 初始化碳排模型圖表
        initCarbonModelCharts();
    }
});

// 初始化首頁儀表板圖表
function initDashboardCharts() {
    // 用電度數圖表
    const electricityCtx = document.getElementById('electricityChart').getContext('2d');
    const electricityChart = new Chart(electricityCtx, {
        type: 'line',
        data: {
            labels: ['14:00', '15:00', '16:00', '17:00'],
            datasets: [{
                label: '用電度數 (kWh)',
                data: [920, 890, 950, 1005],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#3498db',
                pointRadius: 3
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // 碳排放圖表
    const carbonCtx = document.getElementById('carbonChart').getContext('2d');
    const carbonChart = new Chart(carbonCtx, {
        type: 'line',
        data: {
            labels: ['14:00', '15:00', '16:00', '17:00'],
            datasets: [{
                label: '碳排放量 (kg CO₂e)',
                data: [460, 445, 475, 503],
                borderColor: '#e74c3c',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 2,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#e74c3c',
                pointRadius: 3
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            }
        }
    });

    // 能源組成圖表
    const energyCtx = document.getElementById('energyCompositionChart').getContext('2d');
    const energyChart = new Chart(energyCtx, {
        type: 'doughnut',
        data: {
            labels: ['電力', '天然氣', '柴油', '再生能源'],
            datasets: [{
                data: [65, 15, 12, 8],
                backgroundColor: [
                    '#3498db',
                    '#e74c3c',
                    '#f39c12',
                    '#2ecc71'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            cutout: '65%'
        }
    });

    // 將圖表對象存儲到全局變量中，以便後續更新
    window.dashboardCharts = {
        electricityChart,
        carbonChart,
        energyChart
    };
}

// 更新儀表板圖表數據
function updateCharts(timeRange) {
    if (!window.dashboardCharts) return;
    
    let electricityData, carbonData, labels;
    let trendElement = document.getElementsByClassName('trend-indicator')[0];
    let carbonTrendElement = document.getElementsByClassName('trend-indicator')[1];
    
    switch(timeRange) {
        case '1小時':
            labels = ['16:00', '16:15', '16:30', '16:45', '17:00'];
            electricityData = [310, 325, 330, 350, 340];
            carbonData = [155, 160, 165, 175, 170];
            document.querySelector('.card-value').textContent = '340 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '170 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去1小時內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去1小時內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +2.1%';
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +1.8%';
            break;
        case '3小時':
            labels = ['14:00', '15:00', '16:00', '17:00'];
            electricityData = [920, 890, 950, 1005];
            carbonData = [460, 445, 475, 503];
            document.querySelector('.card-value').textContent = '2,845 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '1,423 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去3小時內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去3小時內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +5.2%';
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +3.8%';
            break;
        case '6小時':
            labels = ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
            electricityData = [850, 970, 1020, 920, 890, 950, 1005];
            carbonData = [425, 485, 510, 460, 445, 475, 503];
            document.querySelector('.card-value').textContent = '5,605 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '2,803 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去6小時內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去6小時內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +4.5%';
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +3.2%';
            break;
        case '12小時':
            labels = ['05:00', '07:00', '09:00', '11:00', '13:00', '15:00', '17:00'];
            electricityData = [450, 620, 840, 970, 1020, 890, 1005];
            carbonData = [225, 310, 420, 485, 510, 445, 503];
            document.querySelector('.card-value').textContent = '10,840 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '5,420 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去12小時內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去12小時內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-down"></i> -1.2%';
            trendElement.classList.remove('trend-up');
            trendElement.classList.add('trend-down');
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-down"></i> -0.8%';
            carbonTrendElement.classList.remove('trend-up');
            carbonTrendElement.classList.add('trend-down');
            break;
        case '24小時':
            labels = ['昨天17:00', '昨天21:00', '今天01:00', '今天05:00', '今天09:00', '今天13:00', '今天17:00'];
            electricityData = [980, 720, 450, 480, 820, 920, 1005];
            carbonData = [490, 360, 225, 240, 410, 460, 503];
            document.querySelector('.card-value').textContent = '20,450 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '10,225 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去24小時內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去24小時內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +2.6%';
            trendElement.classList.remove('trend-down');
            trendElement.classList.add('trend-up');
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +2.4%';
            carbonTrendElement.classList.remove('trend-down');
            carbonTrendElement.classList.add('trend-up');
            break;
        case '7天':
            labels = ['4/11', '4/12', '4/13', '4/14', '4/15', '4/16', '4/17', '今天'];
            electricityData = [19000, 18500, 20000, 19800, 21200, 19500, 20100, 20450];
            carbonData = [9500, 9250, 10000, 9900, 10600, 9750, 10050, 10225];
            document.querySelector('.card-value').textContent = '138,550 kWh';
            document.getElementsByClassName('card-value')[1].textContent = '69,275 kg CO₂e';
            document.getElementsByClassName('card-subtitle')[0].textContent = '過去7天內的總用電量';
            document.getElementsByClassName('card-subtitle')[1].textContent = '過去7天內的碳排放量';
            trendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +3.2%';
            carbonTrendElement.innerHTML = '<i class="fas fa-arrow-up"></i> +3.0%';
            break;
    }
    
    // 更新用電圖表數據
    window.dashboardCharts.electricityChart.data.labels = labels;
    window.dashboardCharts.electricityChart.data.datasets[0].data = electricityData;
    window.dashboardCharts.electricityChart.update();
    
    // 更新碳排放圖表數據
    window.dashboardCharts.carbonChart.data.labels = labels;
    window.dashboardCharts.carbonChart.data.datasets[0].data = carbonData;
    window.dashboardCharts.carbonChart.update();
    
    // 更新能源組成數據
    updateEnergyComposition(timeRange);
}

// 更新能源組成圖表
function updateEnergyComposition(timeRange) {
    if (!window.dashboardCharts) return;
    
    let energyData;
    
    switch(timeRange) {
        case '1小時':
            energyData = [68, 13, 10, 9];
            break;
        case '3小時':
            energyData = [65, 15, 12, 8];
            break;
        case '6小時':
            energyData = [63, 17, 13, 7];
            break;
        case '12小時':
            energyData = [62, 18, 14, 6];
            break;
        case '24小時':
            energyData = [60, 20, 15, 5];
            break;
        case '7天':
            energyData = [58, 22, 16, 4];
            break;
    }
    
    window.dashboardCharts.energyChart.data.datasets[0].data = energyData;
    window.dashboardCharts.energyChart.update();
}

// 初始化能源盤查頁面圖表
function initEnergyAuditCharts() {
    // 能源趨勢圖表
    const energyTrendCtx = document.getElementById('energyTrendChart').getContext('2d');
    const energyTrendChart = new Chart(energyTrendCtx, {
        type: 'line',
        data: {
            labels: ['1月', '2月', '3月'],
            datasets: [
                {
                    label: '電力 (kWh)',
                    data: [825000, 798000, 856482],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '天然氣 (m³)',
                    data: [13200, 12800, 12350],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                },
                {
                    label: '柴油 (L)',
                    data: [4200, 4100, 3980],
                    borderColor: '#f39c12',
                    backgroundColor: 'rgba(243, 156, 18, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        boxWidth: 12,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        display: true,
                        drawBorder: false,
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            size: 10
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                axis: 'x',
                intersect: false
            }
        }
    });

    // 設備能源分佈圖表
    const equipmentEnergyCtx = document.getElementById('equipmentEnergyChart').getContext('2d');
    const equipmentEnergyChart = new Chart(equipmentEnergyCtx, {
        type: 'doughnut',
        data: {
            labels: ['生產設備', '空調系統', '照明系統', '辦公設備', '其他設備'],
            datasets: [{
                data: [45, 28, 12, 8, 7],
                backgroundColor: [
                    '#3498db',
                    '#2ecc71',
                    '#e74c3c',
                    '#f39c12',
                    '#9b59b6'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    padding: 10,
                    cornerRadius: 4,
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            let value = context.raw || 0;
                            return label + ': ' + value + '%';
                        }
                    }
                }
            },
            maintainAspectRatio: false,
            cutout: '65%'
        }
    });

    // 將圖表對象存儲到全局變量中
    window.energyAuditCharts = {
        energyTrendChart,
        equipmentEnergyChart
    };
}

// 初始化碳排模型頁面圖表
function initCarbonModelCharts() {
    // 減碳效率評估雷達圖
    const efficiencyCtx = document.getElementById('efficiencyChart').getContext('2d');
    const efficiencyChart = new Chart(efficiencyCtx, {
        type: 'radar',
        data: {
            labels: ['製造階段效率', '運輸階段效率', '零售階段效率', '碳排放率', '成本效益'],
            datasets: [{
                label: '當前策略',
                data: [0.82, 0.75, 0.65, 0.58, 0.79],
                backgroundColor: 'rgba(38, 166, 154, 0.2)',
                borderColor: 'rgba(38, 166, 154, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(38, 166, 154, 1)',
            }, {
                label: '最佳策略建議',
                data: [0.88, 0.75, 0.70, 0.52, 0.85],
                backgroundColor: 'rgba(63, 81, 181, 0.2)',
                borderColor: 'rgba(63, 81, 181, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(63, 81, 181, 1)',
            }]
        },
        options: {
            scales: {
                r: {
                    beginAtZero: true,
                    max: 1,
                    ticks: {
                        stepSize: 0.2
                    }
                }
            }
        }
    });
    
    // 總成本構成圖表
    const costCtx = document.getElementById('costChart').getContext('2d');
    const costChart = new Chart(costCtx, {
        type: 'bar',
        data: {
            labels: ['目前成本', '最佳策略', '減碳後成本'],
            datasets: [
                {
                    label: '碳減投資',
                    data: [5500, 5500, 5500],
                    backgroundColor: 'rgba(63, 81, 181, 0.7)',
                },
                {
                    label: '採購成本',
                    data: [7820, 7650, 7650],
                    backgroundColor: 'rgba(38, 166, 154, 0.7)',
                },
                {
                    label: '碳排成本',
                    data: [2920, 2135, 1854],
                    backgroundColor: 'rgba(255, 152, 0, 0.7)',
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    stacked: true,
                },
                y: {
                    stacked: true,
                    title: {
                        display: true,
                        text: '成本 (¥)'
                    }
                }
            }
        }
    });
    
    // 策略比較圖表
    const strategyCtx = document.getElementById('strategyChart').getContext('2d');
    const strategyChart = new Chart(strategyCtx, {
        type: 'line',
        data: {
            labels: ['目前', '短期', '中期', '長期'],
            datasets: [
                {
                    label: '當前策略',
                    data: [16240, 16840, 17950, 19200],
                    borderColor: 'rgba(63, 81, 181, 1)',
                    backgroundColor: 'rgba(63, 81, 181, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: '最佳策略',
                    data: [16240, 15880, 15650, 16100],
                    borderColor: 'rgba(38, 166, 154, 1)',
                    backgroundColor: 'rgba(38, 166, 154, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            scales: {
                y: {
                    title: {
                        display: true,
                        text: '總成本 (¥)'
                    }
                }
            }
        }
    });

    // 將圖表對象存儲到全局變量中
    window.carbonModelCharts = {
        efficiencyChart,
        costChart,
        strategyChart
    };
    
    // 為參數滑動添加事件監聽器
    setupModelParameterListeners();
}

// 設置模型參數滑動監聽器
function setupModelParameterListeners() {
    const paramInputs = [
        { id: 'gf', prefix: '¥', format: true },
        { id: 'gs', prefix: '¥', format: true },
        { id: 'price', prefix: '¥', format: false },
        { id: 'cycle', prefix: '', suffix: '天', format: false },
        { id: 'carbon-price', prefix: '¥', format: true }
    ];
    
    paramInputs.forEach(param => {
        const input = document.getElementById(param.id);
        if (input) {
            input.addEventListener('input', function() {
                updateParameterValue(this, param);
                
                // 如果自動更新模型選項開啟，這裡可以調用更新模型的函數
                // 暫時實現為簡單更新圖表
                updateModelCharts(collectModelParameters());
            });
        }
    });
}

// 更新參數顯示值
function updateParameterValue(input, paramConfig) {
    let value = input.value;
    let displayValue = '';
    
    if (paramConfig.format) {
        displayValue = paramConfig.prefix + new Intl.NumberFormat().format(value);
    } else {
        displayValue = paramConfig.prefix + value + (paramConfig.suffix || '');
    }
    
    const valueDisplay = input.closest('.parameter-group').querySelector('.parameter-value');
    if (valueDisplay) {
        valueDisplay.textContent = displayValue;
    }
}

// 收集當前模型參數
function collectModelParameters() {
    return {
        gf: parseInt(document.getElementById('gf')?.value || 3000),
        gs: parseInt(document.getElementById('gs')?.value || 2500),
        price: parseFloat(document.getElementById('price')?.value || 85),
        cycle: parseInt(document.getElementById('cycle')?.value || 45),
        carbonPrice: parseInt(document.getElementById('carbon-price')?.value || 120)
    };
}

// 更新模型圖表
function updateModelCharts(params) {
    if (!window.carbonModelCharts) return;
    
    // 這裡可以根據參數變化更新各個圖表
    // 為了演示，我們將進行一些簡單的更新
    
    // 更新雷達圖效率值
    const efficiencyFactors = calculateEfficiencyFactors(params);
    window.carbonModelCharts.efficiencyChart.data.datasets[0].data = [
        efficiencyFactors.manufacturing,
        efficiencyFactors.transport,
        efficiencyFactors.retail,
        efficiencyFactors.emission,
        efficiencyFactors.cost
    ];
    window.carbonModelCharts.efficiencyChart.update();
    
    // 更新成本圖表
    const costs = calculateCosts(params);
    window.carbonModelCharts.costChart.data.datasets[0].data = [costs.investment, costs.investment, costs.investment];
    window.carbonModelCharts.costChart.data.datasets[1].data = [costs.procurement, costs.optimizedProcurement, costs.optimizedProcurement];
    window.carbonModelCharts.costChart.data.datasets[2].data = [costs.carbon, costs.optimizedCarbon, costs.reducedCarbon];
    window.carbonModelCharts.costChart.update();
    
    // 更新策略圖表
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
    
    // 更新成本詳情
    document.querySelectorAll('.cost-value')[0].textContent = '¥' + new Intl.NumberFormat().format(costs.total);
    document.querySelectorAll('.cost-value')[1].textContent = '¥' + new Intl.NumberFormat().format(costs.investment);
    document.querySelectorAll('.cost-value')[2].textContent = '¥' + new Intl.NumberFormat().format(costs.procurement);
    document.querySelectorAll('.cost-value')[3].textContent = '¥' + new Intl.NumberFormat().format(costs.carbon);
    
    // 更新建議內容
    updateRecommendations(params, costs);
}

// 計算效率因子
function calculateEfficiencyFactors(params) {
    // 這裡使用簡單公式演示，實際應用中可以使用更複雜的模型
    const manufacturing = Math.min(0.95, 0.5 + (params.gf / 8000));
    const transport = Math.min(0.9, 0.65 + (params.cycle > 45 ? -0.1 : 0.1));
    const retail = Math.min(0.9, 0.4 + (params.gs / 6000));
    const emission = Math.min(0.95, 0.7 - (params.gf + params.gs) / 20000);
    const cost = Math.min(0.95, 0.5 + ((params.price * 0.8) / 100));
    
    return {
        manufacturing,
        transport,
        retail,
        emission,
        cost
    };
}

// 計算成本
function calculateCosts(params) {
    // 投資成本
    const investment = params.gf + params.gs;
    
    // 採購成本 - 受到生產週期和價格影響
    const procurementBase = 7000;
    const procurement = procurementBase + (params.cycle < 45 ? 200 : 0) + (params.price > 85 ? 300 : 0);
    
    // 理想採購成本
    const optimizedProcurement = procurementBase + (params.cycle < 40 ? 150 : 0) + (params.price > 88 ? 350 : 0);
    
    // 碳排成本 - 受到投資和碳價影響
    const carbonBase = 3500;
    const carbonReduction = (params.gf * 0.0004) + (params.gs * 0.0003);
    const carbon = carbonBase * (1 - carbonReduction) * (params.carbonPrice / 100);
    
    // 優化後的碳排成本
    const optimizedCarbon = carbon * 0.73;
    
    // 進一步減碳後的成本
    const reducedCarbon = carbon * 0.63;
    
    // 總成本
    const total = investment + procurement + carbon;
    const optimizedTotal = investment + optimizedProcurement + optimizedCarbon;
    
    return {
        investment,
        procurement,
        optimizedProcurement,
        carbon,
        optimizedCarbon,
        reducedCarbon,
        total,
        optimizedTotal
    };
}

// 更新建議內容
function updateRecommendations(params, costs) {
    // 這裡可以根據參數和成本計算結果更新建議文字
    // 為了簡單演示，這裡僅進行簡單更新
    
    // 計算的優化參數
    const optimalGf = Math.min(5000, params.gf + (params.gf < 3300 ? 300 : -100));
    const optimalGs = Math.min(5000, params.gs + (params.gs < 2200 ? 0 : -300));
    const optimalPrice = params.price < 88 ? 88 : params.price;
    
    // 計算成本節省比例
    const savingRatio = ((costs.total - costs.optimizedTotal) / costs.total * 100).toFixed(1);
    
    // 更新建議文字
    const recommendations = document.querySelectorAll('.recommendation-card');
    if (recommendations.length >= 1) {
        const p = recommendations[0].querySelector('p');
        if (p) {
            p.innerHTML = `基於當前碳價 (¥${params.carbonPrice}/噸)，建議調整參數至：Gf=¥${optimalGf}，Gs=¥${optimalGs}，價格=¥${optimalPrice}，可使總成本下降約 ${savingRatio}%。`;
        }
    }
    
    if (recommendations.length >= 2) {
        const p = recommendations[1].querySelector('p');
        if (p) {
            p.innerHTML = `若碳價上漲至 ¥${Math.round(params.carbonPrice * 1.5)}/噸，建議提前增加製造階段投資至 ¥${Math.min(5000, optimalGf + 500)} 並縮短生產週期至 ${Math.max(20, params.cycle - 7)} 天以降低風險。`;
        }
    }
}