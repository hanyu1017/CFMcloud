// pages/inventory/index.js
import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';

const MGInventoryManagementPage = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, map
  const [timeRange, setTimeRange] = useState('month');

  // MG汽車製造業實際數據
  const [inventoryData, setInventoryData] = useState({
    totalParts: 52680,
    lowStockItems: 89,
    outOfStockItems: 23,
    totalValue: 145800000, // 1.458億
    categories: [
      { name: '發動機零件', count: 15200, value: 52000000, status: 'normal', code: 'ENG' },
      { name: '車身零件', count: 21800, value: 42000000, status: 'warning', code: 'BODY' },
      { name: '底盤零件', count: 9600, value: 28500000, status: 'normal', code: 'CHASSIS' },
      { name: '電子零件', count: 4200, value: 16800000, status: 'critical', code: 'ELEC' },
      { name: '內裝零件', count: 1880, value: 6500000, status: 'normal', code: 'INTERIOR' }
    ],
    dealers: [
      { 
        id: 'MG-TP001', 
        name: 'MG台北信義旗艦展示中心', 
        type: 'flagship',
        location: '台北市信義區', 
        coordinates: { lat: 25.0336, lng: 121.5645 },
        vehicleStock: 45, 
        partsStock: 8500,
        capacity: 12000, 
        status: 'normal',
        lastUpdate: '2025-07-03 15:30',
        manager: '陳志明',
        phone: '02-2758-8888',
        address: '台北市信義區松仁路100號'
      },
      { 
        id: 'MG-TC001', 
        name: 'MG台中西屯服務中心', 
        type: 'service',
        location: '台中市西屯區', 
        coordinates: { lat: 24.1674, lng: 120.6574 },
        vehicleStock: 28, 
        partsStock: 15000,
        capacity: 18000, 
        status: 'high',
        lastUpdate: '2025-07-03 15:25',
        manager: '李美玲',
        phone: '04-2315-9999',
        address: '台中市西屯區台灣大道三段200號'
      },
      { 
        id: 'MG-KH001', 
        name: 'MG高雄前鎮配送中心', 
        type: 'distribution',
        location: '高雄市前鎮區', 
        coordinates: { lat: 22.5883, lng: 120.3159 },
        vehicleStock: 35, 
        partsStock: 22500,
        capacity: 28000, 
        status: 'critical',
        lastUpdate: '2025-07-03 15:20',
        manager: '王建國',
        phone: '07-536-7777',
        address: '高雄市前鎮區中山四路300號'
      },
      { 
        id: 'MG-TN001', 
        name: 'MG台南安南展示中心', 
        type: 'showroom',
        location: '台南市安南區', 
        coordinates: { lat: 23.0425, lng: 120.1861 },
        vehicleStock: 32, 
        partsStock: 7800,
        capacity: 11000, 
        status: 'normal',
        lastUpdate: '2025-07-03 15:15',
        manager: '林淑芬',
        phone: '06-355-5555',
        address: '台南市安南區安中路一段150號'
      },
      { 
        id: 'MG-TY001', 
        name: 'MG桃園中壢服務中心', 
        type: 'service',
        location: '桃園市中壢區', 
        coordinates: { lat: 24.9539, lng: 121.2267 },
        vehicleStock: 26, 
        partsStock: 11200,
        capacity: 14000, 
        status: 'low',
        lastUpdate: '2025-07-03 15:10',
        manager: '張志偉',
        phone: '03-462-8888',
        address: '桃園市中壢區中豐路300號'
      }
    ]
  });

  const [productionLines, setProductionLines] = useState([
    {
      id: 'MG-PL001',
      modelName: 'MG HS 2025',
      stage: 'final_assembly',
      progress: 78,
      startDate: '2025-06-20',
      expectedEnd: '2025-07-25',
      priority: 'normal',
      orderQuantity: 180,
      completedQuantity: 140,
      currentStation: '最終組裝線',
      qualityScore: 97.2,
      efficiency: 89.5
    },
    {
      id: 'MG-PL002', 
      modelName: 'MG ZS EV',
      stage: 'painting',
      progress: 55,
      startDate: '2025-06-25',
      expectedEnd: '2025-08-05',
      priority: 'high',
      orderQuantity: 220,
      completedQuantity: 121,
      currentStation: '塗裝作業線',
      qualityScore: 96.8,
      efficiency: 91.2
    },
    {
      id: 'MG-PL003',
      modelName: 'MG5 Sport',
      stage: 'welding',
      progress: 68,
      startDate: '2025-06-15',
      expectedEnd: '2025-07-30',
      priority: 'urgent',
      orderQuantity: 150,
      completedQuantity: 102,
      currentStation: '車身焊接線',
      qualityScore: 98.1,
      efficiency: 87.3
    },
    {
      id: 'MG-PL004',
      modelName: 'MG Cyberster',
      stage: 'testing',
      progress: 92,
      startDate: '2025-06-10',
      expectedEnd: '2025-07-15',
      priority: 'urgent',
      orderQuantity: 50,
      completedQuantity: 46,
      currentStation: '品質檢測線',
      qualityScore: 99.1,
      efficiency: 93.7
    }
  ]);

  useEffect(() => {
    // 模擬數據載入
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '400px' 
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6', // 藍色
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </Layout>
    );
  }

  const TabButton = ({ id, label, icon, active, onClick }) => (
    <button
      onClick={() => onClick(id)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        background: active ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
        color: active ? 'white' : '#64748b',
        border: active ? 'none' : '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        fontSize: '0.875rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.target.style.background = '#eff6ff'; // 藍色淡背景
          e.target.style.color = '#374151';
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.target.style.background = 'transparent';
          e.target.style.color = '#64748b';
        }
      }}
    >
      <span style={{ fontSize: '1rem' }}>{icon}</span>
      {label}
    </button>
  );

  const StatCard = ({ title, value, unit, icon, trend, trendValue, status = 'normal' }) => {
    const getStatusColor = () => {
      switch (status) {
        case 'warning': return '#f59e0b';
        case 'danger': return '#ef4444';
        case 'success': return '#10b981';
        default: return '#3b82f6'; // 一般藍色
      }
    };

    return (
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 0.5rem 0' }}>{title}</p>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem' }}>
              <span style={{ 
                fontSize: '1.875rem', 
                fontWeight: '700', 
                color: '#1f2937' 
              }}>
                {value.toLocaleString()}
              </span>
              {unit && <span style={{ color: '#64748b', fontSize: '0.875rem' }}>{unit}</span>}
            </div>
            {trend && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.25rem', 
                marginTop: '0.5rem' 
              }}>
                <span style={{ 
                  color: trend === 'up' ? '#10b981' : '#ef4444',
                  fontSize: '0.75rem'
                }}>
                  {trend === 'up' ? '↗' : '↘'} {trendValue}
                </span>
                <span style={{ color: '#64748b', fontSize: '0.75rem' }}>vs 上月</span>
              </div>
            )}
          </div>
          <div style={{
            width: '3rem',
            height: '3rem',
            background: `${getStatusColor()}20`,
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
          }}>
            {icon}
          </div>
        </div>
      </div>
    );
  };

  const ProductionLineCard = ({ line }) => {
    const getStageInfo = (stage) => {
      const stages = {
        stamping: { label: '沖壓作業', color: '#6b7280', icon: '🔨' },
        welding: { label: '車身焊接', color: '#f59e0b', icon: '⚡' },
        painting: { label: '塗裝作業', color: '#8b5cf6', icon: '🎨' },
        final_assembly: { label: '最終組裝', color: '#3b82f6', icon: '🔧' },
        testing: { label: '品質檢測', color: '#10b981', icon: '🔍' },
        completed: { label: '出廠準備', color: '#059669', icon: '✅' }
      };
      return stages[stage] || stages.stamping;
    };

    const getPriorityColor = (priority) => {
      switch (priority) {
        case 'urgent': return '#ef4444';
        case 'high': return '#f59e0b';
        case 'normal': return '#3b82f6'; // 一般藍色
        default: return '#6b7280';
      }
    };

    const stageInfo = getStageInfo(line.stage);

    return (
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: '1rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: '0 0 0.5rem 0' 
            }}>
              {line.modelName}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>
              生產線: {line.id} | 工作站: {line.currentStation}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: `${stageInfo.color}20`,
              color: stageInfo.color
            }}>
              {stageInfo.icon} {stageInfo.label}
            </span>
            <span style={{
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              background: `${getPriorityColor(line.priority)}20`,
              color: getPriorityColor(line.priority)
            }}>
              {line.priority === 'urgent' ? '🔥 緊急' : line.priority === 'high' ? '⚡ 高優先' : '🔵 一般'}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>生產進度</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
              {line.progress}%
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
              width: `${line.progress}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${stageInfo.color} 0%, ${stageInfo.color}dd 100%)`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
          gap: '1rem',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>開始日期</p>
            <p style={{ color: '#1f2937', fontWeight: '600', margin: 0 }}>{line.startDate}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>預期完成</p>
            <p style={{ color: '#1f2937', fontWeight: '600', margin: 0 }}>{line.expectedEnd}</p>
          </div>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>生產數量</p>
            <p style={{ color: '#1f2937', fontWeight: '600', margin: 0 }}>
              {line.completedQuantity}/{line.orderQuantity} 台
            </p>
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1rem',
          fontSize: '0.875rem',
          paddingTop: '1rem',
          borderTop: '1px solid #e5e7eb'
        }}>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>品質評分</p>
            <p style={{ 
              color: line.qualityScore >= 98 ? '#10b981' : line.qualityScore >= 95 ? '#f59e0b' : '#ef4444', 
              fontWeight: '700', 
              fontSize: '1rem', 
              margin: 0 
            }}>
              {line.qualityScore}%
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>生產效率</p>
            <p style={{ 
              color: line.efficiency >= 90 ? '#10b981' : line.efficiency >= 85 ? '#f59e0b' : '#ef4444', 
              fontWeight: '700', 
              fontSize: '1rem', 
              margin: 0 
            }}>
              {line.efficiency}%
            </p>
          </div>
        </div>
      </div>
    );
  };

  const DealerCard = ({ dealer }) => {
    const getStatusInfo = (status) => {
      switch (status) {
        case 'high': return { label: '庫存充足', color: '#10b981', icon: '🟢' };
        case 'normal': return { label: '庫存正常', color: '#3b82f6', icon: '🔵' };
        case 'low': return { label: '庫存偏低', color: '#f59e0b', icon: '🟡' };
        case 'critical': return { label: '急需補貨', color: '#ef4444', icon: '🔴' };
        default: return { label: '未知', color: '#6b7280', icon: '⚪' };
      }
    };

    const getTypeInfo = (type) => {
      switch (type) {
        case 'flagship': return { label: '旗艦展示中心', icon: '🏢' };
        case 'showroom': return { label: '展示中心', icon: '🚗' };
        case 'service': return { label: '服務中心', icon: '🔧' };
        case 'distribution': return { label: '配送中心', icon: '🚛' };
        default: return { label: '據點', icon: '📍' };
      }
    };

    const statusInfo = getStatusInfo(dealer.status);
    const typeInfo = getTypeInfo(dealer.type);
    const stockPercentage = (dealer.partsStock / dealer.capacity) * 100;

    return (
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onClick={() => setSelectedDealer(dealer)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#1f2937',
              margin: '0 0 0.25rem 0' 
            }}>
              {dealer.name}
            </h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 0.25rem 0' }}>
              {typeInfo.icon} {typeInfo.label} | 📍 {dealer.location}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.75rem', margin: '0 0 0.25rem 0' }}>
              負責人: {dealer.manager} | ☎️ {dealer.phone}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.75rem', margin: 0 }}>
              代碼: {dealer.id}
            </p>
          </div>
          <span style={{
            padding: '0.25rem 0.75rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: '600',
            background: `${statusInfo.color}20`,
            color: statusInfo.color
          }}>
            {statusInfo.icon} {statusInfo.label}
          </span>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b' }}>零件庫存使用率</span>
            <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
              {stockPercentage.toFixed(1)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            background: '#eff6ff', // 藍色淡背景
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${stockPercentage}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${statusInfo.color} 0%, ${statusInfo.color}dd 100%)`,
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1rem',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>零件庫存</p>
            <p style={{ color: '#1f2937', fontWeight: '700', fontSize: '1.125rem', margin: 0 }}>
              {dealer.partsStock.toLocaleString()}
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>車輛庫存</p>
            <p style={{ color: '#1f2937', fontWeight: '700', fontSize: '1.125rem', margin: 0 }}>
              {dealer.vehicleStock} 台
            </p>
          </div>
          <div>
            <p style={{ color: '#64748b', margin: '0 0 0.25rem 0' }}>最大容量</p>
            <p style={{ color: '#1f2937', fontWeight: '700', fontSize: '1.125rem', margin: 0 }}>
              {dealer.capacity.toLocaleString()}
            </p>
          </div>
        </div>

        <div style={{ 
          marginTop: '1rem', 
          paddingTop: '1rem', 
          borderTop: '1px solid #e5e7eb',
          fontSize: '0.75rem',
          color: '#64748b'
        }}>
          <p style={{ margin: '0 0 0.25rem 0' }}>地址: {dealer.address}</p>
          <p style={{ margin: 0 }}>最後更新: {dealer.lastUpdate}</p>
        </div>
      </div>
    );
  };

  const MGTaiwanMap = () => {
    const mapWidth = 600;
    const mapHeight = 800;
    
    // 台灣地圖 SVG 路徑
    const taiwanPath = "M300 100 L350 120 L380 150 L390 200 L400 250 L410 300 L420 350 L430 400 L440 450 L450 500 L460 550 L470 600 L480 650 L490 700 L480 720 L470 740 L450 750 L430 760 L410 770 L390 775 L370 780 L350 775 L330 770 L310 765 L290 760 L270 750 L250 740 L230 720 L220 700 L210 680 L200 660 L190 640 L180 620 L170 600 L160 580 L150 560 L140 540 L130 520 L120 500 L110 480 L100 460 L90 440 L80 420 L70 400 L60 380 L50 360 L40 340 L30 320 L20 300 L10 280 L5 260 L0 240 L5 220 L10 200 L20 180 L30 160 L50 140 L70 120 L90 110 L110 105 L130 102 L150 100 L170 98 L190 97 L210 96 L230 95 L250 96 L270 98 L290 100 Z";

    return (
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ 
            fontSize: '1.25rem', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 0.5rem 0' 
          }}>
            MG台灣經銷網絡分布圖
          </h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
              <span>庫存充足</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#3b82f6' }} />
              <span>庫存正常</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
              <span>庫存偏低</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
              <span>急需補貨</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {/* 地圖 */}
          <div style={{ flex: 1 }}>
            <svg 
              width="100%" 
              height="500" 
              viewBox="0 0 500 600" 
              style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
            >
              {/* 台灣島輪廓 */}
              <path
                d={taiwanPath}
                fill="#eff6ff"
                stroke="#3b82f6"
                strokeWidth="2"
              />
              
              {/* MG經銷商據點標記 */}
              {inventoryData.dealers.map((dealer, index) => {
                const getStatusColor = (status) => {
                  switch (status) {
                    case 'high': return '#10b981';
                    case 'normal': return '#3b82f6';
                    case 'low': return '#f59e0b';
                    case 'critical': return '#ef4444';
                    default: return '#6b7280';
                  }
                };

                // 簡化的座標映射
                let x, y;
                switch (dealer.id) {
                  case 'MG-TP001': x = 320; y = 180; break; // 台北
                  case 'MG-TC001': x = 280; y = 300; break; // 台中
                  case 'MG-KH001': x = 260; y = 480; break; // 高雄
                  case 'MG-TN001': x = 270; y = 420; break; // 台南
                  case 'MG-TY001': x = 310; y = 220; break; // 桃園
                  default: x = 300; y = 300;
                }

                return (
                  <g key={dealer.id}>
                    {/* 據點圓圈 */}
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill={getStatusColor(dealer.status)}
                      stroke="white"
                      strokeWidth="2"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedDealer(dealer)}
                    />
                    {/* 據點標籤 */}
                    <text
                      x={x}
                      y={y - 15}
                      textAnchor="middle"
                      fontSize="10"
                      fill="#1f2937"
                      fontWeight="600"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setSelectedDealer(dealer)}
                    >
                      {dealer.name.split('MG')[1].split(' ')[0]}
                    </text>
                    
                    {/* 庫存狀態指示環 */}
                    <circle
                      cx={x}
                      cy={y}
                      r="12"
                      fill="none"
                      stroke={getStatusColor(dealer.status)}
                      strokeWidth="2"
                      strokeDasharray="2,2"
                      opacity="0.5"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* 據點詳情 */}
          <div style={{ width: '300px' }}>
            {selectedDealer ? (
              <div style={{
                background: '#eff6ff',
                borderRadius: '0.75rem',
                padding: '1rem',
                border: '1px solid #bfdbfe'
              }}>
                <h4 style={{ 
                  fontSize: '1.125rem', 
                  fontWeight: '600', 
                  color: '#1f2937',
                  margin: '0 0 1rem 0' 
                }}>
                  {selectedDealer.name}
                </h4>
                
                <div style={{ fontSize: '0.875rem', lineHeight: '1.5' }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>類型:</strong> {selectedDealer.type === 'flagship' ? '旗艦展示中心' : 
                                        selectedDealer.type === 'service' ? '服務中心' : 
                                        selectedDealer.type === 'distribution' ? '配送中心' : '展示中心'}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>地址:</strong> {selectedDealer.address}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>負責人:</strong> {selectedDealer.manager}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>聯絡電話:</strong> {selectedDealer.phone}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>零件庫存:</strong> {selectedDealer.partsStock.toLocaleString()} / {selectedDealer.capacity.toLocaleString()}
                  </p>
                  <p style={{ margin: '0 0 0.5rem 0' }}>
                    <strong>車輛庫存:</strong> {selectedDealer.vehicleStock} 台
                  </p>
                  <p style={{ margin: '0 0 1rem 0' }}>
                    <strong>最後更新:</strong> {selectedDealer.lastUpdate}
                  </p>
                  
                  <div style={{
                    padding: '0.75rem',
                    background: 'white',
                    borderRadius: '0.5rem',
                    border: '1px solid #bfdbfe'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      marginBottom: '0.5rem' 
                    }}>
                      <span>庫存使用率</span>
                      <span style={{ fontWeight: '600' }}>
                        {((selectedDealer.partsStock / selectedDealer.capacity) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div style={{
                      width: '100%',
                      height: '6px',
                      background: '#bfdbfe',
                      borderRadius: '3px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${(selectedDealer.partsStock / selectedDealer.capacity) * 100}%`,
                        height: '100%',
                        background: selectedDealer.status === 'high' ? '#10b981' : 
                                   selectedDealer.status === 'normal' ? '#3b82f6' :
                                   selectedDealer.status === 'low' ? '#f59e0b' : '#ef4444'
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{
                background: '#eff6ff',
                borderRadius: '0.75rem',
                padding: '2rem',
                border: '1px solid #bfdbfe',
                textAlign: 'center',
                color: '#64748b'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
                <p style={{ margin: 0 }}>點擊地圖上的據點<br />查看詳細資訊</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderOverviewTab = () => (
    <div>
      {/* 關鍵指標 */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          title="MG零件總數"
          value={inventoryData.totalParts}
          unit="件"
          icon="🔧"
          trend="up"
          trendValue="+4.2%"
          status="normal"
        />
        <StatCard
          title="零件庫存總值"
          value={inventoryData.totalValue}
          unit="NT$"
          icon="💰"
          trend="up"
          trendValue="+7.8%"
          status="success"
        />
        <StatCard
          title="低庫存零件"
          value={inventoryData.lowStockItems}
          unit="種"
          icon="⚠️"
          trend="down"
          trendValue="-18%"
          status="warning"
        />
        <StatCard
          title="缺料項目"
          value={inventoryData.outOfStockItems}
          unit="種"
          icon="🚫"
          trend="down"
          trendValue="-29%"
          status="danger"
        />
      </div>

      {/* MG零件分類概覽 */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: '2rem'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: '0 0 1.5rem 0' 
        }}>
          MG汽車零件分類庫存
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '1rem'
        }}>
          {inventoryData.categories.map((category, index) => (
            <div key={index} style={{
              padding: '1.25rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              background: '#fef2f2',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#bfdbfe';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#fef2f2';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                  {category.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{category.code}</span>
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: category.status === 'normal' ? '#10b981' : 
                               category.status === 'warning' ? '#f59e0b' : '#ef4444'
                  }} />
                </div>
              </div>
              <p style={{ fontSize: '1.75rem', fontWeight: '700', color: '#1f2937', margin: '0 0 0.5rem 0' }}>
                {category.count.toLocaleString()}
              </p>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                庫存價值: NT$ {(category.value / 1000000).toFixed(1)}M
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* MG生產管理面板 */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: '0 0 1.5rem 0' 
        }}>
          MG生產管理工具
        </h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem'
        }}>
          {[
            { icon: '📦', title: 'MG零件進貨', desc: '新增MG零件入庫記錄', color: '#dc2626' },
            { icon: '🔄', title: '庫存調撥', desc: 'MG據點間零件轉移', color: '#059669' },
            { icon: '📊', title: 'MG庫存報表', desc: '生成MG詳細庫存分析', color: '#8b5cf6' },
            { icon: '🤖', title: 'AI 補貨', desc: 'MG零件智能補貨預測', color: '#f59e0b' },
            { icon: '🚗', title: 'MG車輛調配', desc: 'MG經銷商車輛分配', color: '#ef4444' },
            { icon: '🔍', title: 'MG品質追蹤', desc: 'MG零件品質管控', color: '#10b981' }
          ].map((action, index) => (
            <button key={index} style={{
              padding: '1.25rem',
              border: '1px solid #e5e7eb',
              borderRadius: '0.75rem',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#fef2f2';
              e.currentTarget.style.borderColor = action.color;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
            >
              <div style={{ 
                fontSize: '1.75rem', 
                marginBottom: '0.75rem',
                color: action.color
              }}>
                {action.icon}
              </div>
              <h3 style={{ 
                fontSize: '1rem', 
                fontWeight: '600', 
                color: '#1f2937', 
                margin: '0 0 0.5rem 0' 
              }}>
                {action.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', margin: 0 }}>
                {action.desc}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProductionTab = () => (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: '0 0 0.5rem 0' 
        }}>
          MG汽車生產線管理
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
          追蹤各MG車型的生產進度和品質狀況
        </p>
      </div>

      {productionLines.map(line => (
        <ProductionLineCard key={line.id} line={line} />
      ))}

      {/* MG生產流程圖 */}
      <div style={{
        background: 'white',
        borderRadius: '1rem',
        padding: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginTop: '2rem'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          color: '#1f2937',
          margin: '0 0 1.5rem 0' 
        }}>
          MG汽車生產流程圖
        </h3>
        
        <div style={{ overflowX: 'auto', paddingBottom: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '2rem',
            minWidth: '800px',
            padding: '1rem 0'
          }}>
            {[
              { stage: 'stamping', name: '沖壓作業', icon: '🔨', color: '#6b7280' },
              { stage: 'welding', name: '車身焊接', icon: '⚡', color: '#f59e0b' },
              { stage: 'painting', name: '塗裝作業', icon: '🎨', color: '#8b5cf6' },
              { stage: 'final_assembly', name: '最終組裝', icon: '🔧', color: '#3b82f6' },
              { stage: 'testing', name: '品質檢測', icon: '🔍', color: '#10b981' },
              { stage: 'completed', name: '出廠準備', icon: '✅', color: '#059669' }
            ].map((stage, index, array) => (
              <React.Fragment key={stage.stage}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <div style={{
                    width: '4rem',
                    height: '4rem',
                    borderRadius: '50%',
                    background: `${stage.color}20`,
                    border: `3px solid ${stage.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }}>
                    {stage.icon}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      fontWeight: '600', 
                      color: '#1f2937',
                      margin: '0 0 0.25rem 0' 
                    }}>
                      {stage.name}
                    </p>
                    <p style={{ fontSize: '0.75rem', color: '#64748b', margin: 0 }}>
                      {productionLines.filter(line => line.stage === stage.stage).length} 條產線
                    </p>
                  </div>
                </div>
                
                {index < array.length - 1 && (
                  <div style={{
                    width: '3rem',
                    height: '2px',
                    background: '#e5e7eb',
                    position: 'relative'
                  }}>
                    <div style={{
                      position: 'absolute',
                      right: '-6px',
                      top: '-3px',
                      width: 0,
                      height: 0,
                      borderLeft: '6px solid #e5e7eb',
                      borderTop: '4px solid transparent',
                      borderBottom: '4px solid transparent'
                    }} />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderDealersTab = () => (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start', 
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <div>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            color: '#1f2937',
            margin: '0 0 0.5rem 0' 
          }}>
            MG經銷商據點網絡
          </h2>
          <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
            全台MG汽車經銷商庫存監控與管理
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {['grid', 'list', 'map'].map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              style={{
                padding: '0.5rem 1rem',
                background: viewMode === mode ? '#3b82f6' : 'white',
                color: viewMode === mode ? 'white' : '#64748b',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {mode === 'grid' ? '📦 卡片檢視' : mode === 'list' ? '📋 清單檢視' : '🗺️ 地圖檢視'}
            </button>
          ))}
        </div>
      </div>

      {viewMode === 'map' && <MGTaiwanMap />}

      {viewMode === 'grid' && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '1.5rem'
        }}>
          {inventoryData.dealers.map(dealer => (
            <DealerCard key={dealer.id} dealer={dealer} />
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div style={{
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
              <thead>
                <tr style={{ background: '#fef2f2' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    MG據點資訊
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    類型/位置
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    庫存狀態
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    零件庫存
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    車輛庫存
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    使用率
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: '#374151', fontSize: '0.875rem', borderBottom: '1px solid #bfdbfe' }}>
                    聯絡資訊
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.dealers.map(dealer => {
                  const stockPercentage = (dealer.partsStock / dealer.capacity) * 100;
                  const getStatusInfo = (status) => {
                    switch (status) {
                      case 'high': return { label: '庫存充足', color: '#10b981' };
                      case 'normal': return { label: '庫存正常', color: '#3b82f6' };
                      case 'low': return { label: '庫存偏低', color: '#f59e0b' };
                      case 'critical': return { label: '急需補貨', color: '#ef4444' };
                      default: return { label: '未知', color: '#6b7280' };
                    }
                  };
                  const statusInfo = getStatusInfo(dealer.status);

                  return (
                    <tr 
                      key={dealer.id} 
                      style={{ 
                        borderBottom: '1px solid #bfdbfe',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={() => setSelectedDealer(dealer)}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div>
                          <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
                            {dealer.name}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            ID: {dealer.id}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div>
                          <div style={{ marginBottom: '0.25rem' }}>
                            {dealer.type === 'flagship' ? '🏢 旗艦展示中心' : 
                             dealer.type === 'showroom' ? '🚗 展示中心' : 
                             dealer.type === 'service' ? '🔧 服務中心' : '🚛 配送中心'}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                            {dealer.location}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          background: `${statusInfo.color}20`,
                          color: statusInfo.color
                        }}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                          {dealer.partsStock.toLocaleString()}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          / {dealer.capacity.toLocaleString()}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div style={{ fontWeight: '600', color: '#1f2937' }}>
                          {dealer.vehicleStock} 台
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '60px',
                            height: '6px',
                            background: '#fecaca',
                            borderRadius: '3px',
                            overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${stockPercentage}%`,
                              height: '100%',
                              background: statusInfo.color
                            }} />
                          </div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#1f2937' }}>
                            {stockPercentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div style={{ marginBottom: '0.25rem' }}>
                          {dealer.manager}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {dealer.phone}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      {/* 全局樣式 */}
      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{ padding: '1.5rem' }}>
        {/* 頁面標題 */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: '700', 
            color: '#1f2937',
            margin: '0 0 0.5rem 0' 
          }}>
            🚗 MG汽車製造管理中心
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.125rem', margin: 0 }}>
            MG汽車零件庫存管理、生產線追蹤、全台經銷商網絡監控
          </p>
        </div>

        {/* 標籤導航 */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          borderBottom: '1px solid #e5e7eb',
          paddingBottom: '1rem',
          flexWrap: 'wrap'
        }}>
          <TabButton
            id="overview"
            label="庫存總覽"
            icon="📊"
            active={activeTab === 'overview'}
            onClick={setActiveTab}
          />
          <TabButton
            id="production"
            label="生產線"
            icon="🏭"
            active={activeTab === 'production'}
            onClick={setActiveTab}
          />
          <TabButton
            id="dealers"
            label="經銷網絡"
            icon="🗺️"
            active={activeTab === 'dealers'}
            onClick={setActiveTab}
          />
        </div>

        {/* 標籤內容 */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'production' && renderProductionTab()}
        {activeTab === 'dealers' && renderDealersTab()}
      </div>
    </Layout>
  );
};

export default MGInventoryManagementPage;