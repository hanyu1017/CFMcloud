import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const FactoryMonitoringDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [factoryData, setFactoryData] = useState({});
  const [greenEnergyData, setGreenEnergyData] = useState({});

  // 模擬即時數據更新
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      
      // 模擬工廠數據變化
      setFactoryData({
        productivity: Math.floor(Math.random() * 20) + 75, // 75-95%
        temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
        pressure: Math.floor(Math.random() * 5) + 8, // 8-13 bar
        vibration: Math.random() * 2 + 1, // 1-3 mm/s
        efficiency: Math.floor(Math.random() * 15) + 80, // 80-95%
      });

      // 模擬綠電數據變化
      setGreenEnergyData({
        solarPower: Math.floor(Math.random() * 100) + 150, // 150-250 kW
        windPower: Math.floor(Math.random() * 80) + 50, // 50-130 kW
        batteryLevel: Math.floor(Math.random() * 20) + 70, // 70-90%
        gridConsumption: Math.floor(Math.random() * 50) + 200, // 200-250 kW
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // 生產效率歷史數據
  const productionHistory = [
    { time: '00:00', efficiency: 85, output: 120, target: 150 },
    { time: '04:00', efficiency: 88, output: 132, target: 150 },
    { time: '08:00', efficiency: 92, output: 138, target: 150 },
    { time: '12:00', efficiency: 89, output: 134, target: 150 },
    { time: '16:00', efficiency: 91, output: 137, target: 150 },
    { time: '20:00', efficiency: 87, output: 131, target: 150 },
    { time: '24:00', efficiency: 90, output: 135, target: 150 },
  ];

  // 設備狀態數據
  const equipmentStatus = [
    { name: '生產線A', status: '正常', efficiency: 94 },
    { name: '生產線B', status: '正常', efficiency: 89 },
    { name: '生產線C', status: '維護', efficiency: 0 },
    { name: '包裝機', status: '正常', efficiency: 96 },
    { name: '品檢設備', status: '正常', efficiency: 98 },
  ];

  // 綠電發電歷史數據
  const energyHistory = [
    { time: '00:00', solar: 0, wind: 45, consumption: 220 },
    { time: '06:00', solar: 50, wind: 40, consumption: 240 },
    { time: '12:00', solar: 180, wind: 35, consumption: 200 },
    { time: '18:00', solar: 120, wind: 60, consumption: 230 },
    { time: '24:00', solar: 0, wind: 50, consumption: 210 },
  ];

  // 能源分布數據
  const energyDistribution = [
    { name: '太陽能', value: 45, color: '#f59e0b' },
    { name: '風電', value: 25, color: '#10b981' },
    { name: '市電', value: 30, color: '#3b82f6' },
  ];

  // 電池狀態數據
  const batteryData = [
    { name: '電池組1', level: 85, health: 'good' },
    { name: '電池組2', level: 78, health: 'good' },
    { name: '電池組3', level: 92, health: 'excellent' },
    { name: '電池組4', level: 68, health: 'warning' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case '正常': return '#10b981';
      case '維護': return '#f59e0b';
      case '警告': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getBatteryHealthColor = (health) => {
    switch (health) {
      case 'excellent': return '#10b981';
      case 'good': return '#3b82f6';
      case 'warning': return '#f59e0b';
      case 'critical': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <Layout>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        color: '#1f2937',
        padding: '1rem' // Reduced from 2rem
      }}>
        {/* 頂部標題欄 - 更緊湊 */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem', // Reduced from 2rem
          background: '#ffffff',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          borderRadius: '0.75rem', // Reduced from 1rem
          padding: '1rem', // Reduced from 1.5rem
          border: '1px solid #e5e7eb'
        }}>
          <div>
            <h1 style={{ 
              fontSize: '1.75rem', // Reduced from 2.5rem
              fontWeight: '700',
              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              即時監控
            </h1>
            <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.9rem' }}>
              實時監控工廠生產與綠色能源狀況
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.25rem', // Reduced from 1.5rem
              fontWeight: '600',
              background: 'linear-gradient(135deg, #10b981 0%, #2563eb 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              {currentTime.toLocaleTimeString()}
            </div>
            <div style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {currentTime.toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* 工廠監控區塊 - 更緊湊 */}
        <div style={{ marginBottom: '1.5rem' }}> {/* Reduced from 3rem */}
          <h2 style={{ 
            fontSize: '1.5rem', // Reduced from 2rem
            fontWeight: '600', 
            marginBottom: '1rem', // Reduced from 1.5rem
            color: '#2563eb',
            display: 'flex',
            alignItems: 'center'
          }}>
            🏭 工廠生產監控
          </h2>

          {/* 關鍵指標卡片 - 更緊湊的網格 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Reduced from 250px
            gap: '0.75rem', // Reduced from 1.5rem
            marginBottom: '1rem' // Reduced from 2rem
          }}>
            {[
              { 
                title: '生產效率', 
                value: `${factoryData.efficiency || 85}%`, 
                icon: '⚡', 
                color: '#10b981',
                trend: '+2.3%'
              },
              { 
                title: '設備溫度', 
                value: `${factoryData.temperature || 28}°C`, 
                icon: '🌡️', 
                color: '#f59e0b',
                trend: 'Normal'
              },
              { 
                title: '系統壓力', 
                value: `${factoryData.pressure || 10} bar`, 
                icon: '💨', 
                color: '#3b82f6',
                trend: 'Stable'
              },
              { 
                title: '設備振動', 
                value: `${(factoryData.vibration || 2.1).toFixed(1)} mm/s`, 
                icon: '📊', 
                color: '#8b5cf6',
                trend: 'Normal'
              }
            ].map((metric, index) => (
              <div key={index} style={{
                background: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem', // Reduced from 1rem
                padding: '1rem', // Reduced from 2rem
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 背景漸變效果 */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(90deg, ${metric.color}, transparent)`
                }} />
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>{metric.icon}</span>
                  <div>
                    <h3 style={{ margin: 0, color: '#1f2937', fontSize: '0.9rem' }}>{metric.title}</h3>
                    <div style={{ 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                      color: metric.color,
                      lineHeight: 1
                    }}>
                      {metric.value}
                    </div>
                  </div>
                </div>
                <div style={{ 
                  color: '#6b7280', 
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <span style={{ color: metric.color, marginRight: '0.25rem' }}>▲</span>
                  {metric.trend}
                </div>
              </div>
            ))}
          </div>

          {/* 圖表區域 - 更緊湊 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}> {/* Reduced gap */}
            {/* 生產效率趨勢圖 */}
            <div style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem', // Reduced from 1rem
              padding: '1rem', // Reduced from 2rem
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '1rem', 
                fontSize: '1.1rem' // Reduced from 1.3rem
              }}>
                📈 生產效率趨勢
              </h3>
              <ResponsiveContainer width="100%" height={250}> {/* Reduced from 300 */}
                <AreaChart data={productionHistory}>
                  <defs>
                    <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.3)" />
                  <XAxis dataKey="time" stroke="#6b7280" />
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
                    dataKey="efficiency" 
                    stroke="#60a5fa" 
                    fillOpacity={1} 
                    fill="url(#efficiencyGradient)"
                    name="效率 (%)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    name="目標"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 設備狀態列表 */}
            <div style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem', // Reduced from 1rem
              padding: '1rem', // Reduced from 2rem
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ color: '#1f2937', marginBottom: '1.5rem', fontSize: '1.3rem' }}>
                🔧 設備狀態
              </h3>
              <div style={{ space: '1rem' }}>
                {equipmentStatus.map((equipment, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    marginBottom: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.5rem',
                    border: `1px solid ${getStatusColor(equipment.status)}30`
                  }}>
                    <div>
                      <div style={{ color: '#1f2937', fontWeight: '600' }}>
                        {equipment.name}
                      </div>
                      <div style={{ 
                        color: getStatusColor(equipment.status), 
                        fontSize: '0.9rem',
                        marginTop: '0.25rem'
                      }}>
                        {equipment.status}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ 
                        color: '#1f2937', 
                        fontWeight: '700',
                        fontSize: '1.2rem'
                      }}>
                        {equipment.efficiency}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 綠電設備監控區塊 - 更緊湊 */}
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', // Reduced from 2rem
            fontWeight: '600', 
            marginBottom: '1rem', // Reduced from 1.5rem
            color: '#10b981',
            display: 'flex',
            alignItems: 'center'
          }}>
            🔋 綠色能源監控
          </h2>

          {/* 能源指標卡片 - 更緊湊的網格 */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', // Reduced from 250px
            gap: '0.75rem', // Reduced from 1.5rem
            marginBottom: '1rem' // Reduced from 2rem
          }}>
            {[
              { 
                title: '太陽能發電', 
                value: `${greenEnergyData.solarPower || 180} kW`, 
                icon: '☀️', 
                color: '#f59e0b',
                percentage: Math.floor((greenEnergyData.solarPower || 180) / 250 * 100)
              },
              { 
                title: '風力發電', 
                value: `${greenEnergyData.windPower || 85} kW`, 
                icon: '💨', 
                color: '#10b981',
                percentage: Math.floor((greenEnergyData.windPower || 85) / 150 * 100)
              },
              { 
                title: '電池電量', 
                value: `${greenEnergyData.batteryLevel || 82}%`, 
                icon: '🔋', 
                color: '#3b82f6',
                percentage: greenEnergyData.batteryLevel || 82
              },
              { 
                title: '總功耗', 
                value: `${greenEnergyData.gridConsumption || 225} kW`, 
                icon: '⚡', 
                color: '#8b5cf6',
                percentage: Math.floor((greenEnergyData.gridConsumption || 225) / 300 * 100)
              }
            ].map((metric, index) => (
              <div key={index} style={{
                background: '#ffffff',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                borderRadius: '0.75rem', // Reduced from 1rem
                padding: '1rem', // Reduced from 2rem
                border: '1px solid #e5e7eb',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 進度條背景 */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: `${metric.percentage}%`,
                  height: '4px',
                  background: metric.color,
                  transition: 'width 0.5s ease'
                }} />
                
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '2rem', marginRight: '0.75rem' }}>{metric.icon}</span>
                  <div>
                    <h3 style={{ margin: 0, color: '#1f2937', fontSize: '0.9rem' }}>{metric.title}</h3>
                    <div style={{ 
                      fontSize: '2rem', 
                      fontWeight: '700', 
                      color: metric.color,
                      lineHeight: 1
                    }}>
                      {metric.value}
                    </div>
                  </div>
                </div>
                <div style={{ 
                  color: '#6b7280', 
                  fontSize: '0.8rem'
                }}>
                  容量使用率: {metric.percentage}%
                </div>
              </div>
            ))}
          </div>

          {/* 綠電圖表區域 - 更緊湊 */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}> {/* Reduced gap */}
            {/* 能源產生與消耗趨勢 */}
            <div style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem', // Reduced from 1rem
              padding: '1rem', // Reduced from 2rem
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '1.5rem', 
                fontSize: '1.3rem' 
              }}>
                ⚡ 能源產消趨勢
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={energyHistory}>
                  <defs>
                    <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="windGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.3)" />
                  <XAxis dataKey="time" stroke="#6b7280" />
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
                    dataKey="solar" 
                    stackId="1"
                    stroke="#f59e0b" 
                    fill="url(#solarGradient)"
                    name="太陽能 (kW)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="wind" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="url(#windGradient)"
                    name="風電 (kW)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="consumption" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="總消耗 (kW)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* 能源分布圓餅圖 */}
            <div style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem', // Reduced from 1rem
              padding: '1rem', // Reduced from 2rem
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '1.5rem', 
                fontSize: '1.3rem' 
              }}>
                🥧 能源分布
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={energyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {energyDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* 電池狀態監控 */}
            <div style={{
              background: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              borderRadius: '0.75rem', // Reduced from 1rem
              padding: '1rem', // Reduced from 2rem
              border: '1px solid #e5e7eb'
            }}>
              <h3 style={{ 
                color: '#1f2937', 
                marginBottom: '1.5rem', 
                fontSize: '1.3rem' 
              }}>
                🔋 電池狀態
              </h3>
              <div>
                {batteryData.map((battery, index) => (
                  <div key={index} style={{
                    marginBottom: '1.5rem',
                    padding: '1rem',
                    background: '#f9fafb',
                    borderRadius: '0.5rem'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ color: '#1f2937', fontSize: '0.9rem' }}>
                        {battery.name}
                      </span>
                      <span style={{ 
                        color: getBatteryHealthColor(battery.health),
                        fontSize: '0.8rem',
                        fontWeight: '600'
                      }}>
                        {battery.level}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e5e7eb',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${battery.level}%`,
                        height: '100%',
                        background: getBatteryHealthColor(battery.health),
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FactoryMonitoringDashboard;