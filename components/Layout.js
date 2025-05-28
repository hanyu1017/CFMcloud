import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// 簡潔的 SVG 圖標組件
const Icons = {
  Dashboard: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
  ),
  Monitor: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  ),
  Factory: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 21H2v-2h1V9l7 3v7h4v-7l7-3v10h1v2zM6 10.47L12 8l6 2.47V19h-5v-7H7v7H6V10.47z"/>
    </svg>
  ),
  Alert: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  ),
  Orders: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6zm2.5-9H18V0h-2v2H8V0H6v2H4.5C3.67 2 3 2.67 3 3.5v17C3 21.33 3.67 22 4.5 22h15c.83 0 1.5-.67 1.5-1.5v-17C21 2.67 20.33 2 19.5 2z"/>
    </svg>
  ),
  Maintenance: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  ),
  Staff: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.5 1.5 0 0 0 18.54 7H16.5c-.8 0-1.54.5-1.85 1.26l-1.92 5.63c-.24.7.28 1.46 1.05 1.46H15v8h1v-2.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V22h1zM12.5 11.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9l-1.5-3.2c-.28-.65-.9-1.08-1.62-1.08S4.8 11.15 4.5 11.8L3 15h1.5v7h1v-2.5c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5V22h1z"/>
    </svg>
  ),
  Reports: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
    </svg>
  ),
  Efficiency: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  ),
  Costs: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
    </svg>
  ),
  Models: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  Permissions: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1V8z"/>
    </svg>
  ),
  CarbonAsset: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8h3v12h-3v-12zM12 4h3v16h-3v-16zM7 12h3v8h-3v-8zM3 9h2v10h-2v-10z"/>
    </svg>
  )
};

// 側邊欄組件 - 現代化簡約設計
const Sidebar = ({ isCollapsed, onToggle, currentPath, darkMode }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const menuItems = [
    {
      category: '監控總覽',
      items: [
        { icon: 'Dashboard', label: '儀表板', path: '/dashboard' },
        { icon: 'Monitor', label: '即時監控', path: '/monitor' },
        { icon: 'Factory', label: '工廠狀態', path: '/factories' },
      ]
    },
    {
      category: '營運管理',
      items: [
        { icon: 'Alert', label: '警報中心', path: '/alerts' },
        { icon: 'Orders', label: '工單管理', path: '/work-orders' },
        { icon: 'Maintenance', label: '設備維護', path: '/maintenance' },
        { icon: 'Staff', label: '人員調度', path: '/staff' },
        { icon: 'CarbonAsset', label: '碳資產管理', path: '/carbon-assets' 
        },
      ]
    },
    {
      category: '數據分析',
      items: [
        { icon: 'Reports', label: '生產報表', path: '/reports' },
        { icon: 'Efficiency', label: '效率分析', path: '/efficiency' },
        { icon: 'Costs', label: '成本分析', path: '/costs' },
        { icon: 'Models', label: '決策模型', path: '/models' },
      ]
    },
    {
      category: '系統管理',
      items: [
        { icon: 'Settings', label: '系統設定', path: '/settings' },
        { icon: 'Users', label: '用戶管理', path: '/users' },
        { icon: 'Permissions', label: '權限管理', path: '/permissions' },
        { icon: 'Monitor', label: 'n8n 服務', path: '/n8n' }, // 新增 n8n 的連結
      ]
    }
  ];

  const sidebarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: isCollapsed || isMobile ? (isMobile ? '240px' : '50px') : '180px',
    background: darkMode 
      ? 'linear-gradient(180deg, #111827 0%, #1f2937 100%)' 
      : 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    color: darkMode ? '#ffffff' : '#1e293b',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    borderRight: `1px solid ${darkMode ? '#374151' : '#e2e8f0'}`,
    overflow: 'hidden',
    transform: isMobile 
      ? (isCollapsed ? 'translateX(-100%)' : 'translateX(0)') 
      : 'translateX(0)',
    boxShadow: darkMode 
      ? '4px 0 24px rgba(0, 0, 0, 0.3)' 
      : '4px 0 24px rgba(0, 0, 0, 0.06)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: (isCollapsed && !isMobile) ? 'center' : 'space-between',
    padding: (isCollapsed && !isMobile) ? '0.75rem 0' : '0.75rem 0.875rem',
    borderBottom: `1px solid ${darkMode ? '#374151' : '#e2e8f0'}`,
    minHeight: '48px',
    background: darkMode 
      ? 'linear-gradient(135deg, #1f2937 0%, #374151 100%)' 
      : 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    opacity: (isCollapsed && !isMobile) ? 0 : 1,
    transition: 'opacity 0.3s ease'
  };

  const toggleButtonStyle = {
    width: '28px',
    height: '28px',
    border: 'none',
    borderRadius: '4px',
    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    color: darkMode ? '#d1d5db' : '#64748b',
    position: (isCollapsed && !isMobile) ? 'absolute' : 'static',
    top: (isCollapsed && !isMobile) ? '10px' : 'auto',
    left: (isCollapsed && !isMobile) ? '50%' : 'auto',
    transform: (isCollapsed && !isMobile) ? 'translateX(-50%)' : 'none'
  };

  const navStyle = {
    padding: (isCollapsed && !isMobile) ? '0.5rem 0.25rem' : '0.625rem 0.25rem',
    height: 'calc(100vh - 48px)',
    overflowY: 'auto',
    overflowX: 'hidden'
  };

  const categoryStyle = {
    marginBottom: (isCollapsed && !isMobile) ? '0' : '0.875rem'
  };

  const categoryTitleStyle = {
    fontSize: '0.625rem',
    fontWeight: '600',
    color: darkMode ? '#9ca3af' : '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: (isCollapsed && !isMobile) ? '0' : '0.375rem',
    padding: (isCollapsed && !isMobile) ? '0' : '0 0.625rem',
    opacity: (isCollapsed && !isMobile) ? 0 : 1,
    transition: 'all 0.3s ease',
    height: (isCollapsed && !isMobile) ? '0' : 'auto',
    overflow: 'hidden'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: (isCollapsed && !isMobile) ? '0.375rem' : '0.5rem 0.625rem',
    marginBottom: '0.125rem',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    color: isActive 
      ? (darkMode ? '#ffffff' : '#ffffff') 
      : (darkMode ? '#d1d5db' : '#64748b'),
    fontWeight: isActive ? '600' : '500',
    fontSize: '0.8125rem',
    background: isActive 
      ? 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)' 
      : 'transparent',
    justifyContent: (isCollapsed && !isMobile) ? 'center' : 'flex-start',
    minHeight: '32px',
    position: 'relative',
    boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none'
  });

  const iconStyle = {
    marginRight: (isCollapsed && !isMobile) ? 0 : '0.625rem',
    flexShrink: 0,
    transition: 'all 0.2s ease'
  };

  const labelStyle = {
    opacity: (isCollapsed && !isMobile) ? 0 : 1,
    transition: 'opacity 0.3s ease',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontWeight: 'inherit'
  };

  const handleNavClick = (path) => {
    if (isMobile) {
      onToggle();
    }
    router.push(path);
  };

  const isCurrentPath = (itemPath) => {
    if (currentPath === itemPath) return true;
    if (currentPath && itemPath && currentPath.includes(itemPath) && itemPath !== '/') return true;
    return false;
  };

  return (
    <div style={sidebarStyle}>
      <div style={headerStyle}>
        <div style={logoContainerStyle}>
          <div style={{ 
            fontSize: '1.125rem', 
            marginRight: '0.5rem',
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            🏭
          </div>
          <div>
            <h2 style={{ 
              fontSize: '0.8125rem', 
              fontWeight: '700', 
              margin: 0,
              color: darkMode ? '#ffffff' : '#1e293b'
            }}>
              智慧工廠
            </h2>
            <p style={{ 
              fontSize: '0.625rem', 
              color: darkMode ? '#9ca3af' : '#94a3b8', 
              margin: 0 
            }}>
              監控系統
            </p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          style={toggleButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)';
            e.target.style.transform = (isCollapsed && !isMobile) ? 'translateX(-50%) scale(1.05)' : 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)';
            e.target.style.transform = (isCollapsed && !isMobile) ? 'translateX(-50%)' : 'none';
          }}
        >
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
          </svg>
        </button>
      </div>

      <nav style={navStyle}>
        {menuItems.map((category, categoryIndex) => (
          <div key={categoryIndex} style={categoryStyle}>
            <div style={categoryTitleStyle}>
              {category.category}
            </div>
            {category.items.map((item, itemIndex) => {
              const isActive = isCurrentPath(item.path);
              const IconComponent = Icons[item.icon];
              return (
                <div
                  key={itemIndex}
                  style={menuItemStyle(isActive)}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div style={iconStyle}>
                    <IconComponent />
                  </div>
                  <span style={labelStyle}>{item.label}</span>
                  
                  {isActive && !(isCollapsed && !isMobile) && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '3px',
                      height: '16px',
                      backgroundColor: '#ffffff',
                      borderRadius: '0 2px 2px 0'
                    }}></div>
                  )}
                  
                  {isActive && (isCollapsed && !isMobile) && (
                    <div style={{
                      position: 'absolute',
                      right: '4px',
                      top: '4px',
                      width: '4px',
                      height: '4px',
                      backgroundColor: '#ffffff',
                      borderRadius: '50%'
                    }}></div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

// 通知對話框組件 - 簡約設計
const NotificationDialog = ({ isOpen, onClose, darkMode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const notifications = [
    { id: 1, type: 'warning', title: '設備警報', message: '台北工廠 A區生產線溫度異常', time: '5分鐘前' },
    { id: 2, type: 'info', title: '系統更新', message: '系統將於今晚11點進行維護更新', time: '1小時前' },
    { id: 3, type: 'success', title: '報表完成', message: '月度生產效率報表已生成完成', time: '2小時前' },
    { id: 4, type: 'error', title: '連線異常', message: '高雄工廠數據連線中斷', time: '3小時前' }
  ];

  if (!isOpen) return null;

  const getTypeColor = (type) => {
    const colors = {
      warning: '#f59e0b',
      info: '#2563eb',
      success: '#059669',
      error: '#dc2626'
    };
    return colors[type] || '#6b7280';
  };

  const dialogStyle = {
    position: 'fixed',
    top: isMobile ? '48px' : '52px',
    right: isMobile ? '8px' : '16px',
    left: isMobile ? '8px' : 'auto',
    width: isMobile ? 'auto' : '320px',
    maxWidth: isMobile ? 'calc(100vw - 16px)' : '320px',
    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
    borderRadius: '6px',
    boxShadow: darkMode 
      ? '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)' 
      : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    zIndex: 50,
    maxHeight: isMobile ? '70vh' : '320px',
    overflow: 'hidden'
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-20 z-40"
        onClick={onClose}
        style={{ backdropFilter: 'blur(2px)' }}
      />
      <div style={dialogStyle}>
        <div style={{ 
          padding: '0.75rem 0.875rem', 
          borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          backgroundColor: darkMode ? '#374151' : '#f8fafc'
        }}>
          <div className="flex items-center justify-between">
            <h3 style={{ 
              fontSize: '0.8125rem',
              fontWeight: '600', 
              color: darkMode ? '#ffffff' : '#1f2937',
              margin: 0
            }}>
              通知中心
            </h3>
            <button 
              onClick={onClose}
              style={{
                color: darkMode ? '#9ca3af' : '#6b7280',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.25rem',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div style={{ 
          overflowY: 'auto', 
          maxHeight: isMobile ? 'calc(70vh - 80px)' : '220px'
        }}>
          {notifications.map((notification, index) => (
            <div 
              key={notification.id} 
              style={{
                padding: '0.75rem 0.875rem',
                borderBottom: index < notifications.length - 1 ? `1px solid ${darkMode ? '#374151' : '#f3f4f6'}` : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: getTypeColor(notification.type),
                    marginTop: '6px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: darkMode ? '#ffffff' : '#1f2937',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.4'
                  }}>
                    {notification.title}
                  </h4>
                  <p style={{
                    fontSize: '0.6875rem',
                    color: darkMode ? '#d1d5db' : '#6b7280',
                    margin: '0 0 0.375rem 0',
                    lineHeight: '1.4',
                    wordBreak: 'break-word'
                  }}>
                    {notification.message}
                  </p>
                  <p style={{
                    fontSize: '0.625rem',
                    color: darkMode ? '#9ca3af' : '#9ca3b8',
                    margin: 0
                  }}>
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ 
          padding: '0.625rem', 
          borderTop: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`, 
          textAlign: 'center',
          backgroundColor: darkMode ? '#374151' : '#f8fafc'
        }}>
          <button style={{
            fontSize: '0.6875rem',
            color: '#2563eb',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            padding: '0.25rem'
          }}>
            查看全部通知
          </button>
        </div>
      </div>
    </>
  );
};

// 頁面標題組件
const PageIndicator = ({ currentPath, darkMode }) => {
  const getPageTitle = (path) => {
    const pathMap = {
      '/dashboard': '儀表板',
      '/monitor': '即時監控',
      '/factories': '工廠狀態',
      '/alerts': '警報中心',
      '/work-orders': '工單管理',
      '/maintenance': '設備維護',
      '/staff': '人員調度',
      '/reports': '生產報表',
      '/efficiency': '效率分析',
      '/costs': '成本分析',
      '/models': '決策模型',
      '/settings': '系統設定',
      '/users': '用戶管理',
      '/permissions': '權限管理'
    };
    return pathMap[path] || '首頁';
  };

  return (
    <div style={{
      fontSize: '0.75rem',
      color: darkMode ? '#9ca3af' : '#64748b',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.375rem'
    }}>
      
    </div>
  );
};

// 主要 Layout 組件 - 現代化簡約版
const Layout = ({ children, currentPath = '/dashboard' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(undefined);
  const [darkMode, setDarkMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showNotifications, setShowNotifications] = useState(false);
  const [realCurrentPath, setRealCurrentPath] = useState(currentPath);
  const [currentUser] = useState({
    name: '張經理',
    role: '系統管理員',
    avatar: 'ZM'
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handlePathChange = () => {
      setRealCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  useEffect(() => {
    setRealCurrentPath(window.location.pathname || currentPath);
  }, [currentPath]);

  const formatTime = (date) => {
    return date.toLocaleString('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const mainContentStyle = {
    marginLeft: isMobile ? 0 : (sidebarCollapsed ? '50px' : '180px'),
    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: darkMode ? '#111827' : '#f8fafc'
  };

  const headerStyle = {
    height: '48px',
    background: darkMode 
      ? 'linear-gradient(135deg, #1f2937 0%, #374151 100%)' 
      : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderBottom: `1px solid ${darkMode ? '#374151' : '#e2e8f0'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 0.75rem' : '0 1rem',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: darkMode 
      ? '0 1px 3px rgba(0, 0, 0, 0.2)' 
      : '0 1px 3px rgba(0, 0, 0, 0.04)'
  };

  const actionButtonStyle = {
    width: isMobile ? '36px' : '32px',
    height: isMobile ? '36px' : '32px',
    border: 'none',
    borderRadius: '4px',
    background: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.15s ease',
    color: darkMode ? '#d1d5db' : '#64748b'
  };

  if (isMobile === undefined) return null;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#f8fafc',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPath={realCurrentPath}
        darkMode={darkMode}
      />

      <div style={mainContentStyle}>
        <header style={headerStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '0.75rem' }}>
            {/* 手機版選單按鈕 */}
            {isMobile && (
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  borderRadius: '4px',
                  background: darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                  color: darkMode ? '#d1d5db' : '#64748b'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </button>
            )}
            
            {!isMobile && <PageIndicator currentPath={realCurrentPath} darkMode={darkMode} />}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '0.625rem' }}>
            {/* 時間顯示 */}
            <div style={{ 
              fontSize: '0.75rem', 
              color: darkMode ? '#d1d5db' : '#475569',
              fontWeight: '500'
            }}>
              {formatTime(currentTime)}
            </div>

            {/* 暗黑模式切換 */}
            <button 
              style={actionButtonStyle}
              onClick={() => setDarkMode(!darkMode)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {darkMode ? (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              ) : (
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>

            {/* 通知按鈕 */}
            <button 
              style={actionButtonStyle}
              onClick={() => setShowNotifications(!showNotifications)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.15)' : '#e2e8f0';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? 'rgba(255, 255, 255, 0.1)' : '#f1f5f9';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <div style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '6px',
                height: '6px',
                background: '#dc2626',
                borderRadius: '50%',
                border: `1px solid ${darkMode ? '#1f2937' : '#ffffff'}`
              }}></div>
            </button>

            {/* 用戶資訊 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem' 
            }}>
              {!isMobile && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: darkMode ? '#ffffff' : '#1e293b'
                  }}>
                    {currentUser.name}
                  </div>
                  <div style={{
                    fontSize: '0.625rem',
                    color: darkMode ? '#9ca3af' : '#64748b'
                  }}>
                    {currentUser.role}
                  </div>
                </div>
              )}
              
              <div style={{
                width: isMobile ? '36px' : '32px',
                height: isMobile ? '36px' : '32px',
                borderRadius: '6px',
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.75rem',
                cursor: 'pointer',
                transition: 'transform 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
              >
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </header>

        {isMobile && (
          <div style={{
            padding: '0.5rem 0.75rem',
            background: darkMode ? '#1f2937' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`
          }}>
            <PageIndicator currentPath={realCurrentPath} darkMode={darkMode} />
          </div>
        )}

        <main style={{
          flex: 1,
          padding: isMobile ? '0.75rem' : '1rem',
          backgroundColor: darkMode ? '#111827' : '#f8fafc'
        }}>
          {children}
        </main>
      </div>

      <NotificationDialog 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        darkMode={darkMode}
      />

      {/* 手機版遮罩 - 只有當側邊欄展開時才顯示 */}
      {isMobile && !sidebarCollapsed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            zIndex: 999,
            backdropFilter: 'blur(2px)'
          }}
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  );
};

export default Layout;