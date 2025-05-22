// pages/index.js
import { useState, useEffect } from 'react'
import Layout from '../components/layout'
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