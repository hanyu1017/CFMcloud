import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 新增

// 側邊欄組件
const Sidebar = ({ isCollapsed, onToggle, currentPath }) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); // 新增

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
      category: '總覽',
      items: [
        { icon: '📊', label: '儀表板', path: '/dashboard' },
        { icon: '📈', label: '即時監控', path: '/monitor' },
        { icon: '🏭', label: '工廠狀態', path: '/factories' },
      ]
    },
    {
      category: '監控管理',
      items: [
        { icon: '⚠️', label: '警報中心', path: '/alerts' },
        { icon: '📋', label: '工單管理', path: '/work-orders' },
        { icon: '🔧', label: '設備維護', path: '/maintenance' },
        { icon: '👥', label: '人員調度', path: '/staff' },
      ]
    },
    {
      category: '數據分析',
      items: [
        { icon: '📊', label: '生產報表', path: '/reports' },
        { icon: '📈', label: '效率分析', path: '/efficiency' },
        { icon: '💰', label: '成本分析', path: '/costs' },
        { icon: '🧠', label: '決策模型', path: '/models' },
      ]
    },
    {
      category: '系統設定',
      items: [
        { icon: '⚙️', label: '系統設定', path: '/settings' },
        { icon: '👤', label: '用戶管理', path: '/users' },
        { icon: '🔐', label: '權限管理', path: '/permissions' },
      ]
    }
  ];

  const sidebarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: isCollapsed || isMobile ? (isMobile ? '280px' : '64px') : '240px',
    background: '#ffffff',
    color: '#374151',
    transition: 'all 0.3s ease',
    zIndex: 1000,
    borderRight: '1px solid #e5e7eb',
    overflow: 'hidden',
    transform: (isMobile && isCollapsed) ? 'translateX(-100%)' : 'translateX(0)',
    boxShadow: '2px 0 12px rgba(0, 0, 0, 0.08)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: (isCollapsed && !isMobile) ? 'center' : 'space-between',
    padding: (isCollapsed && !isMobile) ? '1rem 0' : '1rem 1.25rem',
    borderBottom: '1px solid #e5e7eb',
    minHeight: '64px',
    background: '#f8fafc'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    opacity: (isCollapsed && !isMobile) ? 0 : 1,
    transition: 'opacity 0.3s ease'
  };

  const toggleButtonStyle = {
    width: isMobile ? '40px' : '36px',
    height: isMobile ? '40px' : '36px',
    border: 'none',
    borderRadius: '8px',
    background: '#e2e8f0',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    color: '#475569',
    position: (isCollapsed && !isMobile) ? 'absolute' : 'static',
    top: (isCollapsed && !isMobile) ? '1rem' : 'auto',
    left: (isCollapsed && !isMobile) ? '50%' : 'auto',
    transform: (isCollapsed && !isMobile) ? 'translateX(-50%)' : 'none'
  };

  const navStyle = {
    padding: (isCollapsed && !isMobile) ? '0.75rem 0.5rem' : '1rem 1.25rem',
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin'
  };

  const categoryStyle = {
    marginBottom: (isCollapsed && !isMobile) ? '0' : '1.5rem'
  };

  const categoryTitleStyle = {
    fontSize: isMobile ? '0.8rem' : '0.75rem',
    fontWeight: '600',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: (isCollapsed && !isMobile) ? '0' : '0.75rem',
    padding: (isCollapsed && !isMobile) ? '0' : '0 0.5rem',
    opacity: (isCollapsed && !isMobile) ? 0 : 1,
    transition: 'all 0.3s ease',
    height: (isCollapsed && !isMobile) ? '0' : 'auto',
    overflow: 'hidden'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: (isCollapsed && !isMobile) ? '0.5rem' : (isMobile ? '0.75rem 0.5rem' : '0.5rem 0.5rem'), // 更小的 padding
    marginBottom: '0.25rem',
    borderRadius: '8px', // 更小的圓角
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#6b7280',
    fontWeight: isActive ? '600' : '500',
    fontSize: isMobile ? '0.9rem' : '0.8rem', // 更小的字體
    background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
    justifyContent: (isCollapsed && !isMobile) ? 'center' : 'flex-start',
    minHeight: isMobile ? '40px' : '32px', // 更小的高度
    position: 'relative',
    boxShadow: isActive ? '0 2px 6px rgba(59, 130, 246, 0.18)' : 'none',
    transform: isActive ? 'scale(1.01)' : 'scale(1)',
    border: isActive ? '2px solid rgba(255, 255, 255, 0.18)' : '2px solid transparent'
  });

  const iconStyle = {
    fontSize: isMobile ? '1.1rem' : '1rem', // 更小的 icon
    marginRight: (isCollapsed && !isMobile) ? 0 : (isMobile ? '0.7rem' : '0.5rem'),
    flexShrink: 0,
    width: (isCollapsed && !isMobile) ? 'auto' : '16px',
    textAlign: 'center',
    transition: 'all 0.25s ease'
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
    router.push(path); // ← 用 Next.js router 導向
  };

  // 檢查當前路徑是否匹配
  const isCurrentPath = (itemPath) => {
    // 更精確的路徑匹配
    if (currentPath === itemPath) return true;
    if (currentPath && itemPath && currentPath.includes(itemPath) && itemPath !== '/') return true;
    return false;
  };

  return (
    <div style={sidebarStyle}>
      {/* 標題區域 */}
      <div style={headerStyle}>
        <div style={logoContainerStyle}>
          <div style={{ fontSize: isMobile ? '1.5rem' : '1.25rem', marginRight: '0.75rem' }}>🏭</div>
          <div>
            <h2 style={{ 
              fontSize: isMobile ? '1.125rem' : '1rem', 
              fontWeight: '700', 
              margin: 0,
              color: '#1e293b'
            }}>
              智慧工廠
            </h2>
            <p style={{ 
              fontSize: isMobile ? '0.8rem' : '0.75rem', 
              color: '#64748b', 
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
            e.target.style.backgroundColor = '#cbd5e1';
            e.target.style.transform = (isCollapsed && !isMobile) ? 'translateX(-50%) scale(1.05)' : 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#e2e8f0';
            e.target.style.transform = (isCollapsed && !isMobile) ? 'translateX(-50%)' : 'none';
          }}
        >
          <svg width={isMobile ? "18" : "16"} height={isMobile ? "18" : "16"} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
          </svg>
        </button>
      </div>

      {/* 導航選單 */}
      <nav style={navStyle}>
        {menuItems.map((category, categoryIndex) => (
          <div key={categoryIndex} style={categoryStyle}>
            <div style={categoryTitleStyle}>
              {category.category}
            </div>
            {category.items.map((item, itemIndex) => {
              const isActive = isCurrentPath(item.path);
              return (
                <div
                  key={itemIndex}
                  style={menuItemStyle(isActive)}
                  onClick={() => handleNavClick(item.path)}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = '#f1f5f9';
                      e.target.style.transform = 'scale(1.01)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.transform = 'scale(1)';
                    }
                  }}
                >
                  <span style={iconStyle}>{item.icon}</span>
                  <span style={labelStyle}>{item.label}</span>
                  
                  {/* 當前頁面指示器 */}
                  {isActive && !(isCollapsed && !isMobile) && (
                    <div style={{
                      position: 'absolute',
                      left: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '4px',
                      height: '28px',
                      backgroundColor: '#ffffff',
                      borderRadius: '0 4px 4px 0',
                      boxShadow: '0 2px 4px rgba(255, 255, 255, 0.3)'
                    }}></div>
                  )}
                  
                  {/* 收合狀態下的圓點指示器 */}
                  {isActive && (isCollapsed && !isMobile) && (
                    <div style={{
                      position: 'absolute',
                      right: '8px',
                      top: '8px',
                      width: '6px',
                      height: '6px',
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

// 通知對話框組件 - 增強移動端體驗
const NotificationDialog = ({ isOpen, onClose }) => {
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
      info: '#3b82f6',
      success: '#10b981',
      error: '#ef4444'
    };
    return colors[type] || '#6b7280';
  };

  const dialogStyle = {
    position: 'fixed',
    top: isMobile ? '64px' : '68px',
    right: isMobile ? '8px' : '16px',
    left: isMobile ? '8px' : 'auto',
    width: isMobile ? 'auto' : '360px',
    maxWidth: isMobile ? 'calc(100vw - 16px)' : '360px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    border: '1px solid #e5e7eb',
    zIndex: 50,
    maxHeight: isMobile ? '70vh' : '400px',
    overflow: 'hidden'
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 z-40"
        onClick={onClose}
        style={{ backdropFilter: 'blur(2px)' }}
      />
      <div style={dialogStyle}>
        <div style={{ 
          padding: isMobile ? '1.25rem' : '1rem', 
          borderBottom: '1px solid #e5e7eb',
          backgroundColor: '#f8fafc'
        }}>
          <div className="flex items-center justify-between">
            <h3 style={{ 
              fontSize: isMobile ? '1.125rem' : '1rem',
              fontWeight: '600', 
              color: '#1f2937',
              margin: 0
            }}>
              通知中心
            </h3>
            <button 
              onClick={onClose}
              style={{
                color: '#6b7280',
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
                e.target.style.backgroundColor = '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <svg style={{ width: isMobile ? '24px' : '20px', height: isMobile ? '24px' : '20px' }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
              </svg>
            </button>
          </div>
        </div>
        
        <div style={{ 
          overflowY: 'auto', 
          maxHeight: isMobile ? 'calc(70vh - 120px)' : '300px'
        }}>
          {notifications.map((notification, index) => (
            <div 
              key={notification.id} 
              style={{
                padding: isMobile ? '1.25rem' : '1rem',
                borderBottom: index < notifications.length - 1 ? '1px solid #f3f4f6' : 'none',
                cursor: 'pointer',
                transition: 'background-color 0.15s ease',
                minHeight: isMobile ? '80px' : '70px'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f9fafb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              <div className="flex items-start space-x-3">
                <div 
                  style={{
                    width: isMobile ? '10px' : '8px',
                    height: isMobile ? '10px' : '8px',
                    borderRadius: '50%',
                    backgroundColor: getTypeColor(notification.type),
                    marginTop: isMobile ? '8px' : '6px',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: isMobile ? '0.95rem' : '0.875rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    margin: '0 0 0.25rem 0',
                    lineHeight: '1.4'
                  }}>
                    {notification.title}
                  </h4>
                  <p style={{
                    fontSize: isMobile ? '0.875rem' : '0.8125rem',
                    color: '#6b7280',
                    margin: '0 0 0.5rem 0',
                    lineHeight: '1.4',
                    wordBreak: 'break-word'
                  }}>
                    {notification.message}
                  </p>
                  <p style={{
                    fontSize: isMobile ? '0.8125rem' : '0.75rem',
                    color: '#9ca3af',
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
          padding: isMobile ? '1rem' : '0.75rem', 
          borderTop: '1px solid #e5e7eb', 
          textAlign: 'center',
          backgroundColor: '#f8fafc'
        }}>
          <button style={{
            fontSize: isMobile ? '0.875rem' : '0.8125rem',
            color: '#3b82f6',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            padding: isMobile ? '0.5rem' : '0.25rem'
          }}>
            查看全部通知
          </button>
        </div>
      </div>
    </>
  );
};

// 頁面標題組件 - 顯示當前頁面
const PageIndicator = ({ currentPath }) => {
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
      fontSize: '0.875rem',
      color: '#6b7280',
      fontWeight: '500',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    }}>
      <span>目前位置:</span>
      <span style={{ color: '#3b82f6', fontWeight: '600' }}>
        {getPageTitle(currentPath)}
      </span>
    </div>
  );
};

// 更新的 Layout 組件
const Layout = ({ children, currentPath = '/dashboard' }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  // 監聽路徑變化
  useEffect(() => {
    const handlePathChange = () => {
      setRealCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePathChange);
    return () => window.removeEventListener('popstate', handlePathChange);
  }, []);

  // 初始化當前路徑
  useEffect(() => {
    setRealCurrentPath(window.location.pathname || currentPath);
  }, [currentPath]);

  const formatTime = (date) => {
    return date.toLocaleString('zh-TW', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const mainContentStyle = {
    marginLeft: isMobile ? 0 : (sidebarCollapsed ? '64px' : '240px'),
    transition: 'margin-left 0.3s ease',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: darkMode ? '#1f2937' : '#f9fafb'
  };

  const headerStyle = {
    height: '64px',
    background: darkMode ? '#374151' : '#ffffff',
    borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: isMobile ? '0 1rem' : '0 1.5rem',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
  };

  const searchInputStyle = {
    width: isMobile ? '160px' : '260px',
    padding: isMobile ? '0.625rem 0.75rem 0.625rem 2.75rem' : '0.5rem 0.75rem 0.5rem 2.5rem',
    border: `1px solid ${darkMode ? '#4b5563' : '#d1d5db'}`,
    borderRadius: '8px',
    fontSize: isMobile ? '16px' : '0.875rem', // 16px prevents zoom on iOS
    outline: 'none',
    background: darkMode ? '#4b5563' : '#ffffff',
    color: darkMode ? '#ffffff' : '#374151',
    transition: 'border-color 0.15s ease'
  };

  const actionButtonStyle = {
    width: isMobile ? '44px' : '40px',
    height: isMobile ? '44px' : '40px',
    border: 'none',
    borderRadius: '8px',
    background: darkMode ? '#4b5563' : '#f3f4f6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.15s ease',
    color: darkMode ? '#d1d5db' : '#6b7280'
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      {/* 側邊欄 */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        currentPath={realCurrentPath}
      />

      {/* 主內容區域 */}
      <div style={mainContentStyle}>
        {/* 頂部表頭 */}
        <header style={headerStyle}>
          {/* 左側：頁面指示器和搜尋框 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1rem' }}>
            {!isMobile && <PageIndicator currentPath={realCurrentPath} />}
            
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="搜尋..."
                style={searchInputStyle}
                onFocus={(e) => {
                  e.target.style.borderColor = '#3b82f6';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = darkMode ? '#4b5563' : '#d1d5db';
                }}
              />
              <svg
                style={{
                  position: 'absolute',
                  left: isMobile ? '0.875rem' : '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}
                width={isMobile ? "18" : "16"} 
                height={isMobile ? "18" : "16"} 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
            </div>
          </div>

          {/* 右側：操作按鈕和用戶信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.75rem' : '1rem' }}>
            {/* 時間顯示 - 移動端隱藏 */}
            {!isMobile && (
              <div style={{ 
                fontSize: '0.875rem', 
                color: darkMode ? '#d1d5db' : '#374151',
                fontWeight: '500'
              }}>
                {formatTime(currentTime)}
              </div>
            )}

            {/* 暗黑模式切換 */}
            <button 
              style={actionButtonStyle}
              onClick={() => setDarkMode(!darkMode)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? '#6b7280' : '#e5e7eb';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? '#4b5563' : '#f3f4f6';
                e.target.style.transform = 'scale(1)';
              }}
            >
              {darkMode ? (
                <svg width={isMobile ? "20" : "18"} height={isMobile ? "20" : "18"} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/>
                </svg>
              ) : (
                <svg width={isMobile ? "20" : "18"} height={isMobile ? "20" : "18"} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/>
                </svg>
              )}
            </button>

            {/* 通知按鈕 */}
            <button 
              style={actionButtonStyle}
              onClick={() => setShowNotifications(!showNotifications)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? '#6b7280' : '#e5e7eb';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? '#4b5563' : '#f3f4f6';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg width={isMobile ? "20" : "18"} height={isMobile ? "20" : "18"} fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <div style={{
                position: 'absolute',
                top: isMobile ? '10px' : '8px',
                right: isMobile ? '10px' : '8px',
                width: isMobile ? '8px' : '6px',
                height: isMobile ? '8px' : '6px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '1px solid white'
              }}></div>
            </button>

            {/* 用戶資訊 */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem' 
            }}>
              {/* 用戶文字信息 - 移動端隱藏 */}
              {!isMobile && (
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: darkMode ? '#ffffff' : '#1f2937'
                  }}>
                    {currentUser.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: darkMode ? '#9ca3af' : '#6b7280'
                  }}>
                    {currentUser.role}
                  </div>
                </div>
              )}
              
              <div style={{
                width: isMobile ? '44px' : '40px',
                height: isMobile ? '44px' : '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: isMobile ? '1rem' : '0.875rem',
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

        {/* 移動端頁面指示器 */}
        {isMobile && (
          <div style={{
            padding: '0.75rem 1rem',
            background: darkMode ? '#374151' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? '#4b5563' : '#e5e7eb'}`
          }}>
            <PageIndicator currentPath={realCurrentPath} />
          </div>
        )}

        {/* 主內容區 */}
        <main style={{
          flex: 1,
          padding: isMobile ? '1rem' : '1.5rem',
          backgroundColor: darkMode ? '#1f2937' : '#f9fafb'
        }}>
          {children}
        </main>
      </div>

      {/* 通知對話框 */}
      <NotificationDialog 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* 移動端遮罩 */}
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