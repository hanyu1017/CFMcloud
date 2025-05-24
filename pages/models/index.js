// pages/models/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

// 模擬 API 數據
const mockModelData = {
  parameters: {
    gf: 3000,
    gs: 2500,
    price: 85,
    cycle: 45,
    carbonPrice: 120
  },
  savedModels: [
    { id: 1, name: '基準模型', gf: 3000, gs: 2500, price: 85, cycle: 45, carbonPrice: 120, totalCost: 8510, createdAt: '2024-01-15' },
    { id: 2, name: '優化模型A', gf: 3300, gs: 2200, price: 88, cycle: 42, carbonPrice: 120, totalCost: 7890, createdAt: '2024-01-14' },
    { id: 3, name: '風險控制模型', gf: 3800, gs: 2800, price: 92, cycle: 38, carbonPrice: 180, totalCost: 9240, createdAt: '2024-01-13' }
  ]
}

export default function ModelsPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [parameters, setParameters] = useState({
    gf: 3000,
    gs: 2500,
    price: 85,
    cycle: 45,
    carbonPrice: 120
  })
  const [savedModels, setSavedModels] = useState([])
  const [activeStrategy, setActiveStrategy] = useState('當前策略')
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [calculating, setCalculating] = useState(false)

  useEffect(() => {
    fetchModelData()
  }, [])

  const fetchModelData = async () => {
    try {
      setLoading(true)
      // 模擬 API 調用
      // const response = await fetch('/api/models')
      // const data = await response.json()
      
      // 使用模擬數據
      setTimeout(() => {
        setParameters(mockModelData.parameters)
        setSavedModels(mockModelData.savedModels)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('獲取模型數據失敗:', error)
      // 使用模擬數據作為備用
      setParameters(mockModelData.parameters)
      setSavedModels(mockModelData.savedModels)
      setLoading(false)
    }
  }

  // 標籤頁配置
  const tabs = ['模型設定', '成本分析', '碳排來源', '敏感度', '決策地圖', '策略比較']
  
  // 策略選項
  const strategies = ['當前策略', '策略A', '策略B', '策略C', '策略D']

  // 計算相關函數
  const calculateCosts = (params) => {
    const investment = params.gf + params.gs
    const procurement = 7000 + (params.cycle < 45 ? 200 : 0) + (params.price > 85 ? 300 : 0)
    const carbonReductionRate = Math.min(0.6, (params.gf * 0.00008) + (params.gs * 0.00006))
    const carbon = Math.round(3500 * (1 - carbonReductionRate) * (params.carbonPrice / 100))
    const total = investment + procurement + carbon
    
    return { investment, procurement, carbon, total }
  }

  const costs = calculateCosts(parameters)

  // 參數更新處理
  const handleParameterChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: parseInt(value)
    }))
  }

  // 格式化參數顯示
  const formatParameterValue = (key, value) => {
    switch(key) {
      case 'gf':
      case 'gs':
      case 'carbonPrice':
        return `$${value.toLocaleString()}`
      case 'price':
        return `$${value}`
      case 'cycle':
        return `${value}天`
      default:
        return value
    }
  }

  // 重置參數
  const resetParameters = () => {
    setParameters({
      gf: 3000,
      gs: 2500,
      price: 85,
      cycle: 45,
      carbonPrice: 120
    })
  }

  // 計算模型
  const calculateModel = () => {
    setCalculating(true)
    setTimeout(() => {
      setCalculating(false)
    }, 800)
  }

  // 保存模型
  const saveModel = (modelName) => {
    const newModel = {
      id: Date.now(),
      name: modelName,
      ...parameters,
      totalCost: costs.total,
      createdAt: new Date().toISOString().split('T')[0]
    }
    setSavedModels(prev => [newModel, ...prev])
    setShowSaveModal(false)
  }

  // 載入已保存的模型
  const loadModel = (model) => {
    setParameters({
      gf: model.gf,
      gs: model.gs,
      price: model.price,
      cycle: model.cycle,
      carbonPrice: model.carbonPrice
    })
  }

  // 判斷是否接近最優
  const isNearOptimal = () => {
    return Math.abs(parameters.gf - 3300) <= 300 && 
           Math.abs(parameters.gs - 2200) <= 300 && 
           Math.abs(parameters.price - 88) <= 3
  }

  // 獲取參數標籤
  const getParameterLabel = (key) => {
    const labels = {
      gf: '製造階段投資 (Gf)',
      gs: '零售階段投資 (Gs)',
      price: '產品定價 (p)',
      cycle: '生產週期 (T)',
      carbonPrice: '碳價 (每噸/$)'
    }
    return labels[key] || key
  }

  // 獲取參數範圍
  const getParameterRange = (key) => {
    const ranges = {
      gf: { min: 1000, max: 5000, step: 100 },
      gs: { min: 1000, max: 5000, step: 100 },
      price: { min: 50, max: 120, step: 1 },
      cycle: { min: 20, max: 90, step: 1 },
      carbonPrice: { min: 50, max: 300, step: 5 }
    }
    return ranges[key] || { min: 0, max: 100, step: 1 }
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
        <h1 className="page-title">碳排模型決策系統</h1>
        <p className="page-subtitle">透過模型模擬調整參數，最佳化減碳投資與策略決策</p>
      </div>

      {/* 標籤頁導航 */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-body" style={{ padding: '1rem' }}>
          <div style={{ 
            display: 'flex', 
            gap: '0.5rem', 
            backgroundColor: '#f8fafc', 
            padding: '0.25rem', 
            borderRadius: '0.75rem',
            overflowX: 'auto'
          }}>
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`btn ${activeTab === index ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  whiteSpace: 'nowrap',
                  fontSize: '0.875rem',
                  padding: '0.5rem 1rem'
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 標籤頁內容 */}
      {activeTab === 0 && (
        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {/* 參數設定卡片 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">參數設定</h3>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => setShowSaveModal(true)}
              >
                保存模型
              </button>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {Object.entries(parameters).map(([key, value]) => (
                  <ParameterControl
                    key={key}
                    label={getParameterLabel(key)}
                    value={value}
                    displayValue={formatParameterValue(key, value)}
                    onChange={(newValue) => handleParameterChange(key, newValue)}
                    min={getParameterRange(key).min}
                    max={getParameterRange(key).max}
                    step={getParameterRange(key).step}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button 
                  onClick={calculateModel}
                  className="btn btn-primary"
                  style={{ flex: 1 }}
                  disabled={calculating}
                >
                  {calculating ? '計算中...' : '計算模型'}
                </button>
                <button 
                  onClick={resetParameters}
                  className="btn btn-outline"
                  style={{ flex: 1 }}
                >
                  重置預設值
                </button>
              </div>
            </div>
          </div>

          {/* 總成本構成卡片 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">總成本構成</h3>
              <span className={`status-badge ${isNearOptimal() ? 'status-online' : 'status-maintenance'}`}>
                {isNearOptimal() ? '接近最佳點' : '可優化空間'}
              </span>
            </div>
            <div className="card-body">
              <div style={{ height: '200px', marginBottom: '1.5rem' }}>
                <CostChart costs={costs} />
              </div>
              
              <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
                <CostItem label="總成本" value={costs.total} />
                <CostItem label="碳減投資" value={costs.investment} />
                <CostItem label="採購成本" value={costs.procurement} />
                <CostItem label="碳排成本" value={costs.carbon} />
              </div>
            </div>
          </div>

          {/* 決策建議卡片 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">決策建議</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <RecommendationCard
                  title="成本最小化建議"
                  content={`基於當前碳價 ($${parameters.carbonPrice}/噸)，建議調整參數至：Gf=$3,300，Gs=$2,200，價格=$88，可使總成本下降約 ${((costs.total - 14500) / costs.total * 100).toFixed(1)}%。`}
                  type="primary"
                />
                
                <RecommendationCard
                  title="碳風險管理建議"
                  content={`若碳價上漲至 $${Math.round(parameters.carbonPrice * 1.5)}/噸，建議提前增加製造階段投資至 $4,200 並縮短生產週期至 ${Math.max(25, parameters.cycle - 10)} 天以降低風險。`}
                  type="info"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 其他標籤頁的佔位內容 */}
      {activeTab !== 0 && (
        <div className="card">
          <div className="card-body" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
            <h3 style={{ marginBottom: '0.5rem' }}>{tabs[activeTab]}</h3>
            <p style={{ color: '#64748b' }}>此模組正在開發中，敬請期待...</p>
          </div>
        </div>
      )}

      {/* 已保存的模型 */}
      {savedModels.length > 0 && (
        <div className="card" style={{ marginTop: '1.5rem' }}>
          <div className="card-header">
            <h3 className="card-title">已保存的模型</h3>
            <span className="text-secondary">{savedModels.length} 個模型</span>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-3" style={{ gap: '1rem' }}>
              {savedModels.map((model) => (
                <div 
                  key={model.id} 
                  className="card"
                  style={{ 
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: '1px solid #e5e7eb'
                  }}
                  onClick={() => loadModel(model)}
                >
                  <div className="card-body" style={{ padding: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem' }}>{model.name}</h4>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.75rem' }}>
                      總成本: ${model.totalCost.toLocaleString()}
                    </p>
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                      創建於: {model.createdAt}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 保存模型模態框 */}
      {showSaveModal && (
        <SaveModelModal 
          onSave={saveModel}
          onClose={() => setShowSaveModal(false)}
        />
      )}
    </Layout>
  )
}

// 參數控制組件
function ParameterControl({ label, value, displayValue, onChange, min, max, step }) {
  return (
    <div>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '0.5rem' 
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
          {label}
        </span>
        <span style={{ 
          fontSize: '0.875rem', 
          fontWeight: '600', 
          color: '#3b82f6',
          backgroundColor: '#eff6ff',
          padding: '0.25rem 0.5rem',
          borderRadius: '0.375rem'
        }}>
          {displayValue}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '0.5rem',
          borderRadius: '0.25rem',
          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((value - min) / (max - min)) * 100}%, #e5e7eb ${((value - min) / (max - min)) * 100}%, #e5e7eb 100%)`,
          outline: 'none',
          appearance: 'none'
        }}
      />
    </div>
  )
}

// 成本項目組件
function CostItem({ label, value }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
        ${value.toLocaleString()}
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</div>
    </div>
  )
}

// 建議卡片組件
function RecommendationCard({ title, content, type = 'primary' }) {
  const bgColor = type === 'primary' ? '#f0fdf4' : '#eff6ff'
  const borderColor = type === 'primary' ? '#bbf7d0' : '#bfdbfe'
  const titleColor = type === 'primary' ? '#166534' : '#1e40af'
  const contentColor = type === 'primary' ? '#15803d' : '#2563eb'
  
  return (
    <div style={{
      backgroundColor: bgColor,
      border: `1px solid ${borderColor}`,
      borderRadius: '0.5rem',
      padding: '1rem'
    }}>
      <h4 style={{ 
        fontWeight: '500', 
        color: titleColor, 
        marginBottom: '0.5rem',
        fontSize: '0.875rem'
      }}>
        {title}
      </h4>
      <p style={{ 
        fontSize: '0.8125rem', 
        color: contentColor,
        lineHeight: '1.4',
        margin: 0
      }}>
        {content}
      </p>
    </div>
  )
}

// 成本圖表組件
function CostChart({ costs }) {
  const data = [
    { name: '碳減投資', value: costs.investment, color: '#3b82f6', percentage: (costs.investment / costs.total * 100).toFixed(1) },
    { name: '採購成本', value: costs.procurement, color: '#10b981', percentage: (costs.procurement / costs.total * 100).toFixed(1) },
    { name: '碳排成本', value: costs.carbon, color: '#f59e0b', percentage: (costs.carbon / costs.total * 100).toFixed(1) }
  ]

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      padding: '1rem' 
    }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
          成本構成分析
        </h4>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937' }}>
          ${costs.total.toLocaleString()}
        </div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>總成本</div>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {data.map((item, index) => (
          <div key={item.name}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '0.25rem' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ 
                  width: '0.75rem', 
                  height: '0.75rem', 
                  borderRadius: '50%', 
                  backgroundColor: item.color 
                }} />
                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  {item.name}
                </span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
                  ${item.value.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{item.percentage}%</div>
              </div>
            </div>
            <div style={{ 
              width: '100%', 
              backgroundColor: '#e5e7eb', 
              borderRadius: '0.25rem', 
              height: '0.5rem',
              overflow: 'hidden'
            }}>
              <div style={{ 
                height: '0.5rem', 
                borderRadius: '0.25rem',
                backgroundColor: item.color,
                width: `${item.percentage}%`,
                transition: 'width 0.5s ease'
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// 保存模型模態框
function SaveModelModal({ onSave, onClose }) {
  const [modelName, setModelName] = useState('')

  const handleSave = () => {
    if (modelName.trim()) {
      onSave(modelName.trim())
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        minWidth: '400px',
        maxWidth: '90vw'
      }}>
        <h3 style={{ marginBottom: '1rem' }}>保存模型</h3>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ 
            display: 'block', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            marginBottom: '0.5rem' 
          }}>
            模型名稱
          </label>
          <input
            type="text"
            value={modelName}
            onChange={(e) => setModelName(e.target.value)}
            placeholder="請輸入模型名稱"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              fontSize: '1rem',
              outline: 'none'
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && modelName.trim()) {
                handleSave()
              }
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            style={{ flex: 1 }}
          >
            取消
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleSave}
            disabled={!modelName.trim()}
            style={{ flex: 1 }}
          >
            保存
          </button>
        </div>
      </div>
    </div>
  )
}