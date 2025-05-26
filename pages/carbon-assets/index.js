import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { 
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  Wind, Sun, Droplets, TreePine, Zap, Target, TrendingUp, 
  Activity, Download, Filter, Plus, Eye, Settings 
} from 'lucide-react';

const CarbonAssetsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('6months');
  const [selectedSource, setSelectedSource] = useState('all');

  const assetData = {
    overview: {
      totalAssets: 15000,
      totalReduction: 8500,
      monthlyAverage: 720,
      yearlyTarget: 10000,
      yearlyProgress: 85,
      monthlyGrowth: 12.5,
      efficiency: 92.3
    },
    sources: [
      { 
        id: 'wind',
        name: '風力發電', 
        value: 4500, 
        percent: 30, 
        icon: Wind,
        color: 'var(--accent-blue)',
        status: 'active',
        capacity: 50,
        efficiency: 95,
        investment: 25000000
      },
      { 
        id: 'solar',
        name: '太陽能', 
        value: 3800, 
        percent: 25, 
        icon: Sun,
        color: 'var(--warning)',
        status: 'active',
        capacity: 45,
        efficiency: 88,
        investment: 18000000
      },
      { 
        id: 'hydro',
        name: '水力發電', 
        value: 3000, 
        percent: 20, 
        icon: Droplets,
        color: 'var(--info)',
        status: 'active',
        capacity: 35,
        efficiency: 91,
        investment: 30000000
      },
      { 
        id: 'forest',
        name: '植樹造林', 
        value: 2200, 
        percent: 15, 
        icon: TreePine,
        color: 'var(--success)',
        status: 'expanding',
        capacity: 25,
        efficiency: 78,
        investment: 5000000
      },
      { 
        id: 'efficiency',
        name: '節能措施', 
        value: 1500, 
        percent: 10, 
        icon: Zap,
        color: 'var(--accent-indigo)',
        status: 'active',
        capacity: 20,
        efficiency: 94,
        investment: 8000000
      }
    ],
    monthly: [
      { month: '1月', wind: 380, solar: 320, hydro: 250, forest: 180, efficiency: 120, total: 1250 },
      { month: '2月', wind: 400, solar: 350, hydro: 260, forest: 185, efficiency: 125, total: 1320 },
      { month: '3月', wind: 420, solar: 380, hydro: 270, forest: 190, efficiency: 130, total: 1390 },
      { month: '4月', wind: 450, solar: 410, hydro: 280, forest: 195, efficiency: 135, total: 1470 },
      { month: '5月', wind: 480, solar: 450, hydro: 290, forest: 200, efficiency: 140, total: 1560 },
      { month: '6月', wind: 500, solar: 480, hydro: 300, forest: 205, efficiency: 145, total: 1630 }
    ],
    quarterly: [
      { quarter: 'Q1', target: 3500, actual: 3960, variance: 460 },
      { quarter: 'Q2', target: 4000, actual: 4660, variance: 660 },
      { quarter: 'Q3', target: 4200, actual: 0, variance: 0 },
      { quarter: 'Q4', target: 4500, actual: 0, variance: 0 }
    ]
  };

  const COLORS = {
    wind: '#2563eb',
    solar: '#d97706', 
    hydro: '#0284c7',
    forest: '#059669',
    efficiency: '#4f46e5'
  };

  const renderCustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--white)',
          boxShadow: 'var(--shadow-lg)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3)',
          border: '1px solid var(--gray-200)'
        }}>
          <p style={{ 
            fontSize: 'var(--font-sm)', 
            fontWeight: 600, 
            color: 'var(--primary-900)',
            marginBottom: 'var(--space-2)'
          }}>
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} style={{ 
              fontSize: 'var(--font-sm)', 
              color: entry.color,
              margin: '0'
            }}>
              {entry.name}: {entry.value} 噸
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { class: 'status-online', text: '運行中' },
      expanding: { class: 'status-maintenance', text: '擴建中' },
      maintenance: { class: 'status-offline', text: '維護中' }
    };
    
    const config = statusConfig[status] || statusConfig.active;
    return <span className={`status-badge ${config.class}`}>{config.text}</span>;
  };

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">碳資產管理</h1>
        <p className="page-subtitle">管理與追踪各類碳資產來源與減排成效</p>
      </div>

      {/* 關鍵指標概覽 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">關鍵績效指標</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-secondary">
              <Download style={{ width: '16px', height: '16px', marginRight: 'var(--space-2)' }} />
              匯出報表
            </button>
            <button className="btn btn-primary">
              <Plus style={{ width: '16px', height: '16px', marginRight: 'var(--space-2)' }} />
              新增資產
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-4">
            <div className="stat-card">
              <div className="stat-icon">
                <Activity />
              </div>
              <div className="stat-value">{assetData.overview.totalAssets.toLocaleString()}</div>
              <div className="stat-label">總碳資產 (噸)</div>
              <div className="stat-change positive">+{assetData.overview.monthlyGrowth}%</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Target />
              </div>
              <div className="stat-value">{assetData.overview.totalReduction.toLocaleString()}</div>
              <div className="stat-label">累計減排量 (噸)</div>
              <div className="stat-change positive">+8.2%</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <TrendingUp />
              </div>
              <div className="stat-value">{assetData.overview.monthlyAverage.toLocaleString()}</div>
              <div className="stat-label">月平均減排 (噸)</div>
              <div className="stat-change positive">+5.1%</div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">
                <Zap />
              </div>
              <div className="stat-value">{assetData.overview.efficiency}%</div>
              <div className="stat-label">資產效率</div>
              <div className="stat-change positive">+2.3%</div>
            </div>
          </div>
        </div>
      </div>

      {/* 年度目標進度 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">年度減排目標進度</h2>
          <p className="card-subtitle">目標: {assetData.overview.yearlyTarget.toLocaleString()} 噸</p>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)' }}>
            {/* 圓形進度條 */}
            <div style={{ position: 'relative', width: '150px', height: '150px' }}>
              <svg width="150" height="150" style={{ transform: 'rotate(-90deg)' }}>
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  stroke="var(--gray-200)"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="75"
                  cy="75"
                  r="60"
                  stroke="var(--success)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${(assetData.overview.yearlyProgress / 100) * 377} 377`}
                  strokeLinecap="round"
                  style={{ transition: 'stroke-dasharray 0.5s ease-in-out' }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: 'var(--font-2xl)', 
                  fontWeight: 700, 
                  color: 'var(--primary-900)' 
                }}>
                  {assetData.overview.yearlyProgress}%
                </div>
                <div style={{ 
                  fontSize: 'var(--font-sm)', 
                  color: 'var(--gray-600)' 
                }}>
                  已完成
                </div>
              </div>
            </div>
            
            {/* 進度詳情 */}
            <div style={{ flex: 1 }}>
              <div className="grid grid-cols-3">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: 'var(--font-2xl)', 
                    fontWeight: 700, 
                    color: 'var(--success)' 
                  }}>
                    {assetData.overview.totalReduction.toLocaleString()}
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-sm)', 
                    color: 'var(--gray-600)' 
                  }}>
                    已減排 (噸)
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: 'var(--font-2xl)', 
                    fontWeight: 700, 
                    color: 'var(--warning)' 
                  }}>
                    {(assetData.overview.yearlyTarget - assetData.overview.totalReduction).toLocaleString()}
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-sm)', 
                    color: 'var(--gray-600)' 
                  }}>
                    剩餘目標 (噸)
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: 'var(--font-2xl)', 
                    fontWeight: 700, 
                    color: 'var(--info)' 
                  }}>
                    4個月
                  </div>
                  <div style={{ 
                    fontSize: 'var(--font-sm)', 
                    color: 'var(--gray-600)' 
                  }}>
                    剩餘時間
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 圖表區域 */}
      <div className="grid grid-cols-2" style={{ marginTop: 'var(--space-6)' }}>
        {/* 碳資產來源分布 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">碳資產來源分布</h2>
            <p className="card-subtitle">各類別減排貢獻比例</p>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetData.sources}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {assetData.sources.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[entry.id]} 
                    />
                  ))}
                </Pie>
                <Tooltip content={renderCustomTooltip} />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value) => (
                    <span style={{ 
                      fontSize: 'var(--font-sm)',
                      color: 'var(--gray-700)'
                    }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 月度減排趨勢 */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">月度減排趨勢</h2>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                style={{
                  padding: 'var(--space-2) var(--space-3)',
                  border: '1px solid var(--gray-300)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-sm)',
                  backgroundColor: 'var(--white)'
                }}
              >
                <option value="3months">近3個月</option>
                <option value="6months">近6個月</option>
                <option value="12months">近12個月</option>
              </select>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={assetData.monthly}>
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
                <Tooltip content={renderCustomTooltip} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="var(--accent-blue)" 
                  fill="var(--accent-blue)"
                  fillOpacity={0.3}
                  strokeWidth={2}
                  name="總減排量"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 各來源詳細趨勢 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">各來源減排趨勢</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-secondary">
              <Filter style={{ width: '16px', height: '16px', marginRight: 'var(--space-2)' }} />
              篩選來源
            </button>
            <button className="btn btn-secondary">
              <Eye style={{ width: '16px', height: '16px', marginRight: 'var(--space-2)' }} />
              詳細分析
            </button>
          </div>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={assetData.monthly}>
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
              <Tooltip content={renderCustomTooltip} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="wind" 
                stroke={COLORS.wind} 
                strokeWidth={3}
                dot={{ fill: COLORS.wind, strokeWidth: 2, r: 4 }}
                name="風力發電"
              />
              <Line 
                type="monotone" 
                dataKey="solar" 
                stroke={COLORS.solar} 
                strokeWidth={3}
                dot={{ fill: COLORS.solar, strokeWidth: 2, r: 4 }}
                name="太陽能"
              />
              <Line 
                type="monotone" 
                dataKey="hydro" 
                stroke={COLORS.hydro} 
                strokeWidth={3}
                dot={{ fill: COLORS.hydro, strokeWidth: 2, r: 4 }}
                name="水力發電"
              />
              <Line 
                type="monotone" 
                dataKey="forest" 
                stroke={COLORS.forest} 
                strokeWidth={3}
                dot={{ fill: COLORS.forest, strokeWidth: 2, r: 4 }}
                name="植樹造林"
              />
              <Line 
                type="monotone" 
                dataKey="efficiency" 
                stroke={COLORS.efficiency} 
                strokeWidth={3}
                dot={{ fill: COLORS.efficiency, strokeWidth: 2, r: 4 }}
                name="節能措施"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 碳資產明細表格 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">碳資產明細</h2>
          <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
            <button className="btn btn-secondary">匯出 Excel</button>
            <button className="btn btn-primary">管理資產</button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>來源類型</th>
                <th>減排量 (噸)</th>
                <th>占比</th>
                <th>產能 (MW)</th>
                <th>效率</th>
                <th>投資額</th>
                <th>狀態</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {assetData.sources.map((source) => {
                const IconComponent = source.icon;
                return (
                  <tr key={source.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-lg)',
                          backgroundColor: source.color + '20',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: source.color
                        }}>
                          <IconComponent style={{ width: '16px', height: '16px' }} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 600, color: 'var(--primary-900)' }}>
                            {source.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{source.value.toLocaleString()}</td>
                    <td>{source.percent}%</td>
                    <td>{source.capacity} MW</td>
                    <td>{source.efficiency}%</td>
                    <td>NT$ {(source.investment / 1000000).toFixed(0)}M</td>
                    <td>{getStatusBadge(source.status)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                        <button className="btn btn-secondary" style={{ 
                          padding: 'var(--space-1) var(--space-3)', 
                          fontSize: 'var(--font-xs)',
                          minHeight: '32px'
                        }}>
                          詳情
                        </button>
                        <button className="btn btn-secondary" style={{ 
                          padding: 'var(--space-1) var(--space-3)', 
                          fontSize: 'var(--font-xs)',
                          minHeight: '32px'
                        }}>
                          <Settings style={{ width: '12px', height: '12px' }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 季度目標對比 */}
      <div className="card" style={{ marginTop: 'var(--space-6)' }}>
        <div className="card-header">
          <h2 className="card-title">季度目標達成對比</h2>
          <p className="card-subtitle">各季度減排目標與實際達成對比分析</p>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assetData.quarterly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--gray-200)" />
              <XAxis 
                dataKey="quarter" 
                stroke="var(--gray-600)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--gray-600)"
                fontSize={12}
              />
              <Tooltip content={renderCustomTooltip} />
              <Legend />
              <Bar 
                dataKey="target" 
                fill="var(--gray-400)" 
                name="目標值"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="actual" 
                fill="var(--success)" 
                name="實際值"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Layout>
  );
};

export default CarbonAssetsPage;