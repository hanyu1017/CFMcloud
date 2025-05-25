import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// 模擬數據
const mockData = {
  overviewStats: {
    totalEnergyConsumption: 15420,
    greenEnergyRatio: 68.5,
    carbonEmission: 2340,
    carbonReduction: 15.2
  },
  departmentEnergy: {
    manufacturing: {
      total: 10250,
      green: 6830,
      traditional: 3420,
      greenRatio: 66.6
    },
    retail: {
      total: 5170,
      green: 3730,
      traditional: 1440,
      greenRatio: 72.1
    }
  },
  carbonTargets: {
    weekly: { target: 580, current: 445, progress: 76.7 },
    monthly: { target: 2500, current: 1890, progress: 75.6 },
    yearly: { target: 30000, current: 22680, progress: 75.6 }
  },
  energyTrend: [
    { month: '1月', green: 420, traditional: 180, total: 600 },
    { month: '2月', green: 480, traditional: 160, total: 640 },
    { month: '3月', green: 520, traditional: 140, total: 660 },
    { month: '4月', green: 580, traditional: 120, total: 700 },
    { month: '5月', green: 640, traditional: 100, total: 740 },
    { month: '6月', green: 680, traditional: 90, total: 770 }
  ],
  alerts: [
    { id: 1, type: 'warning', message: '製造部門A棟傳統電力使用超標10%', time: '2小時前' },
    { id: 2, type: 'success', message: '零售部門本週綠電使用率達成75%目標', time: '4小時前' },
    { id: 3, type: 'info', message: '新增太陽能板已安裝完成，預計增加15%發電量', time: '1天前' }
  ]
};

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(true)

  // 圓餅圖顏色
  const COLORS = {
    green: '#059669',
    traditional: '#dc2626',
    manufacturing: '#2563eb',
    retail: '#7c3aed'
  };

  // 部門能源數據
  const departmentPieData = [
    { name: '製造部門-綠電', value: data.departmentEnergy.manufacturing.green, color: '#10b981' },
    { name: '製造部門-傳統', value: data.departmentEnergy.manufacturing.traditional, color: '#ef4444' },
    { name: '零售部門-綠電', value: data.departmentEnergy.retail.green, color: '#06d6a0' },
    { name: '零售部門-傳統', value: data.departmentEnergy.retail.traditional, color: '#f72585' }
  ];
if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </Layout>
    )
  }
  return (
    <Layout>
    <div className="dashboard-container" style={{ marginLeft: 0, minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* 頁面標題 */}
      <div style={{ padding: '2rem', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.25rem', fontWeight: '700', color: '#0f172a', marginBottom: '0.5rem' }}>
          綠能監控儀表板
        </h1>
        <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
          實時監控公司各部門能源使用與碳排放目標進度
        </p>
      </div>

      <div style={{ padding: '0 2rem 2rem' }}>
        {/* 總覽統計卡片 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <StatCard
            title="總能源消耗"
            value={`${data.overviewStats.totalEnergyConsumption.toLocaleString()}`}
            unit="kWh"
            change="+5.2%"
            changeType="positive"
            icon="⚡"
          />
          <StatCard
            title="綠電使用率"
            value={`${data.overviewStats.greenEnergyRatio}%`}
            unit=""
            change="+2.1%"
            changeType="positive"
            icon="🌱"
          />
          <StatCard
            title="碳排放量"
            value={`${data.overviewStats.carbonEmission.toLocaleString()}`}
            unit="kg CO₂"
            change="-8.5%"
            changeType="positive"
            icon="🌍"
          />
          <StatCard
            title="減碳率"
            value={`${data.overviewStats.carbonReduction}%`}
            unit=""
            change="+3.8%"
            changeType="positive"
            icon="📉"
          />
        </div>

        {/* 主要內容區 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
          {/* 部門能源使用分布 */}
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0f172a' }}>
              部門能源使用分布
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
                  >
                    {departmentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} kWh`, '消耗量']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <DepartmentSummary 
                name="製造部門" 
                total={data.departmentEnergy.manufacturing.total}
                greenRatio={data.departmentEnergy.manufacturing.greenRatio}
              />
              <DepartmentSummary 
                name="零售部門" 
                total={data.departmentEnergy.retail.total}
                greenRatio={data.departmentEnergy.retail.greenRatio}
              />
            </div>
          </div>

          {/* 能源使用趨勢 */}
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0f172a' }}>
              能源使用趨勢
            </h3>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.energyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0', 
                      borderRadius: '0.5rem',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="green" stroke="#059669" strokeWidth={3} name="綠能" />
                  <Line type="monotone" dataKey="traditional" stroke="#dc2626" strokeWidth={3} name="傳統能源" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 碳排放目標追蹤 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0f172a' }}>
              碳排放目標追蹤
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['weekly', 'monthly', 'yearly'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    backgroundColor: selectedPeriod === period ? '#2563eb' : '#f1f5f9',
                    color: selectedPeriod === period ? 'white' : '#64748b',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500'
                  }}
                >
                  {period === 'weekly' ? '週' : period === 'monthly' ? '月' : '年'}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {Object.entries(data.carbonTargets).map(([key, target]) => (
              <CarbonTargetCard 
                key={key}
                period={key === 'weekly' ? '週' : key === 'monthly' ? '月' : '年'}
                target={target.target}
                current={target.current}
                progress={target.progress}
                isSelected={selectedPeriod === key}
              />
            ))}
          </div>
        </div>

        {/* 警報與通知 */}
        <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem', color: '#0f172a' }}>
            系統通知
          </h3>
          <div style={{ space: '1rem' }}>
            {data.alerts.map((alert) => (
              <AlertItem key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

// 統計卡片組件
const StatCard = ({ title, value, unit, change, changeType, icon }) => (
  <div style={{
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '3px',
      background: 'linear-gradient(90deg, #2563eb 0%, #4f46e5 100%)'
    }} />
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
      <div>
        <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.5rem' }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: '700', color: '#0f172a' }}>{value}</span>
          <span style={{ fontSize: '0.875rem', color: '#64748b' }}>{unit}</span>
        </div>
      </div>
      <div style={{
        fontSize: '2rem',
        width: '48px',
        height: '48px',
        background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
        borderRadius: '0.75rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
    </div>
    
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      fontSize: '0.75rem',
      fontWeight: '600',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      backgroundColor: changeType === 'positive' ? 'rgba(5, 150, 105, 0.1)' : 'rgba(220, 38, 38, 0.1)',
      color: changeType === 'positive' ? '#059669' : '#dc2626'
    }}>
      {change} 較上期
    </div>
  </div>
);

// 部門摘要組件
const DepartmentSummary = ({ name, total, greenRatio }) => (
  <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
    <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}>
      {name}
    </h4>
    <p style={{ fontSize: '1.25rem', fontWeight: '700', color: '#2563eb', marginBottom: '0.25rem' }}>
      {total.toLocaleString()} kWh
    </p>
    <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
      綠電比例: <span style={{ color: '#059669', fontWeight: '600' }}>{greenRatio}%</span>
    </p>
  </div>
);

// 碳排放目標卡片
const CarbonTargetCard = ({ period, target, current, progress, isSelected }) => (
  <div style={{
    padding: '1.5rem',
    backgroundColor: isSelected ? '#eff6ff' : '#f8fafc',
    borderRadius: '0.75rem',
    border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0'
  }}>
    <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
      {period}目標
    </h4>
    
    <div style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>進度</span>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>
          {progress.toFixed(1)}%
        </span>
      </div>
      <div style={{
        width: '100%',
        height: '8px',
        backgroundColor: '#e2e8f0',
        borderRadius: '4px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${progress}%`,
          height: '100%',
          background: progress >= 80 ? '#059669' : progress >= 60 ? '#d97706' : '#dc2626',
          transition: 'width 0.3s ease'
        }} />
      </div>
    </div>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
      <div>
        <p style={{ color: '#64748b' }}>目標</p>
        <p style={{ fontWeight: '600', color: '#0f172a' }}>{target.toLocaleString()} kg</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <p style={{ color: '#64748b' }}>當前</p>
        <p style={{ fontWeight: '600', color: '#0f172a' }}>{current.toLocaleString()} kg</p>
      </div>
    </div>
  </div>
);

// 警報項目組件
const AlertItem = ({ alert }) => {
  const alertStyles = {
    warning: { color: '#d97706', backgroundColor: 'rgba(217, 119, 6, 0.1)' },
    success: { color: '#059669', backgroundColor: 'rgba(5, 150, 105, 0.1)' },
    info: { color: '#0284c7', backgroundColor: 'rgba(2, 132, 199, 0.1)' }
  };

  return (
    <div style={{
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: alertStyles[alert.type].backgroundColor,
      border: `1px solid ${alertStyles[alert.type].color}20`,
      marginBottom: '0.75rem'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ color: '#0f172a', fontWeight: '500', lineHeight: '1.4', flex: 1 }}>
          {alert.message}
        </p>
        <span style={{ fontSize: '0.75rem', color: '#64748b', marginLeft: '1rem', whiteSpace: 'nowrap' }}>
          {alert.time}
        </span>
      </div>
    </div>
  );
};

export default Dashboard;