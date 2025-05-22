// pages/_app.js
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// pages/index.js
import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import FactoryCard from '../components/FactoryCard'
import AlertPanel from '../components/AlertPanel'
import DataTable from '../components/DataTable'
import { PieChart, LineChart } from '../components/Charts'

export default function Dashboard() {
  const [factories, setFactories] = useState([])
  const [alerts, setAlerts] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      
      const [factoriesRes, alertsRes, statsRes] = await Promise.all([
        fetch('/api/factories'),
        fetch('/api/alerts'),
        fetch('/api/factories/stats')
      ])

      const factoriesData = await factoriesRes.json()
      const alertsData = await alertsRes.json()
      const statsData = await statsRes.json()

      setFactories(factoriesData)
      setAlerts(alertsData)
      setStats(statsData)
    } catch (error) {
      console.error('獲取儀表板數據失敗:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">廠區管理儀表板</h1>
        <p className="page-subtitle">監控所有廠區的營運狀況與環境指標</p>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-4" style={{ marginBottom: '2rem' }}>
        <div className="stat-card">
          <div className="stat-value">{stats.total_factories || 0}</div>
          <div className="stat-label">總廠區數</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.online_factories || 0}</div>
          <div className="stat-label">運行中廠區</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{(stats.total_carbon_emissions || 0).toFixed(1)}</div>
          <div className="stat-label">總碳排放量 (噸)</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{(stats.avg_efficiency_rate || 0).toFixed(1)}%</div>
          <div className="stat-label">平均節能率</div>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
        {/* 廠區列表 */}
        <div style={{ gridColumn: 'span 2' }}>
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">廠區概況</h2>
              <button className="btn btn-primary">新增廠區</button>
            </div>
            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              {factories.map(factory => (
                <FactoryCard key={factory.factory_id} factory={factory} />
              ))}
            </div>
          </div>
        </div>

        {/* 警報面板 */}
        <div>
          <AlertPanel alerts={alerts} />
        </div>
      </div>

      {/* 數據表格 */}
      <div className="card" style={{ marginTop: '2rem' }}>
        <div className="card-header">
          <h2 className="card-title">廠區數據比較</h2>
        </div>
        <DataTable factories={factories} />
      </div>

      {/* 圖表區域 */}
      <div className="grid grid-cols-2" style={{ marginTop: '2rem', gap: '2rem' }}>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">碳排放分佈</h3>
          </div>
          <PieChart data={factories} />
        </div>
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">節能率趨勢</h3>
          </div>
          <LineChart data={factories} />
        </div>
      </div>
    </Layout>
  )
}

// components/Layout.js
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

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

// components/FactoryCard.js
export default function FactoryCard({ factory }) {
  const getStatusClass = (status) => {
    return status === 'online' ? 'status-online' : 'status-offline'
  }

  const getStatusText = (status) => {
    return status === 'online' ? '運行中' : '離線'
  }

  return (
    <div className="factory-card">
      <div className="factory-header">
        <h3 className="factory-name">{factory.factory_name}</h3>
        <span className={`factory-status ${getStatusClass(factory.status)}`}>
          {getStatusText(factory.status)}
        </span>
      </div>
      
      <div className="factory-metrics">
        <div className="metric">
          <div className="metric-value">{factory.carbon_emissions}</div>
          <div className="metric-label">碳排放量 (噸)</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.efficiency_rate}%</div>
          <div className="metric-label">節能率</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.energy_consumption}</div>
          <div className="metric-label">能源消耗</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.carbon_reduction}%</div>
          <div className="metric-label">減碳成果</div>
        </div>
      </div>
    </div>
  )
}

// components/AlertPanel.js
export default function AlertPanel({ alerts }) {
  const getAlertLevelClass = (level) => {
    switch (level) {
      case 'high': return 'alert-high'
      case 'medium': return 'alert-medium'
      case 'low': return 'alert-low'
      default: return 'alert-medium'
    }
  }

  const getAlertLevelText = (level) => {
    switch (level) {
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
      default: return '中'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `今天 ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffInHours < 48) {
      return `昨天 ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('zh-TW')
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">廠區警報</h2>
        <a href="#" className="btn btn-secondary">查看全部</a>
      </div>
      
      <div className="alert-panel">
        {alerts.map(alert => (
          <div key={alert.alert_id} className="alert-item">
            <div className="alert-header">
              <div className="alert-title">
                {alert.factory_name}：{alert.message}
                <span className={`alert-level ${getAlertLevelClass(alert.alert_level)}`}>
                  {getAlertLevelText(alert.alert_level)}
                </span>
              </div>
              <div className="alert-time">
                {formatDate(alert.created_at)}
              </div>
            </div>
            <div className="alert-factory">{alert.factory_name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// components/DataTable.js
export default function DataTable({ factories }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>廠區</th>
          <th>碳排放總量</th>
          <th>製程排放</th>
          <th>能源排放</th>
          <th>節能率</th>
          <th>減碳成果</th>
        </tr>
      </thead>
      <tbody>
        {factories.map(factory => (
          <tr key={factory.factory_id}>
            <td>{factory.factory_name}</td>
            <td>{factory.carbon_emissions} 噸</td>
            <td>
              {factory.process_emissions} 噸 
              ({Math.round((factory.process_emissions / factory.carbon_emissions) * 100)}%)
            </td>
            <td>
              {factory.energy_emissions} 噸 
              ({Math.round((factory.energy_emissions / factory.carbon_emissions) * 100)}%)
            </td>
            <td>{factory.efficiency_rate}%</td>
            <td className={factory.carbon_reduction < 0 ? 'stat-positive' : 'stat-negative'}>
              {factory.carbon_reduction}% (與去年同期)
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}