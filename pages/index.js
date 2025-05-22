import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FactoryDashboard = () => {
  const [currentTime, setCurrentTime] = useState(null);
  const [realTimeData, setRealTimeData] = useState([]);
  const [mounted, setMounted] = useState(false);

  // 確保組件在客戶端完全掛載
  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    
    // 初始化一些實時數據
    const initialData = [];
    for (let i = 0; i < 10; i++) {
      const time = new Date(Date.now() - (10 - i) * 5000);
      initialData.push({
        time: time.getHours() + ':' + time.getMinutes().toString().padStart(2, '0'),
        value: Math.floor(Math.random() * 100) + 50,
        efficiency: Math.floor(Math.random() * 30) + 70
      });
    }
    setRealTimeData(initialData);
  }, []);

  // 模擬實時數據更新
  useEffect(() => {
    if (!mounted) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      
      // 更新實時數據
      const newData = {
        time: new Date().getHours() + ':' + new Date().getMinutes().toString().padStart(2, '0'),
        value: Math.floor(Math.random() * 100) + 50,
        efficiency: Math.floor(Math.random() * 30) + 70
      };
      
      setRealTimeData(prev => {
        const updated = [...prev, newData];
        return updated.slice(-20); // 保持最近20個數據點
      });
    }, 5000);

    return () => clearInterval(timer);
  }, [mounted]);

  // 生產趨勢數據
  const productionTrendData = [
    { month: '1月', 計劃產量: 4000, 實際產量: 3800, 效率: 95 },
    { month: '2月', 計劃產量: 3000, 實際產量: 2980, 效率: 99 },
    { month: '3月', 計劃產量: 4500, 實際產量: 4200, 效率: 93 },
    { month: '4月', 計劃產量: 3500, 實際產量: 3600, 效率: 103 },
    { month: '5月', 計劃產量: 5000, 實際產量: 4850, 效率: 97 },
    { month: '6月', 計劃產量: 4200, 實際產量: 4100, 效率: 98 }
  ];

  // 設備狀態分佈
  const equipmentStatusData = [
    { name: '正常運行', value: 45, color: '#059669' },
    { name: '維護中', value: 8, color: '#d97706' },
    { name: '故障', value: 3, color: '#dc2626' },
    { name: '待機', value: 12, color: '#6b7280' }
  ];

  // 工廠產量對比
  const factoryComparisonData = [
    { name: '台北廠', 本月: 8500, 上月: 7800 },
    { name: '台中廠', 本月: 6200, 上月: 6500 },
    { name: '高雄廠', 本月: 7100, 上月: 6900 },
    { name: '桃園廠', 本月: 5800, 上月: 5200 }
  ];

  // 每日效率數據
  const dailyEfficiencyData = [
    { day: '週一', 效率: 92, 產量: 1200 },
    { day: '週二', 效率: 95, 產量: 1350 },
    { day: '週三', 效率: 88, 產量: 1100 },
    { day: '週四', 效率: 97, 產量: 1400 },
    { day: '週五', 效率: 94, 產量: 1300 },
    { day: '週六', 效率: 89, 產量: 980 },
    { day: '週日', 效率: 85, 產量: 850 }
  ];

  // 警報數據
  const alertsData = [
    { id: 1, title: '生產線A溫度過高', factory: '台北廠', time: '2分鐘前', level: 'high' },
    { id: 2, title: '設備B需要例行維護', factory: '台中廠', time: '15分鐘前', level: 'medium' },
    { id: 3, title: '原料庫存不足警告', factory: '高雄廠', time: '1小時前', level: 'low' },
    { id: 4, title: '電力消耗異常', factory: '桃園廠', time: '2小時前', level: 'medium' }
  ];

  const formatTime = (date) => {
    if (!date) return '--:--:--';
    return date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // 避免 hydration 錯誤，在服務器端渲染時返回佔位符
  if (!mounted) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--gray-50, #f9fafb)',
        fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gray-50, #f9fafb)',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      {/* 側邊欄 */}
      <div className="sidebar">
        <div className="sidebar-content">
          <div className="sidebar-logo">
            <h2>工廠監控系統</h2>
            <p>智能製造管理平台</p>
          </div>
          
          <nav className="sidebar-nav">
            <div className="nav-section">
              <div className="nav-section-title">主要功能</div>
              <a href="#" className="nav-item active">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                </svg>
                儀表板
              </a>
              <a href="#" className="nav-item">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-4-1a1 1 0 100 2h.01a1 1 0 100-2H7z"/>
                </svg>
                生產管理
              </a>
              <a href="#" className="nav-item">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                </svg>
                設備監控
              </a>
              <a href="#" className="nav-item">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
                </svg>
                警報中心
              </a>
            </div>
            
            <div className="nav-section">
              <div className="nav-section-title">數據分析</div>
              <a href="#" className="nav-item">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                </svg>
                報表分析
              </a>
              <a href="#" className="nav-item">
                <svg className="nav-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                品質控制
              </a>
            </div>
          </nav>
        </div>
      </div>

      {/* 主內容區 */}
      <div className="main-content">
        {/* 頁面標題 */}
        <div className="page-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="page-title">儀表板總覽</h1>
              <p className="page-subtitle">即時監控所有工廠運營狀況</p>
            </div>
            <div style={{ 
              fontSize: '0.875rem', 
              color: 'var(--gray-600, #4b5563)',
              textAlign: 'right' 
            }}>
              <div>最後更新：{currentTime ? formatTime(currentTime) : '載入中...'}</div>
              <div style={{ 
                marginTop: '0.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#059669',
                  marginRight: '0.5rem',
                  animation: 'pulse 2s infinite'
                }}></div>
                系統運行正常
              </div>
            </div>
          </div>
        </div>

        {/* 統計卡片 */}
        <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7z"/>
              </svg>
            </div>
            <div className="stat-value">27,450</div>
            <div className="stat-label">本月總產量</div>
            <div className="stat-change positive">
              ↗ +12.5% 較上月
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
            <div className="stat-value">95.2%</div>
            <div className="stat-label">總體效率</div>
            <div className="stat-change positive">
              ↗ +2.1% 較上週
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
              </svg>
            </div>
            <div className="stat-value">68</div>
            <div className="stat-label">運行設備</div>
            <div className="stat-change positive">
              3台設備剛完成維護
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"/>
              </svg>
            </div>
            <div className="stat-value">5</div>
            <div className="stat-label">待處理警報</div>
            <div className="stat-change negative">
              ↗ +2 較昨日
            </div>
          </div>
        </div>

        {/* 主要圖表區域 */}
        <div className="grid grid-cols-2" style={{ marginBottom: '2rem' }}>
          {/* 生產趨勢圖 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">生產趨勢分析</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500, #6b7280)' }}>
                過去6個月
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productionTrendData}>
                  <defs>
                    <linearGradient id="planGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent-blue, #2563eb)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--accent-blue, #2563eb)" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--success, #059669)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--success, #059669)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-300, #d1d5db)" />
                  <XAxis dataKey="month" stroke="var(--gray-600, #4b5563)" />
                  <YAxis stroke="var(--gray-600, #4b5563)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300, #d1d5db)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="計劃產量"
                    stroke="var(--accent-blue, #2563eb)"
                    fill="url(#planGradient)"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="實際產量"
                    stroke="var(--success, #059669)"
                    fill="url(#actualGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 工廠產量對比 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">各廠區產量對比</h3>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500, #6b7280)' }}>
                本月 vs 上月
              </div>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={factoryComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-300, #d1d5db)" />
                  <XAxis dataKey="name" stroke="var(--gray-600, #4b5563)" />
                  <YAxis stroke="var(--gray-600, #4b5563)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300, #d1d5db)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="上月" fill="var(--gray-400, #9ca3af)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="本月" fill="var(--accent-blue, #2563eb)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 第二排圖表 */}
        <div className="grid grid-cols-3" style={{ marginBottom: '2rem' }}>
          {/* 設備狀態分佈 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">設備狀態分佈</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={equipmentStatusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {equipmentStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300, #d1d5db)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                {equipmentStatusData.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '0.5rem',
                    fontSize: '0.875rem'
                  }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      backgroundColor: item.color,
                      borderRadius: '3px',
                      marginRight: '0.5rem'
                    }}></div>
                    <span style={{ flex: 1 }}>{item.name}</span>
                    <span style={{ fontWeight: '600' }}>{item.value}台</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 每日效率趨勢 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">本週效率趨勢</h3>
            </div>
            <div className="card-body">
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={dailyEfficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-300, #d1d5db)" />
                  <XAxis dataKey="day" stroke="var(--gray-600, #4b5563)" />
                  <YAxis stroke="var(--gray-600, #4b5563)" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid var(--gray-300, #d1d5db)',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="效率"
                    stroke="var(--accent-indigo, #4f46e5)"
                    strokeWidth={3}
                    dot={{ fill: 'var(--accent-indigo, #4f46e5)', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: 'var(--accent-indigo, #4f46e5)', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 實時監控 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">實時數據監控</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.75rem',
                color: 'var(--success, #059669)'
              }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--success, #059669)',
                  marginRight: '0.5rem',
                  animation: 'pulse 2s infinite'
                }}></div>
                即時更新
              </div>
            </div>
            <div className="card-body">
              {realTimeData.length > 0 ? (
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={realTimeData.slice(-10)}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-300, #d1d5db)" />
                    <XAxis dataKey="time" stroke="var(--gray-600, #4b5563)" />
                    <YAxis stroke="var(--gray-600, #4b5563)" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid var(--gray-300, #d1d5db)',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="var(--success, #059669)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, stroke: 'var(--success, #059669)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="var(--warning, #d97706)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, stroke: 'var(--warning, #d97706)' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ 
                  height: '250px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'var(--gray-500, #6b7280)'
                }}>
                  正在載入實時數據...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 警報面板和快速操作 */}
        <div className="grid grid-cols-2">
          {/* 警報面板 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">最新警報</h3>
              <button className="btn btn-secondary btn-sm">查看全部</button>
            </div>
            <div className="alert-panel" style={{ margin: 0, borderRadius: 0, border: 'none', boxShadow: 'none' }}>
              {alertsData.map((alert) => (
                <div key={alert.id} className={`alert-item alert-${alert.level}`}>
                  <div className="alert-header">
                    <div className="alert-title">{alert.title}</div>
                    <div className="alert-time">{alert.time}</div>
                  </div>
                  <div className="alert-content">
                    <div className="alert-factory">{alert.factory}</div>
                    <span className={`alert-level ${alert.level}`}>
                      {alert.level === 'high' ? '高' : alert.level === 'medium' ? '中' : '低'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 快速操作面板 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">快速操作</h3>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <button className="btn btn-primary" style={{ 
                  flexDirection: 'column', 
                  height: '80px',
                  gap: '0.5rem'
                }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                  </svg>
                  啟動生產線
                </button>
                <button className="btn btn-warning" style={{ 
                  flexDirection: 'column', 
                  height: '80px',
                  gap: '0.5rem'
                }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"/>
                  </svg>
                  維護排程
                </button>
                <button className="btn btn-success" style={{ 
                  flexDirection: 'column', 
                  height: '80px',
                  gap: '0.5rem'
                }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                  </svg>
                  生成報表
                </button>
                <button className="btn btn-secondary" style={{ 
                  flexDirection: 'column', 
                  height: '80px',
                  gap: '0.5rem'
                }}>
                  <svg width="24" height="24" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
                  </svg>
                  系統設定
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .nav-item:hover {
          background-color: var(--primary-700, #334155);
          color: white;
          transform: translateX(2px);
        }
        
        .nav-item.active {
          background-color: var(--accent-blue, #2563eb);
          color: white;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 60%;
          background-color: white;
          border-radius: 0 2px 2px 0;
        }
      `}</style>
    </div>
  );
};

export default FactoryDashboard;