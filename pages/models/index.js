// pages/models/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/layout'

// 詳細模型參數常數定義
const MODEL_CONSTANTS = {
  // 製造商參數
  Tf: 35,          // 製造商基準週期
  R: 8500,         // 啟動固定成本
  A: 42,           // 單位生產碳排係數  
  F: 6.8,          // 庫存碳排係數
  Ef: 2200,        // 運輸固定碳排量
  Ev: 12,          // 運輸變動碳排係數
  Wf: 4500,        // 製程額外碳懲罰
  
  // 零售商參數
  c: 78,           // 單位採購成本
  s: 3200,         // 固定訂購成本
  h: 15.5,         // 庫存持有成本係數
  K: 8.2,          // 碳排庫存係數
  Efs: 1800,       // 零售商固定運輸碳排
  Evs: 9.5,        // 零售商變動運輸碳排係數
  O: 2500,         // 其他碳懲罰固定成本
  S: 6.8,          // 其他碳懲罰變動係數
  Ws: 3200,        // 額外處理碳懲罰
  
  // 市場與風險參數
  a: 15000,        // 基礎需求量
  b: 120,          // 價格敏感度係數
  gamma: 850,      // 價格風險係數
  delta: 1200,     // CRM風險係數
  
  // 碳價
  C: 180,          // 碳價 ($/噸)
}

// 模擬 API 數據
const mockModelData = {
  parameters: {
    gf: 2800,   // 製造階段投資
    tf: 35,     // 製造商週期
    gs: 2200,   // 零售階段投資
    t: 25,      // 零售商週期
    price: 88,  // 產品定價
    crm: 1500   // CRM投資
  },
  savedModels: [
    { id: 1, name: '基準模型', gf: 2800, tf: 35, gs: 2200, t: 25, price: 88, crm: 1500, totalCost: 182450, createdAt: '2024-01-15' },
    { id: 2, name: '成本優化模型', gf: 3200, tf: 32, gs: 2600, t: 22, price: 90, crm: 1200, totalCost: 175800, createdAt: '2024-01-14' },
    { id: 3, name: '高效減排模型', gf: 4500, tf: 28, gs: 3800, t: 20, price: 95, crm: 1800, totalCost: 189200, createdAt: '2024-01-13' },
    { id: 4, name: '平衡策略模型', gf: 3500, tf: 30, gs: 2800, t: 24, price: 92, crm: 1400, totalCost: 178900, createdAt: '2024-01-12' }
  ]
}

export default function ModelsPage() {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(0)
  const [parameters, setParameters] = useState({
    gf: 2800,   // 製造階段投資
    tf: 35,     // 製造商週期
    gs: 2200,   // 零售階段投資
    t: 25,      // 零售商週期
    price: 88,  // 產品定價
    crm: 1500   // CRM投資
  })
  const [savedModels, setSavedModels] = useState([])
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [calculating, setCalculating] = useState(false)
  const [sensitivityData, setSensitivityData] = useState(null)
  const [selectedVariable, setSelectedVariable] = useState('gf')
  const [costBreakdown, setCostBreakdown] = useState(null)

  useEffect(() => {
    fetchModelData()
  }, [])

  // 碳效率函數
  const carbonEfficiency = (investment) => {
    return Math.log(1 + investment) / (1 + Math.log(1 + investment))
  }

  // 需求函數
  const calculateDemand = (price, crm) => {
    const { a, b } = MODEL_CONSTANTS
    return Math.max(1000, a - b * (1 + crm/10000) * price)
  }

  // 製造商成本計算 (使用新的詳細公式)
  const calculateManufacturerCost = (gf, tf, price, crm) => {
    const H = calculateDemand(price, crm) // 需求量
    const { R, A, F, Ef, Ev, Wf, C } = MODEL_CONSTANTS
    const phi_gf = carbonEfficiency(gf)
    
    // 各項成本計算
    const investmentCost = gf / tf
    const startupCarbonCost = (R * C / tf) * (1 - phi_gf)
    const productionCarbonCost = H * A * C * (1 - phi_gf)
    const storageCarbonCost = (H * H * tf * F * C / 2) * (1 - phi_gf)
    const transportFixedCarbonCost = (Ef * C / tf) * (1 - phi_gf)
    const transportVariableCarbonCost = H * Ev * C * (1 - phi_gf)
    const additionalCarbonPenalty = Wf * C * (1 - phi_gf)
    
    const totalCost = investmentCost + startupCarbonCost + productionCarbonCost + 
                     storageCarbonCost + transportFixedCarbonCost + 
                     transportVariableCarbonCost + additionalCarbonPenalty
    
    return {
      total: totalCost,
      breakdown: {
        investment: investmentCost,
        startupCarbon: startupCarbonCost,
        productionCarbon: productionCarbonCost,
        storageCarbon: storageCarbonCost,
        transportFixedCarbon: transportFixedCarbonCost,
        transportVariableCarbon: transportVariableCarbonCost,
        additionalPenalty: additionalCarbonPenalty
      }
    }
  }

  // 零售商成本計算 (使用新的詳細公式)
  const calculateRetailerCost = (gs, t, price, crm) => {
    const D = calculateDemand(price, crm)
    const { c, s, h, K, Efs, Evs, O, S, Ws, gamma, delta, C } = MODEL_CONSTANTS
    const phi_gs = carbonEfficiency(gs)
    
    // 各項成本計算
    const procurementCost = D * c / t
    const crmCost = crm
    const orderingCost = s / t
    const holdingCarbonCost = (D * D * (h + K * C * (1 - phi_gs))) / (2 * t)
    const transportCarbonCost = (Efs * C * (1 - phi_gs) + D * Evs * C * (1 - phi_gs)) / t
    const otherCarbonPenalty = (O * C * (1 - phi_gs)) / t
    const additionalCarbonPenalty = (D * S * C * (1 - phi_gs)) / t
    const investmentCost = gs / t
    const extraProcessingPenalty = Ws * C * (1 - phi_gs)
    const priceRisk = (gamma * price * price) / (2 * t)
    const crmRisk = (delta * crm * crm) / (2 * t)
    
    const totalCost = procurementCost + crmCost + orderingCost + holdingCarbonCost +
                     transportCarbonCost + otherCarbonPenalty + additionalCarbonPenalty +
                     investmentCost + extraProcessingPenalty + priceRisk + crmRisk
    
    return {
      total: totalCost,
      breakdown: {
        procurement: procurementCost,
        crm: crmCost,
        ordering: orderingCost,
        holdingCarbon: holdingCarbonCost,
        transportCarbon: transportCarbonCost,
        otherPenalty: otherCarbonPenalty,
        additionalPenalty: additionalCarbonPenalty,
        investment: investmentCost,
        extraProcessing: extraProcessingPenalty,
        priceRisk: priceRisk,
        crmRisk: crmRisk
      }
    }
  }

  // 總成本計算
  const calculateTotalCost = (params) => {
    const manufacturerResult = calculateManufacturerCost(params.gf, params.tf, params.price, params.crm)
    const retailerResult = calculateRetailerCost(params.gs, params.t, params.price, params.crm)
    
    return {
      manufacturer: Math.round(manufacturerResult.total),
      retailer: Math.round(retailerResult.total),
      total: Math.round(manufacturerResult.total + retailerResult.total),
      manufacturerBreakdown: manufacturerResult.breakdown,
      retailerBreakdown: retailerResult.breakdown
    }
  }

  // 敏感度分析計算 (修復曲線不完整問題)
  const calculateSensitivityAnalysis = (variable) => {
    const ranges = {
      gf: { min: 1000, max: 8000, step: 100 },
      tf: { min: 20, max: 60, step: 1 },
      gs: { min: 800, max: 6000, step: 100 },
      t: { min: 15, max: 50, step: 1 },
      price: { min: 60, max: 120, step: 1 },
      crm: { min: 500, max: 4000, step: 100 }
    }
    
    const range = ranges[variable]
    const data = []
    
    // 確保生成足夠的數據點
    for (let value = range.min; value <= range.max; value += range.step) {
      const testParams = { ...parameters, [variable]: value }
      const costs = calculateTotalCost(testParams)
      
      data.push({
        value: Math.round(value * 100) / 100,
        totalCost: costs.total,
        manufacturerCost: costs.manufacturer,
        retailerCost: costs.retailer
      })
    }
    
    return data
  }

  // 計算敏感度指標
  const calculateSensitivityMetrics = (data) => {
    if (data.length < 2) return { sensitivity: 0, elasticity: 0, variance: 0 }
    
    const costs = data.map(d => d.totalCost)
    const values = data.map(d => d.value)
    
    const costChange = (Math.max(...costs) - Math.min(...costs)) / Math.min(...costs) * 100
    const valueChange = (Math.max(...values) - Math.min(...values)) / Math.min(...values) * 100
    const elasticity = valueChange > 0 ? costChange / valueChange : 0
    
    const meanCost = costs.reduce((a, b) => a + b, 0) / costs.length
    const variance = costs.reduce((sum, cost) => sum + Math.pow(cost - meanCost, 2), 0) / costs.length
    
    const optimalPoint = data.reduce((min, current) => 
      current.totalCost < min.totalCost ? current : min
    )
    
    return {
      sensitivity: Math.abs(elasticity),
      elasticity: elasticity,
      variance: Math.sqrt(variance),
      minCost: Math.min(...costs),
      maxCost: Math.max(...costs),
      optimalValue: optimalPoint.value,
      optimalCost: optimalPoint.totalCost
    }
  }

  const fetchModelData = async () => {
    try {
      setLoading(true)
      setTimeout(() => {
        setParameters(mockModelData.parameters)
        setSavedModels(mockModelData.savedModels)
        setLoading(false)
      }, 1000)
    } catch (error) {
      console.error('獲取模型數據失敗:', error)
      setParameters(mockModelData.parameters)
      setSavedModels(mockModelData.savedModels)
      setLoading(false)
    }
  }

  // 執行敏感度分析
  const performSensitivityAnalysis = () => {
    const analysisData = {}
    const variables = ['gf', 'tf', 'gs', 't', 'price', 'crm']
    
    variables.forEach(variable => {
      const data = calculateSensitivityAnalysis(variable)
      const metrics = calculateSensitivityMetrics(data)
      analysisData[variable] = {
        data,
        metrics,
        label: getParameterLabel(variable)
      }
    })
    
    setSensitivityData(analysisData)
  }

  // 計算詳細成本分解
  const calculateDetailedCostBreakdown = () => {
    const costs = calculateTotalCost(parameters)
    const demand = calculateDemand(parameters.price, parameters.crm)
    
    setCostBreakdown({
      total: costs.total,
      manufacturer: costs.manufacturer,
      retailer: costs.retailer,
      manufacturerBreakdown: costs.manufacturerBreakdown,
      retailerBreakdown: costs.retailerBreakdown,
      demand: demand,
      carbonEfficiencyManufacturer: carbonEfficiency(parameters.gf),
      carbonEfficiencyRetailer: carbonEfficiency(parameters.gs)
    })
  }

  useEffect(() => {
    if (!loading) {
      performSensitivityAnalysis()
      calculateDetailedCostBreakdown()
    }
  }, [parameters, loading])

  // 標籤頁配置
  const tabs = ['模型設定', '成本分析', '碳排來源', '敏感度', '決策地圖', '策略比較']

  // 參數更新處理
  const handleParameterChange = (key, value) => {
    setParameters(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }))
  }

  // 格式化參數顯示
  const formatParameterValue = (key, value) => {
    switch(key) {
      case 'gf':
      case 'gs':
      case 'crm':
        return `$${value.toLocaleString()}`
      case 'price':
        return `$${value}`
      case 'tf':
      case 't':
        return `${value}天`
      default:
        return value
    }
  }

  // 重置參數
  const resetParameters = () => {
    setParameters({
      gf: 2800,
      tf: 35,
      gs: 2200,
      t: 25,
      price: 88,
      crm: 1500
    })
  }

  // 計算模型
  const calculateModel = () => {
    setCalculating(true)
    setTimeout(() => {
      setCalculating(false)
      performSensitivityAnalysis()
      calculateDetailedCostBreakdown()
    }, 800)
  }

  // 保存模型
  const saveModel = (modelName) => {
    const costs = calculateTotalCost(parameters)
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
      tf: model.tf,
      gs: model.gs,
      t: model.t,
      price: model.price,
      crm: model.crm || 1500
    })
  }

  // 獲取參數標籤
  const getParameterLabel = (key) => {
    const labels = {
      gf: '製造階段投資 (Gf)',
      tf: '製造商週期 (Tf)',
      gs: '零售階段投資 (Gs)',
      t: '零售商週期 (T)',
      price: '產品定價 (p)',
      crm: 'CRM投資 (m)'
    }
    return labels[key] || key
  }

  // 獲取參數範圍
  const getParameterRange = (key) => {
    const ranges = {
      gf: { min: 1000, max: 8000, step: 50 },
      tf: { min: 20, max: 60, step: 1 },
      gs: { min: 800, max: 6000, step: 50 },
      t: { min: 15, max: 50, step: 1 },
      price: { min: 60, max: 120, step: 1 },
      crm: { min: 500, max: 4000, step: 50 }
    }
    return ranges[key] || { min: 0, max: 100, step: 1 }
  }

  // 判斷是否接近最優
  const isNearOptimal = () => {
    if (!sensitivityData) return false
    const costs = calculateTotalCost(parameters)
    return costs.total < 180000
  }

  const costs = calculateTotalCost(parameters)

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
        <p className="page-subtitle">基於詳細數學模型的碳排成本分析與最佳化決策支援系統</p>
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

      {/* 模型設定標籤頁 */}
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
                  {calculating ? '計算中...' : '重新計算'}
                </button>
                <button 
                  onClick={resetParameters}
                  className="btn btn-secondary"
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
              <h3 className="card-title">成本構成總覽</h3>
              <span className={`status-badge ${isNearOptimal() ? 'status-online' : 'status-maintenance'}`}>
                {isNearOptimal() ? '接近最佳點' : '可優化空間'}
              </span>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                <CostItem label="總成本" value={costs.total} type="total" />
                <CostItem label="製造商成本" value={costs.manufacturer} type="manufacturer" />
                <CostItem label="零售商成本" value={costs.retailer} type="retailer" />
              </div>
              
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                  成本構成比例
                </div>
                <CostBreakdownChart costs={costs} />
              </div>
              
              <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '0.5rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                  碳效率指標
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#6b7280' }}>
                  <span>製造商: {(carbonEfficiency(parameters.gf) * 100).toFixed(1)}%</span>
                  <span>零售商: {(carbonEfficiency(parameters.gs) * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 決策建議卡片 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">智能決策建議</h3>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <RecommendationCard
                  title="成本最佳化建議"
                  content={`當前總成本為 $${costs.total.toLocaleString()}。根據數學模型分析，建議製造階段投資調整至 $3,200-3,800 範圍，製造週期優化至 28-32 天，預期可降低總成本 8-15%。`}
                  type="primary"
                />
                
                <RecommendationCard
                  title="碳效率提升建議"
                  content={`當前碳價 $${MODEL_CONSTANTS.C}/噸，製造商碳效率 ${(carbonEfficiency(parameters.gf) * 100).toFixed(1)}%。建議提升製造階段投資至 $4,000 以上，可顯著改善碳效率至 75% 以上。`}
                  type="info"
                />
                
                <RecommendationCard
                  title="需求與定價策略"
                  content={`當前需求量 ${calculateDemand(parameters.price, parameters.crm).toLocaleString()} 單位。若提升 CRM 投資至 $${(parameters.crm * 1.2).toLocaleString()}，可在維持價格下增加需求約 12-18%。`}
                  type="warning"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 成本分析標籤頁 */}
      {activeTab === 1 && costBreakdown && (
        <div>
          <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* 製造商成本分解 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">製造商成本分解</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  總計: ${costBreakdown.manufacturer.toLocaleString()}
                </div>
              </div>
              <div className="card-body">
                <ManufacturerCostBreakdown breakdown={costBreakdown.manufacturerBreakdown} />
              </div>
            </div>

            {/* 零售商成本分解 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">零售商成本分解</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  總計: ${costBreakdown.retailer.toLocaleString()}
                </div>
              </div>
              <div className="card-body">
                <RetailerCostBreakdown breakdown={costBreakdown.retailerBreakdown} />
              </div>
            </div>
          </div>

          {/* 成本趨勢分析 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">成本構成分析圖表</h3>
              <p className="card-subtitle">各項成本佔比與趨勢分析</p>
            </div>
            <div className="card-body">
              <CostAnalysisChart costBreakdown={costBreakdown} />
            </div>
          </div>
        </div>
      )}

      {/* 碳排來源標籤頁 */}
      {activeTab === 2 && costBreakdown && (
        <div>
          <div className="grid grid-cols-3" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* 碳排總覽 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">碳排放總覽</h3>
              </div>
              <div className="card-body">
                <CarbonEmissionOverview 
                  manufacturerBreakdown={costBreakdown.manufacturerBreakdown}
                  retailerBreakdown={costBreakdown.retailerBreakdown}
                  carbonPrice={MODEL_CONSTANTS.C}
                />
              </div>
            </div>

            {/* 碳效率指標 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">碳效率分析</h3>
              </div>
              <div className="card-body">
                <CarbonEfficiencyAnalysis 
                  manufacturerEfficiency={costBreakdown.carbonEfficiencyManufacturer}
                  retailerEfficiency={costBreakdown.carbonEfficiencyRetailer}
                  manufacturerInvestment={parameters.gf}
                  retailerInvestment={parameters.gs}
                />
              </div>
            </div>

            {/* 減排建議 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">減排策略建議</h3>
              </div>
              <div className="card-body">
                <CarbonReductionRecommendations 
                  parameters={parameters}
                  costBreakdown={costBreakdown}
                />
              </div>
            </div>
          </div>

          {/* 碳排來源分布圖 */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">碳排放來源分布</h3>
              <p className="card-subtitle">製造商與零售商各項碳排放詳細分析</p>
            </div>
            <div className="card-body">
              <CarbonSourceDistribution 
                manufacturerBreakdown={costBreakdown.manufacturerBreakdown}
                retailerBreakdown={costBreakdown.retailerBreakdown}
                carbonPrice={MODEL_CONSTANTS.C}
              />
            </div>
          </div>
        </div>
      )}

      {/* 敏感度分析標籤頁 */}
      {activeTab === 3 && sensitivityData && (
        <div>
          {/* 變數選擇器 */}
          <div className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="card-header">
              <h3 className="card-title">敏感度分析</h3>
              <p className="card-subtitle">分析各參數對總成本的影響程度</p>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.keys(sensitivityData).map(variable => (
                  <button
                    key={variable}
                    onClick={() => setSelectedVariable(variable)}
                    className={`btn ${selectedVariable === variable ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                  >
                    {getParameterLabel(variable)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
            {/* 敏感度指標卡片 */}
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">敏感度指標</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {sensitivityData[selectedVariable]?.label}
                </div>
              </div>
              <div className="card-body">
                <SensitivityMetrics 
                  metrics={sensitivityData[selectedVariable]?.metrics}
                  currentValue={parameters[selectedVariable]}
                  formatValue={(value) => formatParameterValue(selectedVariable, value)}
                />
              </div>
            </div>

            {/* 敏感度圖表 */}
            <div className="card" style={{ gridColumn: 'span 2' }}>
              <div className="card-header">
                <h3 className="card-title">敏感度曲線</h3>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  固定其他變數，分析 {sensitivityData[selectedVariable]?.label} 對成本的影響
                </div>
              </div>
              <div className="card-body">
                <SensitivityChart 
                  data={sensitivityData[selectedVariable]?.data}
                  currentValue={parameters[selectedVariable]}
                  variable={selectedVariable}
                  formatValue={(value) => formatParameterValue(selectedVariable, value)}
                />
              </div>
            </div>
          </div>

          {/* 全變數敏感度比較 */}
          <div className="card" style={{ marginTop: '1.5rem' }}>
            <div className="card-header">
              <h3 className="card-title">全變數敏感度比較</h3>
              <p className="card-subtitle">比較所有變數的敏感度指標，數值越高表示該變數對成本影響越大</p>
            </div>
            <div className="card-body">
              <SensitivityComparisonChart sensitivityData={sensitivityData} />
            </div>
          </div>
        </div>
      )}

      {/* 其他標籤頁的佔位內容 */}
      {activeTab > 3 && (
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
            <div className="grid grid-cols-4" style={{ gap: '1rem' }}>
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '0.75rem', 
        color: '#9ca3af', 
        marginTop: '0.25rem' 
      }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

// 成本項目組件
function CostItem({ label, value, type = 'normal' }) {
  const getColor = () => {
    switch(type) {
      case 'total': return '#1f2937'
      case 'manufacturer': return '#3b82f6'
      case 'retailer': return '#10b981'
      default: return '#1f2937'
    }
  }

  return (
    <div style={{ 
      textAlign: 'center',
      padding: '1rem',
      backgroundColor: type === 'total' ? '#f8fafc' : '#ffffff',
      borderRadius: '0.5rem',
      border: type === 'total' ? '2px solid #e2e8f0' : '1px solid #f3f4f6',
      overflowX: 'auto', // 允許橫向滾動
      whiteSpace: 'nowrap', // 防止數字自動換行
      maxWidth: '100%' // 保證不超出父容器
    }}>
      <div style={{ 
        fontSize: type === 'total' ? '1.75rem' : '1.5rem', 
        fontWeight: 'bold', 
        color: getColor(),
        marginBottom: '0.25rem',
        wordBreak: 'break-all', // 長數字自動換行
        overflowX: 'auto'
      }}>
        ${value.toLocaleString()}
      </div>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{label}</div>
    </div>
  )
}

// 建議卡片組件
function RecommendationCard({ title, content, type = 'primary' }) {
  const getStyles = () => {
    switch(type) {
      case 'primary':
        return {
          bg: '#f0fdf4',
          border: '#bbf7d0',
          title: '#166534',
          content: '#15803d'
        }
      case 'info':
        return {
          bg: '#eff6ff',
          border: '#bfdbfe',
          title: '#1e40af',
          content: '#2563eb'
        }
      case 'warning':
        return {
          bg: '#fffbeb',
          border: '#fed7aa',
          title: '#92400e',
          content: '#d97706'
        }
      default:
        return {
          bg: '#f8fafc',
          border: '#e2e8f0',
          title: '#374151',
          content: '#6b7280'
        }
    }
  }

  const styles = getStyles()
  
  return (
    <div style={{
      backgroundColor: styles.bg,
      border: `1px solid ${styles.border}`,
      borderRadius: '0.5rem',
      padding: '1rem'
    }}>
      <h4 style={{ 
        fontWeight: '500', 
        color: styles.title, 
        marginBottom: '0.5rem',
        fontSize: '0.875rem'
      }}>
        {title}
      </h4>
      <p style={{ 
        fontSize: '0.8125rem', 
        color: styles.content,
        lineHeight: '1.4',
        margin: 0
      }}>
        {content}
      </p>
    </div>
  )
}

// 成本構成圖表組件
function CostBreakdownChart({ costs }) {
  const total = costs.total
  const manufacturerPercentage = (costs.manufacturer / total * 100).toFixed(1)
  const retailerPercentage = (costs.retailer / total * 100).toFixed(1)
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div>
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
              backgroundColor: '#3b82f6' 
            }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
              製造商成本
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
              ${costs.manufacturer.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{manufacturerPercentage}%</div>
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
            backgroundColor: '#3b82f6',
            width: `${manufacturerPercentage}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>

      <div>
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
              backgroundColor: '#10b981' 
            }} />
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
              零售商成本
            </span>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
              ${costs.retailer.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{retailerPercentage}%</div>
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
            backgroundColor: '#10b981',
            width: `${retailerPercentage}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
      </div>
    </div>
  )
}

// 製造商成本分解組件
function ManufacturerCostBreakdown({ breakdown }) {
  const items = [
    { key: 'investment', label: '投資攤提', value: breakdown.investment, color: '#3b82f6' },
    { key: 'startupCarbon', label: '啟動碳成本', value: breakdown.startupCarbon, color: '#ef4444' },
    { key: 'productionCarbon', label: '生產碳排放', value: breakdown.productionCarbon, color: '#f59e0b' },
    { key: 'storageCarbon', label: '儲存碳成本', value: breakdown.storageCarbon, color: '#10b981' },
    { key: 'transportFixedCarbon', label: '運輸固定碳成本', value: breakdown.transportFixedCarbon, color: '#8b5cf6' },
    { key: 'transportVariableCarbon', label: '運輸變動碳成本', value: breakdown.transportVariableCarbon, color: '#06b6d4' },
    { key: 'additionalPenalty', label: '額外碳懲罰', value: breakdown.additionalPenalty, color: '#f97316' }
  ]

  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.map(item => {
        const percentage = ((item.value / total) * 100).toFixed(1)
        return (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '0.5rem', 
              height: '0.5rem', 
              borderRadius: '50%', 
              backgroundColor: item.color,
              flexShrink: 0
            }} />
            <div style={{ flex: 1, fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>{item.label}</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>
                  ${Math.round(item.value).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{percentage}%</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// 零售商成本分解組件
function RetailerCostBreakdown({ breakdown }) {
  const items = [
    { key: 'procurement', label: '採購成本', value: breakdown.procurement, color: '#3b82f6' },
    { key: 'crm', label: 'CRM投資', value: breakdown.crm, color: '#10b981' },
    { key: 'ordering', label: '訂購成本', value: breakdown.ordering, color: '#f59e0b' },
    { key: 'holdingCarbon', label: '庫存與碳成本', value: breakdown.holdingCarbon, color: '#ef4444' },
    { key: 'transportCarbon', label: '運輸碳成本', value: breakdown.transportCarbon, color: '#8b5cf6' },
    { key: 'otherPenalty', label: '其他碳懲罰', value: breakdown.otherPenalty, color: '#06b6d4' },
    { key: 'additionalPenalty', label: '額外碳懲罰', value: breakdown.additionalPenalty, color: '#f97316' },
    { key: 'investment', label: '投資攤提', value: breakdown.investment, color: '#84cc16' },
    { key: 'extraProcessing', label: '額外處理成本', value: breakdown.extraProcessing, color: '#ec4899' },
    { key: 'priceRisk', label: '價格風險', value: breakdown.priceRisk, color: '#6366f1' },
    { key: 'crmRisk', label: 'CRM風險', value: breakdown.crmRisk, color: '#14b8a6' }
  ]

  const total = Object.values(breakdown).reduce((sum, value) => sum + value, 0)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {items.filter(item => item.value > 0).map(item => {
        const percentage = ((item.value / total) * 100).toFixed(1)
        return (
          <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              width: '0.5rem', 
              height: '0.5rem', 
              borderRadius: '50%', 
              backgroundColor: item.color,
              flexShrink: 0
            }} />
            <div style={{ flex: 1, fontSize: '0.8125rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#374151' }}>{item.label}</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>
                  ${Math.round(item.value).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{percentage}%</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// 成本分析圖表組件
function CostAnalysisChart({ costBreakdown }) {
  const manufacturerItems = Object.entries(costBreakdown.manufacturerBreakdown)
  const retailerItems = Object.entries(costBreakdown.retailerBreakdown)
  
  return (
    <div style={{ height: '400px', display: 'flex', gap: '2rem' }}>
      {/* 製造商成本圓餅圖概念 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>製造商成本構成</h4>
        <div style={{ 
          height: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#3b82f6' }}>
              ${costBreakdown.manufacturer.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>總計</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {manufacturerItems.slice(0, 5).map(([key, value], index) => {
              const percentage = (value / costBreakdown.manufacturer * 100).toFixed(1)
              return (
                <div key={key} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#f1f5f9',
                  borderRadius: '0.25rem'
                }}>
                  <span style={{ fontSize: '0.8125rem' }}>{key}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 零售商成本圓餅圖概念 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>零售商成本構成</h4>
        <div style={{ 
          height: '300px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center',
          backgroundColor: '#f0fdf4',
          borderRadius: '0.5rem',
          padding: '1rem'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>
              ${costBreakdown.retailer.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>總計</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {retailerItems.filter(([key, value]) => value > 0).slice(0, 5).map(([key, value], index) => {
              const percentage = (value / costBreakdown.retailer * 100).toFixed(1)
              return (
                <div key={key} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem',
                  backgroundColor: index % 2 === 0 ? '#ffffff' : '#ecfdf5',
                  borderRadius: '0.25rem'
                }}>
                  <span style={{ fontSize: '0.8125rem' }}>{key}</span>
                  <span style={{ fontSize: '0.8125rem', fontWeight: '600' }}>{percentage}%</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// 碳排放總覽組件
function CarbonEmissionOverview({ manufacturerBreakdown, retailerBreakdown, carbonPrice }) {
  // 估算碳排放量 (成本除以碳價)
  const manufacturerCarbon = (
    manufacturerBreakdown.startupCarbon + 
    manufacturerBreakreakdown.productionCarbon + 
    manufacturerBreakdown.storageCarbon + 
    manufacturerBreakdown.transportFixedCarbon + 
    manufacturerBreakdown.transportVariableCarbon + 
    manufacturerBreakdown.additionalPenalty
  ) / carbonPrice

  const retailerCarbon = (
    retailerBreakdown.holdingCarbon + 
    retailerBreakdown.transportCarbon + 
    retailerBreakdown.otherPenalty + 
    retailerBreakdown.additionalPenalty + 
    retailerBreakdown.extraProcessing
  ) / carbonPrice * 0.6 // 部分為碳相關成本

  const totalCarbon = manufacturerCarbon + retailerCarbon

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#ef4444', marginBottom: '0.5rem' }}>
          {totalCarbon.toFixed(1)} 噸
        </div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>總碳排放量</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '0.75rem',
          backgroundColor: '#fef2f2',
          borderRadius: '0.5rem',
          border: '1px solid #fecaca'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>製造商碳排</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{manufacturerCarbon.toFixed(1)} 噸</div>
            <div style={{ fontSize: '0.75rem', color: '#ef4444' }}>
              ${(manufacturerCarbon * carbonPrice).toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          padding: '0.75rem',
          backgroundColor: '#fef7ed',
          borderRadius: '0.5rem',
          border: '1px solid #fed7aa'
        }}>
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>零售商碳排</span>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{retailerCarbon.toFixed(1)} 噸</div>
            <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>
              ${(retailerCarbon * carbonPrice).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <div style={{ 
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '0.5rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '0.875rem', color: '#475569', marginBottom: '0.25rem' }}>
          當前碳價
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: '600', color: '#334155' }}>
          ${carbonPrice}/噸
        </div>
      </div>
    </div>
  )
}

// 碳效率分析組件
function CarbonEfficiencyAnalysis({ manufacturerEfficiency, retailerEfficiency, manufacturerInvestment, retailerInvestment }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          製造商碳效率
        </div>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#3b82f6',
          marginBottom: '0.5rem'
        }}>
          {(manufacturerEfficiency * 100).toFixed(1)}%
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
            backgroundColor: '#3b82f6',
            width: `${manufacturerEfficiency * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
          投資額: ${manufacturerInvestment.toLocaleString()}
        </div>
      </div>

      <div>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          零售商碳效率
        </div>
        <div style={{ 
          fontSize: '2rem', 
          fontWeight: 'bold', 
          color: '#10b981',
          marginBottom: '0.5rem'
        }}>
          {(retailerEfficiency * 100).toFixed(1)}%
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
            backgroundColor: '#10b981',
            width: `${retailerEfficiency * 100}%`,
            transition: 'width 0.5s ease'
          }} />
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
          投資額: ${retailerInvestment.toLocaleString()}
        </div>
      </div>

      <div style={{ 
        padding: '1rem',
        backgroundColor: '#f0fdf4',
        borderRadius: '0.5rem',
        border: '1px solid #bbf7d0'
      }}>
        <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#166534', marginBottom: '0.5rem' }}>
          效率提升建議
        </div>
        <div style={{ fontSize: '0.8125rem', color: '#15803d', lineHeight: '1.4' }}>
          {manufacturerEfficiency < 0.7 && '製造商碳效率偏低，建議增加投資至 $4,000 以上。'}
          {retailerEfficiency < 0.6 && '零售商碳效率有改善空間，建議提升投資至 $3,000 以上。'}
          {manufacturerEfficiency >= 0.7 && retailerEfficiency >= 0.6 && '當前碳效率表現良好，可考慮進一步優化營運流程。'}
        </div>
      </div>
    </div>
  )
}

// 減排策略建議組件
function CarbonReductionRecommendations({ parameters, costBreakdown }) {
  const recommendations = [
    {
      title: '製造階段優化',
      description: `當前製造投資 $${parameters.gf.toLocaleString()}，建議提升至 $${(parameters.gf * 1.3).toLocaleString()} 以提高碳效率。`,
      priority: 'high',
      impact: '可減少 15-25% 製造碳排放'
    },
    {
      title: '週期優化',
      description: `製造週期 ${parameters.tf} 天，零售週期 ${parameters.t} 天，建議分別調整至 28-32 天和 20-22 天。`,
      priority: 'medium',
      impact: '可減少 8-12% 總碳排放'
    },
    {
      title: '供應鏈整合',
      description: '整合製造與零售階段的碳管理，建立統一的碳追蹤系統。',
      priority: 'medium',
      impact: '長期可減少 10-18% 碳排放'
    }
  ]

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return { bg: '#fef2f2', border: '#fecaca', text: '#dc2626' }
      case 'medium': return { bg: '#fffbeb', border: '#fed7aa', text: '#d97706' }
      case 'low': return { bg: '#f0fdf4', border: '#bbf7d0', text: '#059669' }
      default: return { bg: '#f8fafc', border: '#e2e8f0', text: '#64748b' }
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {recommendations.map((rec, index) => {
        const colors = getPriorityColor(rec.priority)
        return (
          <div key={index} style={{
            padding: '1rem',
            backgroundColor: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: '0.5rem'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '0.5rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: colors.text }}>
                {rec.title}
              </h4>
              <span style={{ 
                fontSize: '0.75rem', 
                padding: '0.125rem 0.375rem',
                backgroundColor: colors.text,
                color: 'white',
                borderRadius: '0.25rem',
                textTransform: 'uppercase'
              }}>
                {rec.priority}
              </span>
            </div>
            <p style={{ 
              fontSize: '0.8125rem', 
              color: colors.text, 
              marginBottom: '0.5rem',
              lineHeight: '1.4'
            }}>
              {rec.description}
            </p>
            <div style={{ 
              fontSize: '0.75rem', 
              color: colors.text,
              fontWeight: '500'
            }}>
              預期效果: {rec.impact}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// 碳排來源分布組件
function CarbonSourceDistribution({ manufacturerBreakdown, retailerBreakdown, carbonPrice }) {
  const manufacturerSources = [
    { name: '生產過程', value: manufacturerBreakdown.productionCarbon / carbonPrice, color: '#ef4444' },
    { name: '儲存階段', value: manufacturerBreakdown.storageCarbon / carbonPrice, color: '#f59e0b' },
    { name: '運輸過程', value: (manufacturerBreakdown.transportFixedCarbon + manufacturerBreakdown.transportVariableCarbon) / carbonPrice, color: '#10b981' },
    { name: '啟動設備', value: manufacturerBreakdown.startupCarbon / carbonPrice, color: '#3b82f6' },
    { name: '其他來源', value: manufacturerBreakdown.additionalPenalty / carbonPrice, color: '#8b5cf6' }
  ]

  const retailerSources = [
    { name: '庫存管理', value: retailerBreakdown.holdingCarbon / carbonPrice * 0.6, color: '#ef4444' },
    { name: '運輸配送', value: retailerBreakdown.transportCarbon / carbonPrice, color: '#f59e0b' },
    { name: '額外處理', value: retailerBreakdown.extraProcessing / carbonPrice, color: '#10b981' },
    { name: '其他懲罰', value: (retailerBreakdown.otherPenalty + retailerBreakdown.additionalPenalty) / carbonPrice * 0.5, color: '#3b82f6' }
  ]

  const totalManufacturerCarbon = manufacturerSources.reduce((sum, source) => sum + source.value, 0)
  const totalRetailerCarbon = retailerSources.reduce((sum, source) => sum + source.value, 0)

  return (
    <div style={{ height: '400px', display: 'flex', gap: '2rem' }}>
      {/* 製造商碳排來源 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>
          製造商碳排來源 ({totalManufacturerCarbon.toFixed(1)} 噸)
        </h4>
        <div style={{ height: '300px', position: 'relative' }}>
          <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#ef4444' }}>
              {totalManufacturerCarbon.toFixed(1)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>噸 CO₂</div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            marginTop: '120px'
          }}>
            {manufacturerSources.map((source, index) => {
              const percentage = totalManufacturerCarbon > 0 ? (source.value / totalManufacturerCarbon * 100) : 0
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '0.75rem', 
                    height: '0.75rem', 
                    borderRadius: '50%', 
                    backgroundColor: source.color 
                  }} />
                  <div style={{ flex: 1, fontSize: '0.8125rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{source.name}</span>
                      <span style={{ fontWeight: '600' }}>{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 零售商碳排來源 */}
      <div style={{ flex: 1 }}>
        <h4 style={{ textAlign: 'center', marginBottom: '1rem', fontSize: '1rem' }}>
          零售商碳排來源 ({totalRetailerCarbon.toFixed(1)} 噸)
        </h4>
        <div style={{ height: '300px', position: 'relative' }}>
          <div style={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>
              {totalRetailerCarbon.toFixed(1)}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>噸 CO₂</div>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem',
            marginTop: '120px'
          }}>
            {retailerSources.map((source, index) => {
              const percentage = totalRetailerCarbon > 0 ? (source.value / totalRetailerCarbon * 100) : 0
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ 
                    width: '0.75rem', 
                    height: '0.75rem', 
                    borderRadius: '50%', 
                    backgroundColor: source.color 
                  }} />
                  <div style={{ flex: 1, fontSize: '0.8125rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>{source.name}</span>
                      <span style={{ fontWeight: '600' }}>{percentage.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

// 敏感度指標組件
function SensitivityMetrics({ metrics, currentValue, formatValue }) {
  if (!metrics) return null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
          當前值
        </div>
        <div style={{ 
          fontSize: '1.5rem', 
          fontWeight: 'bold', 
          color: '#1f2937',
          backgroundColor: '#f8fafc',
          padding: '0.5rem',
          borderRadius: '0.5rem'
        }}>
          {formatValue(currentValue)}
        </div>
      </div>

      <div className="grid grid-cols-1" style={{ gap: '0.75rem' }}>
        <MetricItem 
          label="敏感度係數" 
          value={metrics.sensitivity.toFixed(3)}
          description="數值越大表示越敏感"
        />
        <MetricItem 
          label="成本變異度" 
          value={`$${Math.round(metrics.variance).toLocaleString()}`}
          description="成本標準差"
        />
        <MetricItem 
          label="最佳值" 
          value={formatValue(metrics.optimalValue)}
          description="最低成本對應值"
        />
        <MetricItem 
          label="最佳成本" 
          value={`$${Math.round(metrics.optimalCost).toLocaleString()}`}
          description="最優參數下的成本"
        />
      </div>
    </div>
  )
}

function MetricItem({ label, value, description }) {
  return (
    <div style={{ 
      padding: '0.75rem',
      backgroundColor: '#f8fafc',
      borderRadius: '0.5rem',
      border: '1px solid #e2e8f0'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '0.25rem'
      }}>
        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
          {label}
        </span>
        <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>
          {value}
        </span>
      </div>
      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
        {description}
      </div>
    </div>
  )
}

// 敏感度圖表組件 (修復完整曲線顯示)
function SensitivityChart({ data, currentValue, variable, formatValue }) {
  if (!data || data.length === 0) return null

  const maxCost = Math.max(...data.map(d => d.totalCost))
  const minCost = Math.min(...data.map(d => d.totalCost))
  const range = maxCost - minCost
  const padding = range * 0.1 // 10% padding
  
  const chartHeight = 300
  const chartWidth = 500
  
  return (
    <div style={{ height: '350px', position: 'relative' }}>
      {/* Y軸標籤 */}
      <div style={{ 
        position: 'absolute', 
        left: 0, 
        top: 0, 
        bottom: 50, 
        width: '80px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingRight: '8px',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        <span>${Math.round(maxCost + padding).toLocaleString()}</span>
        <span>${Math.round((maxCost + minCost) / 2).toLocaleString()}</span>
        <span>${Math.round(minCost - padding).toLocaleString()}</span>
      </div>

      {/* 圖表區域 */}
      <div style={{ 
        marginLeft: '80px', 
        marginBottom: '50px',
        height: chartHeight, 
        position: 'relative',
        backgroundColor: '#f8fafc',
        borderRadius: '0.5rem',
        border: '1px solid #e2e8f0'
      }}>
        {/* SVG 圖表 */}
        <svg style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          padding: '16px'
        }} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
          {/* 網格線 */}
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
            <line
              key={ratio}
              x1="0"
              x2={chartWidth}
              y1={ratio * chartHeight}
              y2={ratio * chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}
          
          {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
            <line
              key={ratio}
              x1={ratio * chartWidth}
              x2={ratio * chartWidth}
              y1="0"
              y2={chartHeight}
              stroke="#e5e7eb"
              strokeWidth="1"
              strokeDasharray="3,3"
            />
          ))}

          {/* 成本曲線 */}
          <polyline
            points={data.map((d, i) => {
              const x = (i / (data.length - 1)) * chartWidth
              const y = chartHeight - (((d.totalCost - minCost + padding) / (range + 2 * padding)) * chartHeight)
              return `${x},${y}`
            }).join(' ')}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            style={{ filter: 'drop-shadow(0 2px 4px rgba(59, 130, 246, 0.3))' }}
          />
          
          {/* 數據點 */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * chartWidth
            const y = chartHeight - (((d.totalCost - minCost + padding) / (range + 2 * padding)) * chartHeight)
            const isOptimal = d.totalCost === Math.min(...data.map(item => item.totalCost))
            const isCurrent = Math.abs(d.value - currentValue) < 0.01
            
            if (isOptimal || isCurrent) {
              return (
                <g key={i}>
                  <circle
                    cx={x}
                    cy={y}
                    r={isCurrent ? "8" : "6"}
                    fill={isCurrent ? "#ef4444" : "#10b981"}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={y - 15}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isCurrent ? "#ef4444" : "#10b981"}
                    fontWeight="600"
                  >
                    {isCurrent ? "當前" : "最佳"}
                  </text>
                </g>
              )
            }
            return null
          })}
        </svg>
      </div>

      {/* X軸標籤 */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: '80px', 
        right: 0,
        height: '40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.75rem',
        color: '#6b7280'
      }}>
        <span>{formatValue(data[0]?.value)}</span>
        <span>{formatValue(data[Math.floor(data.length / 2)]?.value)}</span>
        <span>{formatValue(data[data.length - 1]?.value)}</span>
      </div>

      {/* 圖例 */}
      <div style={{ 
        position: 'absolute', 
        top: '10px', 
        right: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        padding: '0.75rem',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        fontSize: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '20px', height: '3px', backgroundColor: '#3b82f6' }} />
          <span>總成本曲線</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#ef4444' }} />
          <span>當前參數值</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981' }} />
          <span>最佳參數值</span>
        </div>
      </div>
    </div>
  )
}

// 敏感度比較圖表組件
function SensitivityComparisonChart({ sensitivityData }) {
  const variables = Object.keys(sensitivityData)
  const maxSensitivity = Math.max(...variables.map(v => sensitivityData[v].metrics.sensitivity))
  
  return (
    <div style={{ height: '250px', padding: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'end', gap: '1.5rem', height: '100%' }}>
        {variables.map(variable => {
          const metrics = sensitivityData[variable].metrics
          const heightPercentage = maxSensitivity > 0 ? (metrics.sensitivity / maxSensitivity) * 100 : 0
          
          const colors = {
            gf: '#3b82f6',
            tf: '#10b981', 
            gs: '#f59e0b',
            t: '#ef4444',
            price: '#8b5cf6',
            crm: '#06b6d4'
          }
          
          return (
            <div key={variable} style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              flex: 1,
              height: '100%'
            }}>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                marginBottom: '0.75rem'
              }}>
                <span style={{ 
                  fontSize: '1rem', 
                  fontWeight: '700', 
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {metrics.sensitivity.toFixed(3)}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  敏感度
                </span>
              </div>
              
              <div style={{ 
                width: '100%', 
                height: `${Math.max(heightPercentage, 5)}%`,
                backgroundColor: colors[variable] || '#6b7280',
                borderRadius: '6px 6px 0 0',
                transition: 'height 0.8s ease-in-out',
                marginBottom: '0.75rem',
                minHeight: '20px'
              }} />
              
              <div style={{ 
                textAlign: 'center',
                fontSize: '0.8125rem',
                color: '#374151',
                fontWeight: '500',
                lineHeight: '1.2'
              }}>
                {sensitivityData[variable].label.replace(/\s*\([^)]*\)/, '')}
              </div>
            </div>
          )
        })}
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