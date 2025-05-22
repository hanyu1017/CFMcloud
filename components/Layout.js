import React, { useState } from 'react';

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: '張經理',
    role: '系統管理員',
    avatar: 'ZM' // 用戶名縮寫
  });

  const menuItems = [
    {
      section: '主要功能',
      items: [
        { icon: '📊', label: '儀表板', href: '/', active: true },
        { icon: '🏭', label: '生產管理', href: '/production' },
        { icon: '⚙️', label: '設備監控', href: '/equipment' },
        { icon: '⚠️', label: '警報中心', href: '/alerts' }
      ]
    },
    {
      section: '數據分析',
      items: [
        { icon: '📈', label: '報表分析', href: '/reports' },
        { icon: '✅', label: '品質控制', href: '/quality' },
        { icon: '📦', label: '庫存管理', href: '/inventory' }
      ]
    },
    {
      section: '系統設定',
      items: [
        { icon: '👥', label: '用戶管理', href: '/users' },
        { icon: '🔧', label: '系統設定', href: '/settings' }
      ]
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gray-50, #f9fafb)',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      {/* 側邊欄 */}
      <div 
        className="sidebar"
        style={{
          width: sidebarCollapsed ? '80px' : '280px',
          transition: 'width 0.3s ease-in-out',
          background: 'linear-gradient(180deg, var(--primary-900, #0f172a) 0%, var(--primary-800, #1e293b) 100%)',
          color: 'white',
          position: 'fixed',
          height: '100vh',
          overflowY: 'auto',
          borderRight: '1px solid var(--primary-700, #334155)',
          zIndex: 1000
        }}
      >
        <div style={{ padding: '1.5rem 0' }}>
          {/* Logo 區域 */}
          <div style={{
            textAlign: 'center',
            marginBottom: '2rem',
            padding: sidebarCollapsed ? '0 1rem' : '0 1.5rem'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, var(--accent-blue, #2563eb) 0%, var(--accent-indigo, #4f46e5) 100%)',
              borderRadius: '12px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: sidebarCollapsed ? 0 : '1rem'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7H3Z" fill="white" fillOpacity="0.9"/>
                <path d="M21 5H3V7H21V5Z" fill="white"/>
                <path d="M7 9H17V11H7V9Z" fill="rgba(37, 99, 235, 0.8)"/>
                <path d="M7 13H13V15H7V13Z" fill="rgba(37, 99, 235, 0.6)"/>
              </svg>
            </div>
            {!sidebarCollapsed && (
              <>
                <h2 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: 'white',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.25rem'
                }}>
                  工廠監控系統
                </h2>
                <p style={{
                  fontSize: '0.75rem',
                  color: 'var(--primary-400, #94a3b8)'
                }}>
                  智能製造管理平台
                </p>
              </>
            )}
          </div>

          {/* 導航選單 */}
          <nav style={{ padding: '0 1rem' }}>
            {menuItems.map((section, sectionIndex) => (
              <div key={sectionIndex} style={{ marginBottom: '2rem' }}>
                {!sidebarCollapsed && (
                  <div style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--primary-400, #94a3b8)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '0.75rem',
                    padding: '0 1rem'
                  }}>
                    {section.section}
                  </div>
                )}
                
                {section.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: sidebarCollapsed ? '0.75rem' : '0.75rem 1rem',
                      marginBottom: '0.25rem',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease-in-out',
                      textDecoration: 'none',
                      color: item.active ? 'white' : 'var(--primary-300, #cbd5e1)',
                      fontWeight: '500',
                      position: 'relative',
                      background: item.active ? 'var(--accent-blue, #2563eb)' : 'transparent',
                      justifyContent: sidebarCollapsed ? 'center' : 'flex-start'
                    }}
                    onMouseEnter={(e) => {
                      if (!item.active) {
                        e.target.style.backgroundColor = 'var(--primary-700, #334155)';
                        e.target.style.color = 'white';
                        e.target.style.transform = 'translateX(2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!item.active) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = 'var(--primary-300, #cbd5e1)';
                        e.target.style.transform = 'translateX(0)';
                      }
                    }}
                  >
                    <span style={{
                      fontSize: '1.25rem',
                      marginRight: sidebarCollapsed ? 0 : '0.75rem',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </span>
                    {!sidebarCollapsed && (
                      <span>{item.label}</span>
                    )}
                    {item.active && (
                      <div style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '3px',
                        height: '60%',
                        backgroundColor: 'white',
                        borderRadius: '0 2px 2px 0'
                      }}></div>
                    )}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* 主內容區域 */}
      <div style={{
        marginLeft: sidebarCollapsed ? '80px' : '280px',
        transition: 'margin-left 0.3s ease-in-out',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* 頂部表頭 */}
        <header style={{
          height: '80px',
          background: 'white',
          borderBottom: '1px solid var(--gray-200, #e5e7eb)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 2rem',
          position: 'sticky',
          top: 0,
          zIndex: 999,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
        }}>
          {/* 左側：選單切換按鈕 */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              style={{
                width: '40px',
                height: '40px',
                border: 'none',
                borderRadius: '8px',
                background: 'var(--gray-100, #f3f4f6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease-in-out',
                marginRight: '1rem'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'var(--gray-200, #e5e7eb)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'var(--gray-100, #f3f4f6)';
              }}
            >
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
              </svg>
            </button>
            
            {/* 搜尋框 */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="搜尋功能或數據..."
                style={{
                  width: '300px',
                  padding: '0.5rem 0.75rem 0.5rem 2.5rem',
                  border: '2px solid var(--gray-300, #d1d5db)',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  transition: 'border-color 0.15s ease-in-out',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent-blue, #2563eb)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'var(--gray-300, #d1d5db)';
                }}
              />
              <svg
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--gray-400, #9ca3af)'
                }}
                width="16" height="16" fill="currentColor" viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
            </div>
          </div>

          {/* 右側：通知和用戶信息 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* 通知按鈕 */}
            <button style={{
              width: '40px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              background: 'var(--gray-100, #f3f4f6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              transition: 'all 0.15s ease-in-out'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/>
              </svg>
              {/* 通知小紅點 */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '8px',
                height: '8px',
                background: 'var(--danger, #dc2626)',
                borderRadius: '50%',
                border: '2px solid white'
              }}></div>
            </button>

            {/* 設定按鈕 */}
            <button style={{
              width: '40px',
              height: '40px',
              border: 'none',
              borderRadius: '8px',
              background: 'var(--gray-100, #f3f4f6)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease-in-out'
            }}>
              <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"/>
              </svg>
            </button>

            {/* 分隔線 */}
            <div style={{
              width: '1px',
              height: '30px',
              background: 'var(--gray-300, #d1d5db)'
            }}></div>

            {/* 用戶資訊 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--gray-900, #111827)'
                }}>
                  {currentUser.name}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--gray-500, #6b7280)'
                }}>
                  {currentUser.role}
                </div>
              </div>
              
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, var(--accent-blue, #2563eb) 0%, var(--accent-indigo, #4f46e5) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'transform 0.15s ease-in-out'
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

        {/* 主內容區 */}
        <main style={{
          flex: 1,
          padding: '2rem',
          background: 'var(--gray-50, #f9fafb)'
        }}>
          {children}
        </main>
      </div>

      {/* 響應式處理 */}
      <style jsx>{`
        @media (max-width: 1024px) {
          .sidebar {
            transform: ${sidebarCollapsed ? 'translateX(-100%)' : 'translateX(0)'};
            width: 280px !important;
          }
          
          .main-content {
            margin-left: 0 !important;
          }
        }
        
        @media (max-width: 768px) {
          .search-input {
            width: 200px !important;
          }
          
          .user-info {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;