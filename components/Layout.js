import React, { useState } from 'react';
import Sidebar from './Sidebar'; // 新增這行

const Layout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentUser] = useState({
    name: '張經理',
    role: '系統管理員',
    avatar: 'ZM' // 用戶名縮寫
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--gray-50, #f9fafb)',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }}>
      {/* 側邊欄 */}
      <Sidebar />

      {/* 主內容區域 */}
      <div
        className="main-content"
        style={{
          marginLeft: '220px', // 側邊欄寬度
          transition: 'margin-left 0.3s ease-in-out',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
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