// components/Sidebar.js
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
        <h2>廠區管理系統</h2>
      </div>
      
      <nav className="sidebar-nav">
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
      </nav>
    </aside>
  )
}