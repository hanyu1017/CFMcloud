// pages/factories/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import { Search, Plus, Filter, MapPin, Activity, Users, Zap, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react'

export default function FactoriesPage() {
  const [factories, setFactories] = useState([])
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [showForm, setShowForm] = useState(false)

  // 獲取工廠數據
  const fetchFactories = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') params.append('status', statusFilter)
      if (searchTerm) params.append('search', searchTerm)
      params.append('sortBy', sortBy)
      
      const response = await fetch(`/api/factories?${params}`)
      if (!response.ok) {
        throw new Error('獲取工廠數據失敗')
      }
      const data = await response.json()
      setFactories(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('獲取工廠數據錯誤:', err)
      setError(err.message)
    }
  }

  // 獲取統計數據
  const fetchStats = async () => {
    try {
      const response = await fetch('/api/factories/stats')
      if (!response.ok) {
        throw new Error('獲取統計數據失敗')
      }
      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('獲取統計數據錯誤:', err)
    }
  }

  // 初始載入
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchFactories(), fetchStats()])
      setLoading(false)
    }
    loadData()
  }, [])

  // 當篩選條件改變時重新獲取數據
  useEffect(() => {
    if (!loading) {
      fetchFactories()
    }
  }, [searchTerm, statusFilter, sortBy])

  // 狀態徽章組件
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      online: { cssClass: 'status-online', icon: CheckCircle, text: '運行中' },
      offline: { cssClass: 'status-offline', icon: XCircle, text: '離線' },
      maintenance: { cssClass: 'status-maintenance', icon: Clock, text: '維護中' }
    }
    
    const config = statusConfig[status]
    const Icon = config.icon
    
    return (
      <div className={`status-badge ${config.cssClass}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.text}
      </div>
    )
  }

  // 統計卡片組件
  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color = "blue" }) => {
    const getIconColorClass = (color) => {
      switch(color) {
        case 'green': return 'stat-icon-success'
        case 'yellow': return 'stat-icon-warning'
        case 'red': return 'stat-icon-danger'
        default: return 'stat-icon-primary'
      }
    }
    
    return (
      <div className="stat-card">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {trend && (
              <div className="flex items-center mt-2">
                {trend === 'up' ? (
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {trendValue}
                </span>
              </div>
            )}
          </div>
          <div className={`stat-icon ${getIconColorClass(color)}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </div>
    )
  }

  // 工廠卡片組件
  const FactoryCard = ({ factory }) => {
    const getEfficiencyColor = (efficiency) => {
      if (efficiency >= 90) return 'text-success'
      if (efficiency >= 70) return 'text-warning'
      return 'text-danger'
    }

    const formatDate = (dateString) => {
      if (!dateString) return '未知'
      return new Date(dateString).toLocaleDateString('zh-TW')
    }

    return (
      <div className="factory-card">
        <div className="factory-header">
          <div>
            <h3 className="factory-name">{factory.name}</h3>
            <div className="factory-location">
              <MapPin className="w-4 h-4 mr-1" />
              {factory.location}
            </div>
          </div>
          <StatusBadge status={factory.status} />
        </div>

        {/* 關鍵指標 */}
        <div className="factory-metrics">
          <div className="metric">
            <div className={`metric-value ${getEfficiencyColor(factory.efficiency)}`}>
              {factory.efficiency || 0}%
            </div>
            <div className="metric-label">效率</div>
          </div>
          <div className="metric">
            <div className="metric-value">{factory.employees || 0}</div>
            <div className="metric-label">員工</div>
          </div>
        </div>

        {/* 詳細信息 */}
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-secondary">生產率:</span>
            <span className="font-medium">{factory.production_rate || 0}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">耗電量:</span>
            <span className="font-medium">{factory.power_consumption || 0} kW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">警報:</span>
            <span className={`font-medium ${
              factory.alerts > 0 ? 'text-danger' : 'text-success'
            }`}>
              {factory.alerts || 0} 個
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-secondary">最後維護:</span>
            <span className="font-medium">{formatDate(factory.last_maintenance)}</span>
          </div>
        </div>

        {/* 操作按鈕 */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex space-x-2">
            <button className="btn btn-primary btn-sm flex-1">
              詳細信息
            </button>
            <button className="btn btn-secondary btn-sm">
              編輯
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="text-center">
            <div className="spinner mx-auto mb-4"></div>
            <p className="text-gray-600">載入工廠數據中...</p>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="text-center">
            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">載入失敗</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn btn-primary"
            >
              重新載入
            </button>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      {/* 頁面標題 */}
      <div className="page-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="page-title">工廠管理中心</h1>
            <p className="page-subtitle">監控和管理所有生產基地的運營狀況</p>
          </div>
          <button 
            onClick={() => setShowForm(true)}
            className="btn btn-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            新增工廠
          </button>
        </div>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-stats mb-8">
        <StatCard
          title="總工廠數"
          value={stats.totalFactories || 0}
          icon={Activity}
          color="blue"
        />
        <StatCard
          title="運行中"
          value={stats.onlineFactories || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="總員工"
          value={(stats.totalEmployees || 0).toLocaleString()}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="平均效率"
          value={`${stats.averageEfficiency || 0}%`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="總警報"
          value={stats.totalAlerts || 0}
          icon={AlertTriangle}
          color="red"
        />
        <StatCard
          title="總耗電"
          value={`${(stats.totalPowerConsumption || 0).toLocaleString()} kW`}
          icon={Zap}
          color="yellow"
        />
      </div>

      {/* 搜索和篩選卡片 */}
      <div className="card mb-6">
        <div className="card-body">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="搜索工廠名稱或地址..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-input pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="form-select"
              >
                <option value="all">所有狀態</option>
                <option value="online">運行中</option>
                <option value="maintenance">維護中</option>
                <option value="offline">離線</option>
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="form-select"
              >
                <option value="name">按名稱排序</option>
                <option value="efficiency">按效率排序</option>
                <option value="alerts">按警報數排序</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 工廠列表卡片 */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">工廠列表</h2>
          <p className="card-subtitle">
            {factories.length > 0 ? `共 ${factories.length} 個工廠` : '暫無工廠資料'}
          </p>
        </div>

        <div className="card-body">
          {factories.length > 0 ? (
            <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
              {factories.map(factory => (
                <FactoryCard key={factory.factory_id} factory={factory} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">找不到工廠</h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? '沒有符合篩選條件的工廠' 
                  : '還沒有任何工廠資料'}
              </p>
              {(searchTerm || statusFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setStatusFilter('all')
                  }}
                  className="btn btn-primary"
                >
                  清除篩選
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 新增工廠表單 Modal 可以在這裡實作 */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">新增工廠</h3>
            <p className="text-gray-600 mb-4">工廠新增功能開發中...</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="btn btn-secondary"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}