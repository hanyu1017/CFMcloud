import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Activity, AlertTriangle, TrendingUp, Zap, Leaf, Factory } from 'lucide-react';

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
    { id: 1, type: 'high', level: 'warning', message: '製造部門A棟傳統電力使用超標10%', factory: '台北廠區 - A棟', time: '2小時前' },
    { id: 2, type: 'low', level: 'success', message: '零售部門本週綠電使用率達成75%目標', factory: '台中廠區 - 零售部', time: '4小時前' },
    { id: 3, type: 'low', level: 'info', message: '新增太陽能板已安裝完成，預計增加15%發電量', factory: '高雄廠區 - 屋頂', time: '1天前' }
  ]
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(mockData);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">儀表板總覽</h1>
        <p className="page-subtitle">即時監控所有工廠的碳排放與能源使用狀況</p>
      </div>

      {/* 關鍵指標卡片 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">關鍵指標</h2>
          <p className="card-subtitle">本月度關鍵績效指標概覽</p>
        </div>
        
        <div className="card-body">
          <div className="grid grid-cols-4">
            <StatCard 
              icon={<Zap />}
              title="總能源消耗"
              value={`${data.overviewStats.totalEnergyConsumption.toLocaleString()}`}
              unit="kWh"
              change="+5.2%"
              type="warning"
            />
            <StatCard 
              icon={<Leaf />}
              title="綠能佔比"
              value={`${data.overviewStats.greenEnergyRatio}`}
              unit="%"
              change="+2.1%"
              type="success"
            />
            <StatCard 
              icon={<Factory />}
              title="碳排放量"
              value={`${data.overviewStats.carbonEmission.toLocaleString()}`}
              unit="噸"
              change="-3.4%"
              type="success"
            />
            <StatCard 
              icon={<TrendingUp />}
              title="減碳成效"
              value={`${data.overviewStats.carbonReduction}`}
              unit="%"
              change="+1.2%"
              type="success"
            />
          </div>
        </div>
      </div>

      {/* 圖表區域 */}
      <div className="grid grid-cols-2" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">能源使用趨勢</h2>
            <p className="card-subtitle">過去6個月綠能與傳統能源使用對比</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.energyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--gray-600)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--gray-600)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="green" 
                  stroke="var(--success)" 
                  strokeWidth={3}
                  name="綠能 (kWh)"
                  dot={{ fill: 'var(--success)', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="traditional" 
                  stroke="var(--danger)" 
                  strokeWidth={3}
                  name="傳統能源 (kWh)"
                  dot={{ fill: 'var(--danger)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">部門用電分析</h2>
            <p className="card-subtitle">各部門綠能與傳統能源消耗比較</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { 
                  name: '製造部門', 
                  green: data.departmentEnergy.manufacturing.green, 
                  traditional: data.departmentEnergy.manufacturing.traditional 
                },
                { 
                  name: '零售部門', 
                  green: data.departmentEnergy.retail.green, 
                  traditional: data.departmentEnergy.retail.traditional 
                }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--gray-600)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--gray-600)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--white)',
                    border: '1px solid var(--gray-200)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                />
                <Legend />
                <Bar 
                  dataKey="green" 
                  fill="var(--success)" 
                  name="綠能 (kWh)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar 
                  dataKey="traditional" 
                  fill="var(--danger)" 
                  name="傳統能源 (kWh)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 碳排放目標進度 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">碳排放目標達成進度</h2>
          <p className="card-subtitle">各時間段減碳目標完成狀況</p>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-3">
            <ProgressCard 
              title="本週目標"
              current={data.carbonTargets.weekly.current}
              target={data.carbonTargets.weekly.target}
              progress={data.carbonTargets.weekly.progress}
              unit="噸 CO₂"
            />
            <ProgressCard 
              title="本月目標"
              current={data.carbonTargets.monthly.current}
              target={data.carbonTargets.monthly.target}
              progress={data.carbonTargets.monthly.progress}
              unit="噸 CO₂"
            />
            <ProgressCard 
              title="年度目標"
              current={data.carbonTargets.yearly.current}
              target={data.carbonTargets.yearly.target}
              progress={data.carbonTargets.yearly.progress}
              unit="噸 CO₂"
            />
          </div>
        </div>
      </div>

      {/* 最新警報 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">最新警報</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-secondary">查看全部</button>
            <button className="btn btn-primary">新增警報</button>
          </div>
        </div>
        <div className="alert-panel">
          {data.alerts.map(alert => (
            <div key={alert.id} className={`alert-item alert-${alert.type}`}>
              <div className="alert-header">
                <div className="alert-title">{alert.message}</div>
                <div className="alert-time">{alert.time}</div>
              </div>
              <div className="alert-content">
                <div className="alert-factory">{alert.factory}</div>
                <div className={`alert-level ${alert.type}`}>
                  {alert.type === 'high' && alert.level === 'warning' ? '警告' :
                   alert.type === 'low' && alert.level === 'success' ? '成功' : '資訊'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

// 統計卡片組件
function StatCard({ icon, title, value, unit, change, type }) {
  const isPositive = change.startsWith('+');
  const changeType = isPositive ? 'positive' : 'negative';
  
  return (
    <div className="stat-card">
      <div className="stat-icon">
        {icon}
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{title} {unit && `(${unit})`}</div>
      <div className={`stat-change ${changeType}`}>
        {change}
      </div>
    </div>
  );
}

// 進度卡片組件
function ProgressCard({ title, current, target, progress, unit }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="card-body">
        <h3 style={{ 
          fontSize: 'var(--font-lg)', 
          fontWeight: 600, 
          color: 'var(--primary-900)', 
          marginBottom: 'var(--space-4)' 
        }}>
          {title}
        </h3>
        
        {/* 圓形進度條 */}
        <div style={{ 
          position: 'relative', 
          width: '120px', 
          height: '120px', 
          margin: '0 auto var(--space-4)' 
        }}>
          <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--gray-200)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="var(--success)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(progress / 100) * 314} 314`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
            />
          </svg>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: 'var(--font-xl)',
            fontWeight: 700,
            color: 'var(--primary-900)'
          }}>
            {progress.toFixed(1)}%
          </div>
        </div>
        
        <div style={{ fontSize: 'var(--font-sm)', color: 'var(--gray-600)' }}>
          {current.toLocaleString()} / {target.toLocaleString()} {unit}
        </div>
      </div>
    </div>
  );
}