import React, { useState, useEffect } from 'react';

// 側邊欄組件
const Sidebar = ({ isCollapsed, onToggle }) => {
  const [isMobile, setIsMobile] = useState(false);

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
        { icon: '📊', label: '儀表板', path: '/dashboard', active: true },
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
        { icon: '🔮', label: '決策模型', path: '/models' },
      ]
    },
    {
      category: '系統設定',
      items: [
        { icon: '⚙️', label: '系統設定', path: '/settings' },
        { icon: '👤', label: '用戶管理', path: '/users' },
        { icon: '🔐', label: '權限管理', path: '/permissions' },
        { icon: '📝', label: '系統日誌', path: '/logs' },
      ]
    }
  ];

  const sidebarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: isCollapsed ? '72px' : '280px',
    background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
    color: '#1f2937',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    borderRight: '1px solid #e5e7eb',
    overflow: 'hidden',
    transform: isMobile && !isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.08)'
  };

  const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: isCollapsed ? 'center' : 'space-between',
    padding: isCollapsed ? '1.25rem 0' : '1.5rem',
    borderBottom: '1px solid #e5e7eb',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #ffffff 100%)',
    position: 'relative',
    minHeight: '80px'
  };

  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out'
  };

  const logoIconStyle = {
    fontSize: '1.75rem',
    marginRight: isCollapsed ? 0 : '0.75rem'
  };

  const logoTextStyle = {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: 0,
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out'
  };

  const logoSubtitleStyle = {
    fontSize: '0.75rem',
    color: '#64748b',
    marginTop: '0.125rem',
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s ease-in-out'
  };

  const toggleButtonStyle = {
    width: '38px',
    height: '38px',
    border: 'none',
    borderRadius: '10px',
    background: '#f1f5f9',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    color: '#475569',
    position: isCollapsed ? 'absolute' : 'static',
    top: isCollapsed ? '1.25rem' : 'auto',
    left: isCollapsed ? '50%' : 'auto',
    transform: isCollapsed ? 'translateX(-50%)' : 'none',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  };

  const navStyle = {
    padding: isCollapsed ? '1rem 0.75rem' : '1rem',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    overflowX: 'hidden',
    scrollbarWidth: 'thin',
    scrollbarColor: '#cbd5e1 transparent'
  };

  const categoryStyle = {
    marginBottom: isCollapsed ? '0' : '1.5rem'
  };

  const categoryTitleStyle = {
    fontSize: '0.75rem',
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: isCollapsed ? '0' : '0.75rem',
    padding: isCollapsed ? '0' : '0 0.75rem',
    opacity: isCollapsed ? 0 : 1,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    height: isCollapsed ? '0' : 'auto',
    overflow: 'hidden'
  };

  const menuItemStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    padding: isCollapsed ? '1rem' : '0.875rem 0.75rem',
    marginBottom: isCollapsed ? '0.5rem' : '0.25rem',
    borderRadius: isCollapsed ? '12px' : '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    textDecoration: 'none',
    color: isActive ? '#ffffff' : '#475569',
    fontWeight: '500',
    background: isActive ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
    position: 'relative',
    justifyContent: isCollapsed ? 'center' : 'flex-start',
    boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.25)' : 'none',
    minHeight: '44px'
  });

  const iconStyle = {
    fontSize: isCollapsed ? '1.5rem' : '1.25rem',
    marginRight: isCollapsed ? 0 : '0.75rem',
    flexShrink: 0,
    width: isCollapsed ? 'auto' : '20px',
    textAlign: 'center',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  const labelStyle = {
    opacity: isCollapsed ? 0 : 1,
    transition: 'opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    transform: isCollapsed ? 'translateX(-10px)' : 'translateX(0)',
    transitionDelay: isCollapsed ? '0s' : '0.1s'
  };

  const tooltipStyle = {
    position: 'absolute',
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    background: '#1f2937',
    color: 'white',
    padding: '0.625rem 0.875rem',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginLeft: '0.875rem',
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    opacity: 0,
    visibility: 'hidden',
    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1001,
    pointerEvents: 'none',
    scale: '0.95'
  };

  return (
    <div style={sidebarStyle}>
      {/* 標題區域與切換按鈕 */}
      <div style={headerStyle}>
        <div style={logoContainerStyle}>
          <div style={logoIconStyle}>🏭</div>
          <div>
            <h2 style={logoTextStyle}>智慧工廠</h2>
            <p style={logoSubtitleStyle}>監控系統</p>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          style={toggleButtonStyle}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e2e8f0';
            e.target.style.transform = isCollapsed ? 'translateX(-50%) scale(1.08)' : 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#f1f5f9';
            e.target.style.transform = isCollapsed ? 'translateX(-50%)' : 'none';
          }}
        >
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
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
            {category.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                style={menuItemStyle(item.active)}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = '#f1f5f9';
                    e.target.style.color = '#1e293b';
                    e.target.style.transform = isCollapsed ? 'scale(1.05)' : 'translateX(2px)';
                  }
                  if (isCollapsed) {
                    const tooltip = e.target.querySelector('.tooltip');
                    if (tooltip) {
                      tooltip.style.opacity = '1';
                      tooltip.style.visibility = 'visible';
                      tooltip.style.scale = '1';
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#475569';
                    e.target.style.transform = 'none';
                  }
                  if (isCollapsed) {
                    const tooltip = e.target.querySelector('.tooltip');
                    if (tooltip) {
                      tooltip.style.opacity = '0';
                      tooltip.style.visibility = 'hidden';
                      tooltip.style.scale = '0.95';
                    }
                  }
                }}
              >
                <span style={iconStyle}>{item.icon}</span>
                <span style={labelStyle}>{item.label}</span>
                {isCollapsed && (
                  <div className="tooltip" style={tooltipStyle}>
                    {item.label}
                  </div>
                )}
                {item.active && !isCollapsed && (
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '60%',
                    backgroundColor: '#ffffff',
                    borderRadius: '0 2px 2px 0'
                  }}></div>
                )}
              </div>
            ))}
          </div>
        ))}
      </nav>
    </div>
  );
};

// 更新的 Layout 組件
const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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

  const mainContentStyle = {
    marginLeft: isMobile ? 0 : (sidebarCollapsed ? '72px' : '280px'),
    transition: 'margin-left 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  };

  const headerStyle = {
    height: '80px',
    background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 2rem',
    position: 'sticky',
    top: 0,
    zIndex: 999,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)'
  };

  const searchStyle = {
    position: 'relative'
  };

  const searchInputStyle = {
    width: isMobile ? '200px' : '350px',
    padding: '0.75rem 1rem 0.75rem 3rem',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '0.875rem',
    transition: 'all 0.15s ease-in-out',
    outline: 'none',
    background: '#ffffff',
    color: '#374151'
  };

  const actionButtonStyle = {
    width: '44px',
    height: '44px',
    border: 'none',
    borderRadius: '12px',
    background: '#f8fafc',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.15s ease-in-out',
    color: '#475569'
  };

  const userInfoStyle = {
    display: isMobile ? 'none' : 'flex',
    alignItems: 'center',
    gap: '0.75rem'
  };

  const userTextStyle = {
    textAlign: 'right'
  };

  const userNameStyle = {
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#1f2937'
  };

  const userRoleStyle = {
    fontSize: '0.75rem',
    color: '#64748b'
  };

  const avatarStyle = {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'transform 0.15s ease-in-out',
    boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      {/* 側邊欄 */}
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* 主內容區域 */}
      <div style={mainContentStyle}>
        {/* 頂部表頭 */}
        <header style={headerStyle}>
          {/* 左側：搜尋框 */}
          <div style={searchStyle}>
            <input
              type="text"
              placeholder="搜尋功能或數據..."
              style={searchInputStyle}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#e2e8f0';
                e.target.style.boxShadow = 'none';
              }}
            />
            <svg
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#9ca3af'
              }}
              width="18" height="18" fill="currentColor" viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
            </svg>
          </div>

          {/* 右側：操作按鈕和用戶信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* 通知按鈕 */}
            <button 
              style={actionButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              <div style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '8px',
                height: '8px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid white'
              }}></div>
            </button>

            {/* 設定按鈕 */}
            <button 
              style={actionButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#f1f5f9';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#f8fafc';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
            </button>

            {/* 分隔線 */}
            <div style={{
              width: '1px',
              height: '32px',
              background: '#e2e8f0'
            }}></div>

            {/* 用戶資訊 */}
            <div style={userInfoStyle}>
              <div style={userTextStyle}>
                <div style={userNameStyle}>
                  {currentUser.name}
                </div>
                <div style={userRoleStyle}>
                  {currentUser.role}
                </div>
              </div>
              
              <div 
                style={avatarStyle}
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

        {/* 主內容區 */}
        <main style={{
          flex: 1,
          padding: '2rem',
          background: '#f8fafc'
        }}>
          {children}
        </main>
      </div>

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