import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { 
  Zap, 
  Leaf, 
  Factory, 
  TrendingUp, 
  AlertTriangle, 
  Target,
  Activity,
  Thermometer,
  Wind,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  Clock,
  MapPin,
  Users,
  Settings,
  RefreshCw,
  Filter,
  Download,
  MoreHorizontal
} from 'lucide-react';

const CarbonDashboard = () => {
  const [dataUpdateCounter, setDataUpdateCounter] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24H');
  // 1. 初始值直接給 1200
  const [windowWidth, setWindowWidth] = useState(1200);

  // 2. 在 useEffect 裡處理 window
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    const dataTimer = setInterval(() => {
      setDataUpdateCounter(prev => prev + 1);
    }, 10000);
    return () => clearInterval(dataTimer);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const realtimeData = {
    totalEmissions: 1247.3 + (dataUpdateCounter % 4) * 12.5,
    energyConsumption: 8542 + (dataUpdateCounter % 3) * 85,
    greenEnergyRatio: 68.4 + (dataUpdateCounter % 5) * 1.2,
    carbonReduction: 23.7 + (dataUpdateCounter % 6) * 0.8,
    temperatureAnomaly: 1.2 + (dataUpdateCounter % 7) * 0.1,
    efficiency: 87.5 + (dataUpdateCounter % 4) * 2.1,
    waterUsage: 2890 + (dataUpdateCounter % 3) * 45,
    wasteReduction: 31.2 + (dataUpdateCounter % 5) * 1.5
  };

  const dashboardStyles = React.useMemo(() => {
    let kpiCols = 'repeat(2, 1fr)';
    let chartCols = '1fr';
    let headerDir = 'column';
    if (windowWidth >= 1200) {
      kpiCols = 'repeat(8, 1fr)';
      chartCols = '2fr 1fr 1fr';
      headerDir = 'row';
    } else if (windowWidth >= 768) {
      kpiCols = 'repeat(4, 1fr)';
      chartCols = 'repeat(2, 1fr)';
      headerDir = 'row';
    }
    return {
      container: {
        padding: '20px',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        maxWidth: '100%',
        overflowX: 'hidden'
      },
      header: {
        display: 'flex',
        flexDirection: headerDir,
        gap: '16px',
        marginBottom: '24px',
        background: 'white',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        border: '1px solid #e2e8f0'
      },
      headerTitle: {
        margin: 0,
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b'
      },
      headerSubtitle: {
        margin: '4px 0 0 0',
        fontSize: '14px',
        color: '#64748b'
      },
      statusBar: {
        display: 'flex',
        gap: '20px',
        fontSize: '13px',
        alignItems: 'center',
        flexWrap: 'wrap',
        background: 'rgba(248, 250, 252, 0.8)',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
      },
      statusItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        borderRadius: '6px',
        background: 'white',
        border: '1px solid #e2e8f0'
      },
      kpiGrid: {
        display: 'grid',
        gridTemplateColumns: kpiCols,
        gap: '16px',
        marginBottom: '24px',
        maxWidth: '100%'
      },
      chartsContainer: {
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: chartCols,
        maxWidth: '100%'
      }
    };
  }, [windowWidth]);

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
      <div style={dashboardStyles.container}>
        {/* 頁面標題 */}
        <div style={dashboardStyles.header}>
          <div>
            <h1 style={dashboardStyles.headerTitle}>企業碳管理監控中心</h1>
            <p style={dashboardStyles.headerSubtitle}>實時ESG績效追蹤與碳足跡分析平台</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <ActionButton icon={<RefreshCw className="w-4 h-4" />} text="刷新" />
            <ActionButton icon={<Filter className="w-4 h-4" />} text="篩選" />
            <ActionButton icon={<Download className="w-4 h-4" />} text="匯出" />
            <ActionButton icon={<Settings className="w-4 h-4" />} text="設定" primary />
          </div>
        </div>

        {/* 系統狀態條 */}
        <div style={dashboardStyles.statusBar}>
          <StatusItem icon={<Users className="w-3 h-3" />} text="12廠在線" color="#10b981" />
          <StatusItem icon={<Settings className="w-3 h-3" />} text="3廠維護" color="#f59e0b" />
          <StatusItem icon={<AlertTriangle className="w-3 h-3" />} text="1警報" color="#ef4444" />
          <StatusItem icon={<Clock className="w-3 h-3" />} text={`更新: ${new Date().toLocaleTimeString('zh-TW')}`} />
          <StatusItem icon={<Activity className="w-3 h-3" />} text="系統正常" color="#10b981" />
        </div>

        {/* KPI 指標區 */}
        <div style={dashboardStyles.kpiGrid}>
          <KPICard
            icon={<Factory className="w-4 h-4" />}
            title="總排放量"
            value={realtimeData.totalEmissions.toFixed(1)}
            unit="tCO₂"
            change="-3.2%"
            trend="down"
            color="#ef4444"
          />
          <KPICard
            icon={<Zap className="w-4 h-4" />}
            title="能源消耗"
            value={(realtimeData.energyConsumption/1000).toFixed(1)}
            unit="MWh"
            change="+1.8%"
            trend="up"
            color="#f59e0b"
          />
          <KPICard
            icon={<Leaf className="w-4 h-4" />}
            title="綠能占比"
            value={realtimeData.greenEnergyRatio.toFixed(1)}
            unit="%"
            change="+4.3%"
            trend="up"
            color="#10b981"
          />
          <KPICard
            icon={<Target className="w-4 h-4" />}
            title="減碳目標"
            value={realtimeData.carbonReduction.toFixed(1)}
            unit="%"
            change="+2.1%"
            trend="up"
            color="#10b981"
          />
          <KPICard
            icon={<Activity className="w-4 h-4" />}
            title="效率指數"
            value={realtimeData.efficiency.toFixed(0)}
            unit="pts"
            change="+5.4%"
            trend="up"
            color="#3b82f6"
          />
          <KPICard
            icon={<Wind className="w-4 h-4" />}
            title="水資源"
            value={(realtimeData.waterUsage/1000).toFixed(1)}
            unit="千升"
            change="-2.8%"
            trend="down"
            color="#3b82f6"
          />
          <KPICard
            icon={<Thermometer className="w-4 h-4" />}
            title="溫升影響"
            value={realtimeData.temperatureAnomaly.toFixed(1)}
            unit="°C"
            change="+0.3%"
            trend="up"
            color="#f59e0b"
          />
          <KPICard
            icon={<TrendingDown className="w-4 h-4" />}
            title="廢料減量"
            value={realtimeData.wasteReduction.toFixed(1)}
            unit="%"
            change="+7.2%"
            trend="up"
            color="#10b981"
          />
        </div>

        {/* 主要圖表區域 */}
        <div style={dashboardStyles.chartsContainer}>
          {/* 趨勢圖 */}
          <ChartCard 
            title="碳排放實時趨勢" 
            subtitle="24小時即時監控數據"
            controls={
              <TimeRangeControls timeRange={timeRange} setTimeRange={setTimeRange} />
            }
            span={2}
          >
            <TrendChart data={generateHourlyData(dataUpdateCounter)} />
          </ChartCard>

          {/* 部門績效 */}
          <ChartCard title="部門績效" subtitle="碳效率指標">
            <DepartmentPerformance />
          </ChartCard>

          {/* 能源結構 */}
          <ChartCard title="能源結構" subtitle="再生能源佔比">
            <EnergyStructure />
          </ChartCard>

          {/* 區域分布 */}
          <ChartCard title="區域分布" subtitle="各地區排放狀況">
            <RegionalDistribution />
          </ChartCard>

          {/* 年度目標 */}
          <ChartCard title="年度目標" subtitle="2025減碳進度">
            <AnnualTargets />
          </ChartCard>
        </div>

        {/* 智能預警區域 */}
        <div style={{ marginTop: '24px' }}>
          <ChartCard 
            title="智能預警與建議" 
            subtitle="系統自動分析與操作建議"
            controls={
              <div style={{ display: 'flex', gap: '4px' }}>
                <ControlButton text="全部" active />
                <ControlButton text="高優先級" />
                <ControlButton text="今日" />
              </div>
            }
          >
            <AlertsPanel />
          </ChartCard>
        </div>
      </div>
    </Layout>
  );
};

// 操作按鈕組件
const ActionButton = ({ icon, text, primary = false }) => (
  <button style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    border: `1px solid ${primary ? '#3b82f6' : '#e2e8f0'}`,
    background: primary ? '#3b82f6' : 'white',
    color: primary ? 'white' : '#475569',
    borderRadius: '8px',
    fontSize: '12px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  }}
  onMouseEnter={(e) => {
    if (primary) {
      e.target.style.background = '#2563eb';
    } else {
      e.target.style.background = '#f8fafc';
    }
  }}
  onMouseLeave={(e) => {
    if (primary) {
      e.target.style.background = '#3b82f6';
    } else {
      e.target.style.background = 'white';
    }
  }}
  >
    {icon}
    {text}
  </button>
);

// 狀態項目組件
const StatusItem = ({ icon, text, color = '#64748b' }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 8px',
    borderRadius: '6px',
    background: 'white',
    border: '1px solid #e2e8f0',
    color: '#475569',
    fontSize: '12px'
  }}>
    {color !== '#64748b' && (
      <div style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: color
      }} />
    )}
    {icon}
    <span>{text}</span>
  </div>
);

// KPI 卡片組件
const KPICard = ({ icon, title, value, unit, change, trend, color }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    minHeight: '120px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }}
  onMouseEnter={(e) => {
    e.target.style.transform = 'translateY(-2px)';
    e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
  }}
  onMouseLeave={(e) => {
    e.target.style.transform = 'translateY(0)';
    e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)';
  }}
  >
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '8px'
    }}>
      <div style={{
        padding: '8px',
        borderRadius: '8px',
        background: `${color}20`,
        color: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {icon}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        fontSize: '11px',
        fontWeight: '600',
        color: trend === 'up' ? '#10b981' : '#ef4444',
        background: trend === 'up' ? '#10b98110' : '#ef444410',
        padding: '2px 6px',
        borderRadius: '4px'
      }}>
        {trend === 'up' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
        {change}
      </div>
    </div>
    <div>
      <div style={{
        fontSize: '12px',
        color: '#64748b',
        fontWeight: '500',
        marginBottom: '4px'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1e293b'
      }}>
        {value}
        <span style={{
          fontSize: '11px',
          color: '#94a3b8',
          marginLeft: '4px'
        }}>
          {unit}
        </span>
      </div>
    </div>
  </div>
);

// 圖表卡片組件
const ChartCard = ({ title, subtitle, children, controls, span = 1 }) => (
  <div style={{
    background: 'white',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '300px',
    gridRow: span > 1 ? `span ${span}` : 'auto'
  }}>
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '16px',
      paddingBottom: '12px',
      borderBottom: '1px solid #f1f5f9',
      flexWrap: 'wrap',
      gap: '8px'
    }}>
      <div>
        <h3 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#1e293b',
          margin: 0
        }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{
            fontSize: '12px',
            color: '#64748b',
            margin: '2px 0 0 0'
          }}>
            {subtitle}
          </p>
        )}
      </div>
      {controls}
    </div>
    <div style={{ flex: 1, position: 'relative', minHeight: '200px' }}>
      {children}
    </div>
  </div>
);

// 時間範圍控制組件
const TimeRangeControls = ({ timeRange, setTimeRange }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {['1H', '24H', '7D', '30D'].map(range => (
      <ControlButton 
        key={range}
        text={range} 
        active={timeRange === range}
        onClick={() => setTimeRange(range)}
      />
    ))}
  </div>
);

// 控制按鈕組件
const ControlButton = ({ text, active = false, onClick }) => (
  <button 
    onClick={onClick}
    style={{
      padding: '4px 8px',
      border: `1px solid ${active ? '#3b82f6' : '#e2e8f0'}`,
      background: active ? '#3b82f6' : 'white',
      color: active ? 'white' : '#475569',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    }}
    onMouseEnter={(e) => {
      if (!active) {
        e.target.style.background = '#f8fafc';
      }
    }}
    onMouseLeave={(e) => {
      if (!active) {
        e.target.style.background = 'white';
      }
    }}
  >
    {text}
  </button>
);

// 趨勢圖組件
const TrendChart = ({ data }) => (
  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
    <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 800 300" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      
      {/* 背景網格 */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <line key={i} x1="60" y1={50 + i * 40} x2="750" y2={50 + i * 40} stroke="#f1f5f9" strokeWidth="1" />
      ))}
      {[0, 1, 2, 3, 4, 5, 6, 7].map(i => (
        <line key={i} x1={60 + i * 98.57} y1="50" x2={60 + i * 98.57} y2="250" stroke="#f1f5f9" strokeWidth="1" />
      ))}
      
      {/* 數據區域 */}
      <path
        d={`M 60 ${250 - data[0] * 150} ${data.map((d, i) => 
          `L ${60 + (i / 23) * 690} ${250 - d * 150}`
        ).join(' ')} L 750 250 L 60 250 Z`}
        fill="url(#trendGradient)"
      />
      
      {/* 主線 */}
      <path
        d={`M 60 ${250 - data[0] * 150} ${data.map((d, i) => 
          `L ${60 + (i / 23) * 690} ${250 - d * 150}`
        ).join(' ')}`}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
      />
      
      {/* 數據點 */}
      {data.filter((_, i) => i % 4 === 0).map((d, i) => (
        <circle
          key={i}
          cx={60 + (i * 4 / 23) * 690}
          cy={250 - d * 150}
          r="4"
          fill="#3b82f6"
          stroke="#ffffff"
          strokeWidth="2"
        />
      ))}
      
      {/* Y軸標籤 */}
      {[1000, 1200, 1400, 1600, 1800, 2000].map((val, i) => (
        <text key={val} x="55" y={250 - i * 40} textAnchor="end" fontSize="11" fill="#64748b">
          {val}
        </text>
      ))}
      
      {/* X軸標籤 */}
      {['00', '03', '06', '09', '12', '15', '18', '21'].map((time, i) => (
        <text key={time} x={60 + i * 98.57} y={270} textAnchor="middle" fontSize="11" fill="#64748b">
          {time}:00
        </text>
      ))}
    </svg>
    
    {/* 實時數值 */}
    <div style={{
      position: 'absolute',
      top: '16px',
      right: '16px',
      background: 'rgba(59, 130, 246, 0.1)',
      padding: '8px 12px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    }}>
      即時: {(1247 + data[data.length - 1] * 500).toFixed(0)} tCO₂
    </div>
  </div>
);

// 部門績效組件
const DepartmentPerformance = () => {
  const departments = [
    { name: '製造部門', efficiency: 89, color: '#10b981' },
    { name: '物流部門', efficiency: 93, color: '#10b981' },
    { name: '零售部門', efficiency: 85, color: '#f59e0b' },
    { name: '辦公部門', efficiency: 76, color: '#ef4444' }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {departments.map((dept, index) => (
        <div key={dept.name} style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 0',
          borderBottom: index < departments.length - 1 ? '1px solid #f1f5f9' : 'none'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{dept.name}</span>
              <span style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>{dept.efficiency}%</span>
            </div>
            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{
                height: '100%',
                width: `${dept.efficiency}%`,
                background: dept.color,
                borderRadius: '3px',
                transition: 'width 1s ease'
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// 能源結構組件
const EnergyStructure = () => {
  const energyData = [
    { name: '太陽能', value: 35, color: '#f59e0b' },
    { name: '風能', value: 28, color: '#10b981' },
    { name: '水力', value: 15, color: '#3b82f6' },
    { name: '傳統', value: 22, color: '#ef4444' }
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '20px' }}>
      <div style={{ position: 'relative' }}>
        <svg width="120" height="120" viewBox="0 0 120 120">
          {(() => {
            let currentAngle = 0;
            return energyData.map((item, index) => {
              const startAngle = currentAngle;
              currentAngle += (item.value / 100) * 360;
              const endAngle = currentAngle;
              
              const startRadians = (startAngle * Math.PI) / 180;
              const endRadians = (endAngle * Math.PI) / 180;
              
              const x1 = 60 + 50 * Math.cos(startRadians);
              const y1 = 60 + 50 * Math.sin(startRadians);
              const x2 = 60 + 50 * Math.cos(endRadians);
              const y2 = 60 + 50 * Math.sin(endRadians);
              
              const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
              
              return (
                <path
                  key={index}
                  d={`M 60 60 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            });
          })()}
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1e293b' }}>78%</div>
          <div style={{ fontSize: '12px', color: '#64748b' }}>綠能</div>
        </div>
      </div>
      <div style={{ flex: 1 }}>
        {energyData.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '13px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: item.color
              }} />
              <span style={{ color: '#475569' }}>{item.name}</span>
            </div>
            <span style={{ fontWeight: '600', color: '#1e293b' }}>{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// 區域分布組件
const RegionalDistribution = () => {
  const regions = [
    { name: '台北', value: 456, change: -2.3 },
    { name: '台中', value: 389, change: 1.2 },
    { name: '高雄', value: 234, change: -4.1 },
    { name: '其他', value: 168, change: -1.8 }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '12px',
      height: '100%'
    }}>
      {regions.map((region, index) => (
        <div key={index} style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: '#475569',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <MapPin className="w-3 h-3" />
            {region.name}
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '4px'
          }}>
            {region.value}
          </div>
          <div style={{
            fontSize: '12px',
            color: '#64748b',
            marginBottom: '8px'
          }}>
            tCO₂
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '500',
            color: region.change > 0 ? '#ef4444' : '#10b981'
          }}>
            {region.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(region.change)}%
          </div>
        </div>
      ))}
    </div>
  );
};

// 年度目標組件
const AnnualTargets = () => {
  const targets = [
    { period: 'Q1', progress: 89, target: 85, status: 'completed' },
    { period: 'Q2', progress: 67, target: 70, status: 'current' },
    { period: 'Q3', progress: 23, target: 75, status: 'future' },
    { period: 'Q4', progress: 5, target: 80, status: 'future' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%'
    }}>
      {targets.map((target, index) => (
        <div key={target.period} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#475569'
            }}>
              {target.period} 2025
            </span>
            <span style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#1e293b'
            }}>
              {target.progress}%
            </span>
          </div>
          <div style={{
            height: '6px',
            background: '#f1f5f9',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${(target.progress / target.target) * 100}%`,
              background: target.status === 'completed' ? '#10b981' :
                         target.status === 'current' ? '#3b82f6' : '#94a3b8',
              borderRadius: '3px',
              transition: 'width 1s ease'
            }} />
          </div>
          <div style={{
            fontSize: '11px',
            color: '#64748b'
          }}>
            目標: {target.target}% | 
            {target.status === 'completed' ? ' ✓ 已達成' :
             target.status === 'current' ? ' → 進行中' : ' ○ 計劃中'}
          </div>
        </div>
      ))}
    </div>
  );
};

// 警報面板組件
const AlertsPanel = () => {
  const alerts = [
    {
      title: '製造A3產線排放異常',
      message: '碳排放量超過標準閾值15%，建議立即檢查設備運行狀況',
      type: 'critical',
      time: '5分鐘前',
      facility: '台中廠',
      color: '#ef4444'
    },
    {
      title: '綠能採購合約即將到期',
      message: '太陽能電力採購合約將於30天後到期，請提前安排續約事宜',
      type: 'warning',
      time: '2小時前',
      facility: '採購部',
      color: '#f59e0b'
    },
    {
      title: '月度ESG報告已完成',
      message: '2025年1月可持續發展報告已自動生成，包含詳細的碳足跡分析',
      type: 'info',
      time: '6小時前',
      facility: '系統',
      color: '#3b82f6'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '16px'
    }}>
      {alerts.map((alert, index) => (
        <div 
          key={index} 
          style={{
            background: 'white',
            borderRadius: '8px',
            padding: '16px',
            borderLeft: `4px solid ${alert.color}`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #e2e8f0',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '8px'
          }}>
            <h4 style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#1e293b',
              margin: 0
            }}>
              {alert.title}
            </h4>
            <span style={{
              fontSize: '10px',
              padding: '2px 6px',
              borderRadius: '4px',
              background: `${alert.color}20`,
              color: alert.color,
              fontWeight: '500'
            }}>
              {alert.facility}
            </span>
          </div>
          <p style={{
            fontSize: '13px',
            color: '#64748b',
            margin: '0 0 8px 0',
            lineHeight: '1.4'
          }}>
            {alert.message}
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '11px',
            color: '#94a3b8'
          }}>
            <span>
              <Clock className="w-3 h-3 inline mr-1" />
              {alert.time}
            </span>
            <span>{alert.type === 'critical' ? '高優先級' : alert.type === 'warning' ? '中優先級' : '低優先級'}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

// 數據生成函數
const generateHourlyData = (counter) => {
  return Array.from({ length: 24 }, (_, i) => 
    0.5 + 0.3 * Math.sin((i + counter * 0.1) * 0.5) + 0.1 * Math.random()
  );
};

export default CarbonDashboard;