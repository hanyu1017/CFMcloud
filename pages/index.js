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
      
      // 模擬數據
      const mockFactories = [
        {
          factory_id: 1,
          factory_name: '台北總廠',
          location: '台北市信義區',
          status: 'online',
          carbon_emissions: 87.6,
          process_emissions: 52.6,
          energy_emissions: 35.0,
          energy_consumption: 120.5,
          efficiency_rate: 18.5,
          carbon_reduction: -12.4
        },
        {
          factory_id: 2,
          factory_name: '台中廠',
          location: '台中市西屯區',
          status: 'online',
          carbon_emissions: 65.3,
          process_emissions: 35.9,
          energy_emissions: 29.4,
          energy_consumption: 95.2,
          efficiency_rate: 21.0,
          carbon_reduction: -15.8
        },
        {
          factory_id: 3,
          factory_name: '高雄廠',
          location: '高雄市前鎮區',
          status: 'online',
          carbon_emissions: 56.8,
          process_emissions: 31.2,
          energy_emissions: 25.6,
          energy_consumption: 78.9,
          efficiency_rate: 14.2,
          carbon_reduction: -8.7
        }
      ]

      const mockAlerts = [
        {
          alert_id: 1,
          factory_id: 3,
          factory_name: '高雄廠',
          alert_type: 'energy',
          alert_level: 'high',
          message: '空調系統異常耗電',
          created_at: new Date().toISOString()
        },
        {
          alert_id: 2,
          factory_id: 1,
          factory_name: '台北總廠',
          alert_type: 'temperature',
          alert_level: 'high',
          message: '製程區域溫度過高',
          created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
          alert_id: 3,
          factory_id: 3,
          factory_name: '高雄廠',
          alert_type: 'maintenance',
          alert_level: 'medium',
          message: '設備維護即將到期',
          created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ]

      const mockStats = {
        total_factories: 3,
        online_factories: 3,
        total_carbon_emissions: 209.7,
        avg_efficiency_rate: 17.9
      }

      setFactories(mockFactories)
      setAlerts(mockAlerts)
      setStats(mockStats)
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