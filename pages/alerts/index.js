import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';

const AlertCenterDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filterLevel, setFilterLevel] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [newAlertCount, setNewAlertCount] = useState(0);

  // 模擬即時警報數據
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // 模擬新警報生成
      if (Math.random() < 0.2) { // 20% 機率生成新警報
        const newAlert = generateRandomAlert();
        setAlerts(prev => [newAlert, ...prev].slice(0, 50)); // 最多保留50個警報
        setNewAlertCount(prev => prev + 1);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // 初始化警報數據
  useEffect(() => {
    const initialAlerts = Array.from({ length: 20 }, (_, i) => ({
      id: `ALERT-${1000 + i}`,
      title: [
        '設備溫度異常',
        '生產線停機',
        '壓力超限',
        '振動異常',
        '電力供應不穩',
        '品質檢測異常',
        '網路連線中斷',
        '感測器故障',
        '安全系統警告',
        '維護提醒'
      ][Math.floor(Math.random() * 10)],
      description: [
        '生產線A溫度超過安全範圍',
        '包裝機意外停止運作',
        '系統壓力達到危險水位',
        '設備振動超出正常範圍',
        '廠區電壓不穩定',
        '產品品質不符合標準',
        '監控系統連線異常',
        '溫度感測器無回應',
        '緊急停止按鈕被觸發',
        '設備需要定期維護'
      ][Math.floor(Math.random() * 10)],
      level: ['critical', 'high', 'medium', 'low'][Math.floor(Math.random() * 4)],
      status: ['pending', 'investigating', 'resolved', 'dismissed'][Math.floor(Math.random() * 4)],
      factory: ['廠區A', '廠區B', '廠區C'][Math.floor(Math.random() * 3)],
      equipment: ['生產線1', '生產線2', '包裝機', '品檢設備', '冷卻系統'][Math.floor(Math.random() * 5)],
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      assignee: ['張工程師', '李技師', '王主管', '陳專員'][Math.floor(Math.random() * 4)]
    }));
    setAlerts(initialAlerts);
  }, []);

  const generateRandomAlert = () => ({
    id: `ALERT-${Date.now()}`,
    title: [
      '新增設備異常',
      '即時溫度警告',
      '系統壓力異常',
      '網路連線問題',
      '品質檢測警報'
    ][Math.floor(Math.random() * 5)],
    description: '系統偵測到異常狀況，請立即檢查',
    level: ['critical', 'high', 'medium'][Math.floor(Math.random() * 3)],
    status: 'pending',
    factory: ['廠區A', '廠區B', '廠區C'][Math.floor(Math.random() * 3)],
    equipment: ['生產線1', '生產線2', '包裝機', '品檢設備'][Math.floor(Math.random() * 4)],
    timestamp: new Date(),
    assignee: null
  });

  // 警報統計數據
  const alertStats = {
    total: alerts.length,
    critical: alerts.filter(a => a.level === 'critical').length,
    high: alerts.filter(a => a.level === 'high').length,
    medium: alerts.filter(a => a.level === 'medium').length,
    low: alerts.filter(a => a.level === 'low').length,
    pending: alerts.filter(a => a.status === 'pending').length,
    resolved: alerts.filter(a => a.status === 'resolved').length
  };

  // 警報趨勢數據
  const alertTrends = [
    { date: '01/20', critical: 3, high: 8, medium: 12, low: 5 },
    { date: '01/21', critical: 2, high: 6, medium: 15, low: 8 },
    { date: '01/22', critical: 5, high: 10, medium: 11, low: 6 },
    { date: '01/23', critical: 1, high: 7, medium: 13, low: 9 },
    { date: '01/24', critical: 4, high: 9, medium: 10, low: 7 },
    { date: '01/25', critical: 2, high: 5, medium: 14, low: 11 },
    { date: '01/26', critical: 3, high: 8, medium: 12, low: 8 }
  ];

  // 警報分布數據
  const alertDistribution = [
    { name: '生產線異常', value: 35, color: '#ef4444' },
    { name: '設備故障', value: 25, color: '#f59e0b' },
    { name: '品質問題', value: 20, color: '#eab308' },
    { name: '安全警報', value: 12, color: '#3b82f6' },
    { name: '系統異常', value: 8, color: '#8b5cf6' }
  ];

  // 廠區警報統計
  const factoryAlerts = [
    { factory: '廠區A', alerts: alerts.filter(a => a.factory === '廠區A').length },
    { factory: '廠區B', alerts: alerts.filter(a => a.factory === '廠區B').length },
    { factory: '廠區C', alerts: alerts.filter(a => a.factory === '廠區C').length }
  ];

  // 警報篩選
  const filteredAlerts = alerts.filter(alert => {
    const matchesLevel = filterLevel === 'all' || alert.level === filterLevel;
    const matchesStatus = filterStatus === 'all' || alert.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.factory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.equipment.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesLevel && matchesStatus && matchesSearch;
  });

  const getLevelColor = (level) => {
    const colors = {
      critical: '#ef4444',
      high: '#f59e0b',
      medium: '#eab308',
      low: '#3b82f6'
    };
    return colors[level] || '#6b7280';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ef4444',
      investigating: '#f59e0b',
      resolved: '#10b981',
      dismissed: '#6b7280'
    };
    return colors[status] || '#6b7280';
  };

  const getLevelText = (level) => {
    const texts = {
      critical: '緊急',
      high: '高',
      medium: '中',
      low: '低'
    };
    return texts[level] || level;
  };

  const getStatusText = (status) => {
    const texts = {
      pending: '待處理',
      investigating: '處理中',
      resolved: '已解決',
      dismissed: '已忽略'
    };
    return texts[status] || status;
  };

  const handleAlertAction = (alertId, action) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId 
        ? { ...alert, status: action, assignee: action === 'investigating' ? '當前用戶' : alert.assignee }
        : alert
    ));
  };

  return (
    <Layout>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        color: '#1f2937',
        padding: '2rem'
      }}>
        {/* 頂部標題欄 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          background: '#ffffff',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          borderRadius: '1rem',
          padding: '1.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '700', 
              background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              🚨 警報中心
            </h1>
            <p style={{ color: '#6b7280', marginTop: '0.5rem', fontSize: '1.1rem' }}>
              即時監控與管理工廠警報狀況
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600',
              background: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              {currentTime.toLocaleDateString()}
            </div>
            {newAlertCount > 0 && (
              <div style={{
                background: '#ef4444',
                color: 'white',
                borderRadius: '12px',
                padding: '0.25rem 0.75rem',
                fontSize: '0.8rem',
                fontWeight: '600',
                marginTop: '0.5rem',
                animation: 'pulse 2s infinite'
              }}>
                {newAlertCount} 新警報
              </div>
            )}
          </div>
        </div>

        {/* 警報統計卡片 */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {[
            { title: '總警報數', value: alertStats.total, icon: '📋', color: '#6b7280', desc: '所有等級' },
            { title: '緊急警報', value: alertStats.critical, icon: '🔥', color: '#ef4444', desc: '需立即處理' },
            { title: '高級警報', value: alertStats.high, icon: '⚠️', color: '#f59e0b', desc: '優先處理' },
            { title: '待處理', value: alertStats.pending, icon: '⏳', color: '#3b82f6', desc: '等待回應' },
            { title: '已解決', value: alertStats.resolved, icon: '✅', color: '#10b981', desc: '處理完成' }
          ].map((stat, index) => (
            <div key={index} style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '1rem',
              padding: '2rem',
              border: '1px solid #e5e7eb',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: stat.color
              }} />
              
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '2rem', marginRight: '1rem' }}>{stat.icon}</span>
                <div>
                  <h3 style={{ margin: 0, color: '#1f2937', fontSize: '1rem', fontWeight: '600' }}>
                    {stat.title}
                  </h3>
                  <div style={{ 
                    fontSize: '2.5rem', 
                    fontWeight: '700', 
                    color: stat.color,
                    lineHeight: 1
                  }}>
                    {stat.value}
                  </div>
                </div>
              </div>
              <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>
                {stat.desc}
              </div>
            </div>
          ))}
        </div>

        {/* 圖表區域 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* 警報趨勢圖 */}
          <div style={{
            background: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              📈 警報趨勢分析
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={alertTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.3)" />
                <XAxis dataKey="date" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="critical" 
                  stackId="1"
                  stroke="#ef4444" 
                  fill="#fecaca"
                  name="緊急"
                />
                <Area 
                  type="monotone" 
                  dataKey="high" 
                  stackId="1"
                  stroke="#f59e0b" 
                  fill="#fed7aa"
                  name="高級"
                />
                <Area 
                  type="monotone" 
                  dataKey="medium" 
                  stackId="1"
                  stroke="#eab308" 
                  fill="#fef3c7"
                  name="中級"
                />
                <Area 
                  type="monotone" 
                  dataKey="low" 
                  stackId="1"
                  stroke="#3b82f6" 
                  fill="#dbeafe"
                  name="低級"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* 警報分布圓餅圖 */}
          <div style={{
            background: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              🥧 警報分類分布
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${value}%`}
                >
                  {alertDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 廠區警報統計 */}
          <div style={{
            background: '#ffffff',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
              🏭 廠區警報統計
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={factoryAlerts} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.3)" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="factory" type="category" stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#ffffff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar 
                  dataKey="alerts" 
                  fill="#3b82f6"
                  radius={[0, 4, 4, 0]}
                  name="警報數量"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 警報列表區域 */}
        <div style={{
          background: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '1rem',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {/* 篩選器 */}
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
              <h3 style={{ color: '#1f2937', margin: 0, fontSize: '1.3rem' }}>
                📋 警報列表管理
              </h3>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: 'auto' }}>
                <input
                  type="text"
                  placeholder="搜尋警報..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem',
                    minWidth: '200px'
                  }}
                />
                
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="all">所有等級</option>
                  <option value="critical">緊急</option>
                  <option value="high">高級</option>
                  <option value="medium">中級</option>
                  <option value="low">低級</option>
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.9rem'
                  }}
                >
                  <option value="all">所有狀態</option>
                  <option value="pending">待處理</option>
                  <option value="investigating">處理中</option>
                  <option value="resolved">已解決</option>
                  <option value="dismissed">已忽略</option>
                </select>
              </div>
            </div>
          </div>

          {/* 警報列表 */}
          <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
            {filteredAlerts.length === 0 ? (
              <div style={{ 
                padding: '3rem', 
                textAlign: 'center', 
                color: '#6b7280' 
              }}>
                📭 沒有符合條件的警報
              </div>
            ) : (
              filteredAlerts.map((alert, index) => (
                <div key={alert.id} style={{
                  padding: '1.5rem',
                  borderBottom: index < filteredAlerts.length - 1 ? '1px solid #e5e7eb' : 'none',
                  transition: 'background-color 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
                  
                  {/* 左側等級指示條 */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: getLevelColor(alert.level)
                  }} />
                  
                  <div style={{ marginLeft: '1rem' }}>
                    {/* 警報標題行 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <div style={{ flex: 1 }}>
                        <h4 style={{ 
                          margin: 0, 
                          color: '#1f2937', 
                          fontSize: '1.1rem', 
                          fontWeight: '600',
                          marginBottom: '0.25rem'
                        }}>
                          {alert.title}
                        </h4>
                        <p style={{ 
                          margin: 0, 
                          color: '#6b7280', 
                          fontSize: '0.9rem',
                          lineHeight: 1.4
                        }}>
                          {alert.description}
                        </p>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: `${getLevelColor(alert.level)}20`,
                          color: getLevelColor(alert.level),
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {getLevelText(alert.level)}
                        </span>
                        
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          background: `${getStatusColor(alert.status)}20`,
                          color: getStatusColor(alert.status),
                          borderRadius: '1rem',
                          fontSize: '0.8rem',
                          fontWeight: '600'
                        }}>
                          {getStatusText(alert.status)}
                        </span>
                      </div>
                    </div>
                    
                    {/* 警報詳細資訊 */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
                      gap: '1rem',
                      marginBottom: '1rem',
                      fontSize: '0.9rem',
                      color: '#6b7280'
                    }}>
                      <div>
                        <span style={{ fontWeight: '600' }}>警報ID：</span>
                        {alert.id}
                      </div>
                      <div>
                        <span style={{ fontWeight: '600' }}>廠區：</span>
                        {alert.factory}
                      </div>
                      <div>
                        <span style={{ fontWeight: '600' }}>設備：</span>
                        {alert.equipment}
                      </div>
                      <div>
                        <span style={{ fontWeight: '600' }}>負責人：</span>
                        {alert.assignee || '未指派'}
                      </div>
                      <div>
                        <span style={{ fontWeight: '600' }}>發生時間：</span>
                        {alert.timestamp.toLocaleString()}
                      </div>
                    </div>
                    
                    {/* 操作按鈕 */}
                    {alert.status === 'pending' && (
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleAlertAction(alert.id, 'investigating')}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#3b82f6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
                        >
                          開始處理
                        </button>
                        
                        <button
                          onClick={() => handleAlertAction(alert.id, 'dismissed')}
                          style={{
                            padding: '0.5rem 1rem',
                            background: '#6b7280',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#4b5563'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = '#6b7280'}
                        >
                          忽略
                        </button>
                      </div>
                    )}
                    
                    {alert.status === 'investigating' && (
                      <button
                        onClick={() => handleAlertAction(alert.id, 'resolved')}
                        style={{
                          padding: '0.5rem 1rem',
                          background: '#10b981',
                          color: 'white',
                          border: 'none',
                          borderRadius: '0.5rem',
                          fontSize: '0.8rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          transition: 'background-color 0.2s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#10b981'}
                      >
                        標記為已解決
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default AlertCenterDashboard;