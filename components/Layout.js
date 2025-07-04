import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // 新增

// 簡潔圖標組件
const Icons = {
  Dashboard: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
    </svg>
  ),
  Monitor: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v1h12v-1l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/>
    </svg>
  ),
  Factory: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 3L2 12h3v8h14v-8h3L12 3zm0 2.69L18.31 11H17v7H7v-7H5.69L12 5.69z"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
    </svg>
  ),
  FileText: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
    </svg>
  ),
  Tool: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
    </svg>
  ),
  UserCheck: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  CarbonAsset: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17 8h3v12h-3v-12zM12 4h3v16h-3v-16zM7 12h3v8h-3v-8zM3 9h2v10h-2v-10z"/>
    </svg>
  ),
  BarChart: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
    </svg>
  ),
  DollarSign: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z"/>
    </svg>
  ),
  Brain: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21,9V7A2,2 0 0,0 19,5A2,2 0 0,0 17,7H16A2,2 0 0,0 14,5A2,2 0 0,0 12,7A2,2 0 0,0 10,5A2,2 0 0,0 8,7H7A2,2 0 0,0 5,5A2,2 0 0,0 3,7V9A2,2 0 0,0 1,11A2,2 0 0,0 3,13V15A2,2 0 0,0 5,17H7A2,2 0 0,0 9,19A2,2 0 0,0 11,17H13A2,2 0 0,0 15,19A2,2 0 0,0 17,17H19A2,2 0 0,0 21,15V13A2,2 0 0,0 23,11A2,2 0 0,0 21,9Z"/>
    </svg>
  ),
  Settings: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
    </svg>
  ),
  Users: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  ),
  Shield: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18,8h-1V6c0-2.76-2.24-5-5-5S7,3.24,7,6v2H6c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V10 C20,8.9,19.1,8,18,8z M12,17c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S13.1,17,12,17z M15.1,8H8.9V6c0-1.71,1.39-3.1,3.1-3.1 s3.1,1.39,3.1,3.1V8z"/>
    </svg>
  ),
  Workflow: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h6v6H3zm8 0h6v6h-6zM3 11h6v6H3zm10 0h6v6h-6z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  ),
  ChevronLeft: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
    </svg>
  ),
  Bell: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
    </svg>
  ),
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/>
    </svg>
  ),
  Home: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </svg>
  ),
  Close: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  )
};

// 導航配置
const navigationItems = [
  {
    category: '監控總覽',
    items: [
      { name: '儀表板', href: '/dashboard', icon: Icons.Dashboard },
      { name: '即時監控', href: '/monitor', icon: Icons.Monitor, badge: '實時' },
      { name: '工廠狀態', href: '/factories', icon: Icons.Factory, badge: '3' }
    ]
  },
  {
    category: '營運管理',
    items: [
      { name: '警報中心', href: '/alerts', icon: Icons.AlertTriangle, badge: '2' },
      { name: '工單管理', href: '/work-orders', icon: Icons.FileText },
      { name: '設備維護', href: '/maintenance', icon: Icons.Tool },
      { name: '人員調度', href: '/staff', icon: Icons.UserCheck }
    ]
  },
  {
    category: '碳資產管理',
    items: [
      { name: '碳資產管理', href: '/carbon-assets', icon: Icons.CarbonAsset }
    ]
  },
  {
    category: '數據分析',
    items: [
      { name: '生產報表', href: '/reports', icon: Icons.BarChart },
      { name: '效率分析', href: '/efficiency-analysis', icon: Icons.TrendingUp },
      { name: '成本分析', href: '/cost-analysis', icon: Icons.DollarSign },
      { name: '決策模型', href: '/models', icon: Icons.Brain }
    ]
  },
  {
    category: '系統管理',
    items: [
      { name: '系統設定', href: '/settings', icon: Icons.Settings },
      { name: '用戶管理', href: '/users', icon: Icons.Users },
      { name: '權限管理', href: '/permissions', icon: Icons.Shield },
      { name: 'n8n 服務', href: '/n8n', icon: Icons.Workflow }
    ]
  }
];

// 主要 Layout 組件 - 基於原始代碼的精確修正
const Layout = ({ children, currentPath = '/dashboard', onNavigate }) => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentUser] = useState({
    name: '張經理',
    role: '系統管理員',
    avatar: 'ZM'
  });

  // 補上這個函數
  const handleSidebarToggle = () => {
    if (isMobile) {
      setShowMobileSidebar((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => !prev);
    }
  };

  // 檢測移動設備 - 修正：移除防抖，直接更新
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setShowMobileSidebar(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 時間更新
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 路徑同步 - 修正：確保即時更新
  // useEffect(() => {
  //   setActivePath(currentPath);
  // }, [currentPath]);

  // 導航處理函數
  const handleNavigate = (path) => {
    if (isMobile) setShowMobileSidebar(false);
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(path);
    }
    if (router.pathname !== path) {
      router.push(path);
    }
  };

  // 取得當前頁面資訊
  const getCurrentPageInfo = (path) => {
    for (const section of navigationItems) {
      for (const item of section.items) {
        if (item.href === path) {
          return {
            ...item,
            category: section.category
          };
        }
      }
    }
    return {
      name: '儀表板',
      category: '監控總覽',
      icon: Icons.Dashboard
    };
  };

  // 用 router.pathname 取得當前頁面
  const currentPage = getCurrentPageInfo(router.pathname);

  const sidebarWidth = isMobile ? 0 : (sidebarCollapsed ? 60 : 240);

  return (
    <div style={{
      fontFamily: "'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif",
      backgroundColor: darkMode ? '#111827' : '#f9fafb',
      minHeight: '100vh',
      display: 'flex'
    }}>
      {/* 側邊欄 */}
      <div
        style={{
          position: 'fixed',
          left: isMobile ? (showMobileSidebar ? '0' : '-280px') : '0',
          top: 0,
          bottom: 0,
          width: isMobile ? '280px' : (sidebarCollapsed ? '60px' : '240px'),
          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
          borderRight: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
          transition: isMobile 
            ? 'left 0.3s ease-in-out' 
            : 'width 0.3s ease-in-out',
          zIndex: isMobile ? 1100 : 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Logo區域 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: (sidebarCollapsed && !isMobile) ? 'center' : 'space-between',
            padding: '16px',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            minHeight: '64px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              opacity: (sidebarCollapsed && !isMobile) ? 0 : 1,
              transition: 'opacity 0.3s ease'
            }}
          >
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                backgroundColor: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: '600',
                fontSize: '14px',
                marginRight: '12px'
              }}
            >
              CFM
            </div>
            <div>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: darkMode ? '#f9fafb' : '#111827'
                }}
              >
                智慧存貨管理系統
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: darkMode ? '#9ca3af' : '#6b7280'
                }}
              >
                Smart Inventory Platform
              </div>
            </div>
          </div>
          
          <button
            style={{
              width: '32px',
              height: '32px',
              border: 'none',
              borderRadius: '6px',
              backgroundColor: darkMode ? '#374151' : '#f3f4f6',
              color: darkMode ? '#d1d5db' : '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              position: (sidebarCollapsed && !isMobile) ? 'absolute' : 'static',
              top: (sidebarCollapsed && !isMobile) ? '16px' : 'auto',
              left: (sidebarCollapsed && !isMobile) ? '50%' : 'auto',
              transform: (sidebarCollapsed && !isMobile) ? 'translateX(-50%)' : 'none'
            }}
            onClick={handleSidebarToggle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
            }}
          >
            {isMobile ? <Icons.Close /> : (sidebarCollapsed ? <Icons.ChevronRight /> : <Icons.ChevronLeft />)}
          </button>
        </div>

        {/* 導航區域 */}
        <nav
          style={{
            flex: 1,
            padding: '16px 12px',
            overflowY: 'auto'
          }}
        >
          {navigationItems.map((section, sectionIndex) => (
            <div key={sectionIndex} style={{ marginBottom: '24px' }}>
              {!(sidebarCollapsed && !isMobile) && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: '600',
                    color: darkMode ? '#9ca3af' : '#6b7280',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '8px',
                    padding: '0 8px'
                  }}
                >
                  {section.category}
                </div>
              )}
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                {section.items.map((item) => {
                  // 這裡直接用 router.pathname 判斷 active
                  const isActive = router.pathname === item.href;
                  return (
                    <button
                      key={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: (sidebarCollapsed && !isMobile) ? '10px' : '10px 12px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: isActive ? '#3b82f6' : 'transparent',
                        color: isActive 
                          ? '#ffffff' 
                          : (darkMode ? '#d1d5db' : '#374151'),
                        fontWeight: isActive ? '500' : '400',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        justifyContent: (sidebarCollapsed && !isMobile) ? 'center' : 'flex-start',
                        width: '100%',
                        textAlign: 'left'
                      }}
                      onClick={() => handleNavigate(item.href)}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                      title={sidebarCollapsed && !isMobile ? item.name : ''}
                    >
                      <div
                        style={{
                          marginRight: (sidebarCollapsed && !isMobile) ? 0 : '8px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <item.icon />
                      </div>
                      
                      {!(sidebarCollapsed && !isMobile) && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%'
                          }}
                        >
                          <span>{item.name}</span>
                          {item.badge && (
                            <span
                              style={{
                                background: isActive ? 'rgba(255, 255, 255, 0.2)' : (darkMode ? '#4b5563' : '#e5e7eb'),
                                color: isActive ? 'white' : (darkMode ? '#d1d5db' : '#6b7280'),
                                fontSize: '10px',
                                fontWeight: '500',
                                padding: '2px 6px',
                                borderRadius: '4px',
                                minWidth: '16px',
                                textAlign: 'center'
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* 手機版遮罩 */}
      {isMobile && showMobileSidebar && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1050
          }}
          onClick={() => setShowMobileSidebar(false)}
        />
      )}

      {/* 主內容區域 - 修正：確保正確的 marginLeft */}
      <div
        style={{
          flex: 1,
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
      >
        {/* 頂部欄 - 修正：確保頁面信息即時更新 */}
        <header
          style={{
            height: '64px',
            backgroundColor: darkMode ? '#1f2937' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: isMobile ? '0 16px' : '0 24px',
            position: 'sticky',
            top: 0,
            zIndex: 999
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
            {/* 手機版菜單按鈕 */}
            {isMobile && (
              <button
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  borderRadius: '6px',
                  backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                  color: darkMode ? '#d1d5db' : '#6b7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s ease'
                }}
                onClick={handleSidebarToggle}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
                }}
              >
                <Icons.Menu />
              </button>
            )}

            <div>
              <div
                style={{
                  fontSize: isMobile ? '18px' : '20px',
                  fontWeight: '600',
                  color: darkMode ? '#f9fafb' : '#111827',
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <currentPage.icon />
                {currentPage.name}
              </div>
              {!isMobile && (
                <div style={{ marginTop: '4px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '14px',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    <span
                      style={{
                        cursor: 'pointer',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        transition: 'background-color 0.2s ease'
                      }}
                      onClick={() => handleNavigate('/dashboard')}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      首頁
                    </span>
                    
                    <Icons.ChevronRight />
                    
                    <span>{currentPage.category}</span>
                    
                    <Icons.ChevronRight />
                    
                    <span
                      style={{
                        color: darkMode ? '#f9fafb' : '#111827',
                        fontWeight: '500'
                      }}
                    >
                      {currentPage.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {!isMobile && (
              <div
                style={{
                  fontSize: '12px',
                  color: darkMode ? '#9ca3af' : '#6b7280',
                  padding: '6px 10px',
                  backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                  borderRadius: '6px',
                  fontWeight: '500'
                }}
              >
                {currentTime.toLocaleString('zh-TW', {
                  month: 'numeric',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </div>
            )}

            <button
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                color: darkMode ? '#d1d5db' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onClick={() => setDarkMode(!darkMode)}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
              }}
            >
              {darkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>

            <button
              style={{
                width: '36px',
                height: '36px',
                border: 'none',
                borderRadius: '6px',
                backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                color: darkMode ? '#d1d5db' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = darkMode ? '#4b5563' : '#e5e7eb';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = darkMode ? '#374151' : '#f3f4f6';
              }}
            >
              <Icons.Bell />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '10px' }}>
              {!isMobile && (
                <div style={{ textAlign: 'right' }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: darkMode ? '#f9fafb' : '#111827'
                    }}
                  >
                    {currentUser.name}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: darkMode ? '#9ca3af' : '#6b7280'
                    }}
                  >
                    {currentUser.role}
                  </div>
                </div>
              )}
              
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '6px',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: '500',
                  fontSize: '14px',
                  cursor: 'pointer'
                }}
              >
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </header>

        {/* 主內容 */}
        <main
          style={{
            flex: 1,
            padding: isMobile ? '16px' : '24px',
            backgroundColor: darkMode ? '#111827' : '#f9fafb'
          }}
        >
          {/* 調試信息 */}
          <div
            style={{
              position: 'fixed',
              bottom: '10px',
              right: '10px',
              background: 'rgba(0,0,0,0.8)',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '12px',
              zIndex: 9999
            }}
          >
            當前: {router.pathname} | 側邊欄: {sidebarWidth}px
          </div>
          
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;