// components/Sidebar.js
import React from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter()

  const menuItems = [
    { name: '儀表板', path: '/', icon: '📊' },
    { name: '廠區管理', path: '/factories', icon: '🏭' },
    { name: '環境監控', path: '/monitoring', icon: '🌱' },
    { name: '能源管理', path: '/energy', icon: '⚡' },
    { name: '報告分析', path: '/reports', icon: '📈' },
    { name: '設定', path: '/settings', icon: '⚙️' }
  ]

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <h2>工廠監控系統</h2>
        <p>智能製造管理平台</p>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-section-title">主要功能</div>
          {menuItems.map(item => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-item ${router.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </aside>
  )
}