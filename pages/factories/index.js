import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { 
  Zap, 
  Factory, 
  Gauge,
  Users,
  AlertTriangle,
  CheckCircle,
  Sun,
  Wind,
  Battery,
  Plug,
  MapPin
} from 'lucide-react';

const FactoriesDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAnimationFrame(prev => (prev + 1) % 100);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // 模擬工廠數據
  const factories = [
    {
      id: 1,
      name: '台北智慧工廠',
      location: '台北市內湖區',
      status: 'online',
      efficiency: 92 + Math.sin(animationFrame * 0.1) * 3,
      temperature: 28 + Math.sin(animationFrame * 0.05) * 2,
      pressure: 8.5 + Math.sin(animationFrame * 0.08) * 0.5,
      employees: 156,
      alerts: 1,
      powerSources: {
        solar: 45 + Math.sin(animationFrame * 0.12) * 5,
        wind: 28 + Math.cos(animationFrame * 0.08) * 3,
        battery: 15 + Math.sin(animationFrame * 0.15) * 2,
        grid: 12 + Math.cos(animationFrame * 0.1) * 2
      },
      totalPower: 1250 + Math.sin(animationFrame * 0.1) * 50,
      production: 87 + Math.cos(animationFrame * 0.07) * 5
    },
    {
      id: 2,
      name: '台中綠能工廠',
      location: '台中市西屯區',
      status: 'online',
      efficiency: 88 + Math.cos(animationFrame * 0.09) * 4,
      temperature: 31 + Math.cos(animationFrame * 0.06) * 2,
      pressure: 9.2 + Math.cos(animationFrame * 0.07) * 0.3,
      employees: 203,
      alerts: 0,
      powerSources: {
        solar: 52 + Math.cos(animationFrame * 0.11) * 6,
        wind: 35 + Math.sin(animationFrame * 0.09) * 4,
        battery: 8 + Math.cos(animationFrame * 0.13) * 2,
        grid: 5 + Math.sin(animationFrame * 0.12) * 1
      },
      totalPower: 1680 + Math.cos(animationFrame * 0.08) * 70,
      production: 94 + Math.sin(animationFrame * 0.06) * 3
    },
    {
      id: 3,
      name: '高雄港區工廠',
      location: '高雄市前鎮區',
      status: 'maintenance',
      efficiency: 45 + Math.sin(animationFrame * 0.05) * 10,
      temperature: 35 + Math.sin(animationFrame * 0.04) * 3,
      pressure: 6.8 + Math.sin(animationFrame * 0.06) * 0.4,
      employees: 89,
      alerts: 3,
      powerSources: {
        solar: 25 + Math.sin(animationFrame * 0.1) * 3,
        wind: 15 + Math.cos(animationFrame * 0.07) * 2,
        battery: 35 + Math.sin(animationFrame * 0.08) * 5,
        grid: 25 + Math.cos(animationFrame * 0.09) * 3
      },
      totalPower: 450 + Math.sin(animationFrame * 0.12) * 30,
      production: 30 + Math.cos(animationFrame * 0.05) * 8
    }
  ];

  const totalStats = {
    totalFactories: 3,
    onlineFactories: factories.filter(f => f.status === 'online').length,
    totalEmployees: factories.reduce((sum, f) => sum + f.employees, 0),
    avgEfficiency: factories.reduce((sum, f) => sum + f.efficiency, 0) / factories.length,
    totalPower: factories.reduce((sum, f) => sum + f.totalPower, 0),
    totalAlerts: factories.reduce((sum, f) => sum + f.alerts, 0)
  };

  return (
    <Layout>
      <style jsx>{`
        .factory-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
        }
        .stat-card:hover {
          transform: translateY(-2px);
        }
        .status-dot {
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <div style={{
        padding: '16px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        minHeight: '100vh',
        fontFamily: '"Microsoft JhengHei", sans-serif'
      }}>
        
        {/* 頁面標題 */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#1e293b',
              margin: '0 0 4px 0'
            }}>
              智慧工廠監控中心
            </h1>
            <p style={{
              color: '#64748b',
              fontSize: '14px',
              margin: 0
            }}>
              實時監控工廠運營狀態與能源使用情況
            </p>
          </div>
          <div style={{
            background: '#f1f5f9',
            color: '#475569',
            padding: '6px 12px',
            borderRadius: '6px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            {currentTime.toLocaleString('zh-TW')}
          </div>
        </div>

        {/* 總覽統計 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '12px',
          marginBottom: '16px'
        }}>
          <StatCard 
            icon={<Factory size={18} />}
            value={totalStats.totalFactories}
            label="工廠總數"
            color="#3b82f6"
          />
          <StatCard 
            icon={<CheckCircle size={18} />}
            value={totalStats.onlineFactories}
            label="運行中"
            color="#10b981"
          />
          <StatCard 
            icon={<Users size={18} />}
            value={totalStats.totalEmployees.toLocaleString()}
            label="總員工數"
            color="#8b5cf6"
          />
          <StatCard 
            icon={<Gauge size={18} />}
            value={`${totalStats.avgEfficiency.toFixed(1)}%`}
            label="平均效率"
            color="#f59e0b"
          />
          <StatCard 
            icon={<Zap size={18} />}
            value={`${(totalStats.totalPower/1000).toFixed(1)}MW`}
            label="總用電量"
            color="#ef4444"
          />
          <StatCard 
            icon={<AlertTriangle size={18} />}
            value={totalStats.totalAlerts}
            label="總警報數"
            color="#f97316"
          />
        </div>

        {/* 工廠卡片 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '16px'
        }}>
          {factories.map((factory) => (
            <FactoryCard 
              key={factory.id} 
              factory={factory} 
              animationFrame={animationFrame}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

// 統計卡片組件
const StatCard = ({ icon, value, label, color }) => {
  return (
    <div 
      className="stat-card"
      style={{
        background: 'white',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        border: '1px solid #f1f5f9'
      }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px'
      }}>
        <div style={{ color: color }}>
          {icon}
        </div>
        <div style={{
          fontSize: '12px',
          color: '#64748b',
          fontWeight: '500'
        }}>
          {label}
        </div>
      </div>
      <div style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1e293b'
      }}>
        {value}
      </div>
    </div>
  );
};

// 工廠卡片組件
const FactoryCard = ({ factory, animationFrame }) => {
  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return '#10b981';
      case 'maintenance': return '#f59e0b';
      case 'offline': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'online': return '運行中';
      case 'maintenance': return '維護中';
      case 'offline': return '離線';
      default: return '未知';
    }
  };

  return (
    <div 
      className="factory-card"
      style={{
        background: 'white',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
        border: '1px solid #f1f5f9',
        transition: 'all 0.2s ease'
      }}
    >
      {/* 工廠標題區 */}
      <div style={{
        padding: '16px',
        background: `linear-gradient(135deg, ${getStatusColor(factory.status)} 0%, ${getStatusColor(factory.status)}dd 100%)`,
        color: 'white'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              margin: '0 0 4px 0'
            }}>
              {factory.name}
            </h3>
            <div style={{
              fontSize: '12px',
              opacity: 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <MapPin size={12} />
              {factory.location}
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            fontWeight: '500'
          }}>
            <div 
              className="status-dot"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'white'
              }}
            />
            {getStatusText(factory.status)}
          </div>
        </div>
      </div>

      <div style={{ padding: '16px' }}>
        {/* 關鍵指標 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px'
        }}>
          <MetricItem 
            value={`${factory.efficiency.toFixed(1)}%`}
            label="效率"
            color="#10b981"
          />
          <MetricItem 
            value={`${factory.temperature.toFixed(1)}°C`}
            label="溫度"
            color="#f59e0b"
          />
          <MetricItem 
            value={`${factory.pressure.toFixed(1)}`}
            label="壓力(bar)"
            color="#3b82f6"
          />
        </div>

        {/* 能源來源 */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Zap size={14} />
            能源來源 ({factory.totalPower.toFixed(0)}kW)
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6px'
          }}>
            <PowerItem 
              icon={<Sun size={12} />}
              label="太陽能"
              value={factory.powerSources.solar}
              color="#f59e0b"
            />
            <PowerItem 
              icon={<Wind size={12} />}
              label="風能"
              value={factory.powerSources.wind}
              color="#10b981"
            />
            <PowerItem 
              icon={<Battery size={12} />}
              label="儲電"
              value={factory.powerSources.battery}
              color="#8b5cf6"
            />
            <PowerItem 
              icon={<Plug size={12} />}
              label="電網"
              value={factory.powerSources.grid}
              color="#ef4444"
            />
          </div>
        </div>

        {/* 生產狀態 */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '4px'
          }}>
            <span style={{ fontSize: '12px', color: '#64748b' }}>生產狀態</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#1e293b' }}>
              {factory.production.toFixed(1)}%
            </span>
          </div>
          <div style={{
            background: '#f1f5f9',
            borderRadius: '4px',
            height: '6px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              background: factory.production > 80 ? '#10b981' : factory.production > 50 ? '#f59e0b' : '#ef4444',
              width: `${factory.production}%`,
              transition: 'width 1s ease'
            }} />
          </div>
        </div>

        {/* 警報狀態 */}
        <div style={{
          background: factory.alerts === 0 ? '#f0fdf4' : '#fef2f2',
          border: `1px solid ${factory.alerts === 0 ? '#bbf7d0' : '#fecaca'}`,
          borderRadius: '6px',
          padding: '8px',
          fontSize: '12px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            {factory.alerts === 0 ? (
              <CheckCircle size={14} style={{ color: '#10b981' }} />
            ) : (
              <AlertTriangle size={14} style={{ color: '#ef4444' }} />
            )}
            <span style={{
              fontWeight: '500',
              color: factory.alerts === 0 ? '#059669' : '#dc2626'
            }}>
              {factory.alerts === 0 ? '系統正常' : `${factory.alerts} 個警報`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 指標項目組件
const MetricItem = ({ value, label, color }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '8px',
      background: '#f8fafc',
      borderRadius: '6px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        color: color,
        marginBottom: '2px'
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '10px',
        color: '#64748b'
      }}>
        {label}
      </div>
    </div>
  );
};

// 電源項目組件
const PowerItem = ({ icon, label, value, color }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '6px 8px',
      background: '#f8fafc',
      borderRadius: '4px',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '11px',
        color: '#475569'
      }}>
        <div style={{ color: color }}>
          {icon}
        </div>
        {label}
      </div>
      <div style={{
        fontSize: '11px',
        fontWeight: '600',
        color: '#1e293b'
      }}>
        {value.toFixed(1)}%
      </div>
    </div>
  );
};

export default FactoriesDashboard;