// pages/models/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'

// 模型參數常數定義
const MODEL_CONSTANTS = {
  // 製造商參數
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

export default function ModelsPage() {
  const [loading, setLoading] = useState(true)

  // 4個主要決策變數
  const [decisionVars, setDecisionVars] = useState({
    G: 5000,      // 減碳設備與技術的投資金額 (合併 gf 和 gs)
    T_F: 35,      // 製造商一個生產週期的時間長度
    T_R: 25,      // 零售商一個補貨週期的時間長度
    p: 88,        // 零售商每單位產品銷售售價
  })

  // 其他參數
  const [otherParams, setOtherParams] = useState({
    crm: 1500,    // CRM投資
  })

  // 計算結果
  const [results, setResults] = useState({
    totalProfit: 0,
    totalRevenue: 0,
    totalCost: 0,
    demand: 0,
    manufacturerCost: 0,
    retailerCost: 0,
  })

  useEffect(() => {
    setTimeout(() => setLoading(false), 500)
  }, [])

  // 即時計算結果（當任何參數改變時）
  useEffect(() => {
    if (!loading) {
      calculateResults()
    }
  }, [decisionVars, otherParams, loading])

  // 碳效率函數
  const carbonEfficiency = (investment) => {
    return Math.log(1 + investment) / (1 + Math.log(1 + investment))
  }

  // 需求函數
  const calculateDemand = (price, crm) => {
    const { a, b } = MODEL_CONSTANTS
    return Math.max(1000, a - b * (1 + crm/10000) * price)
  }

  // 製造商成本計算
  const calculateManufacturerCost = (G, T_F, p, crm) => {
    const H = calculateDemand(p, crm)
    const { R, A, F, Ef, Ev, Wf, C } = MODEL_CONSTANTS
    const gf = G * 0.6 // 製造商獲得60%的減碳投資
    const phi_gf = carbonEfficiency(gf)

    const investmentCost = gf / T_F
    const startupCarbonCost = (R * C / T_F) * (1 - phi_gf)
    const productionCarbonCost = H * A * C * (1 - phi_gf)
    const storageCarbonCost = (H * H * T_F * F * C / 2) * (1 - phi_gf)
    const transportFixedCarbonCost = (Ef * C / T_F) * (1 - phi_gf)
    const transportVariableCarbonCost = H * Ev * C * (1 - phi_gf)
    const additionalCarbonPenalty = Wf * C * (1 - phi_gf)

    return investmentCost + startupCarbonCost + productionCarbonCost +
           storageCarbonCost + transportFixedCarbonCost +
           transportVariableCarbonCost + additionalCarbonPenalty
  }

  // 零售商成本計算
  const calculateRetailerCost = (G, T_R, p, crm) => {
    const D = calculateDemand(p, crm)
    const { c, s, h, K, Efs, Evs, O, S, Ws, gamma, delta, C } = MODEL_CONSTANTS
    const gs = G * 0.4 // 零售商獲得40%的減碳投資
    const phi_gs = carbonEfficiency(gs)

    const procurementCost = D * c / T_R
    const crmCost = crm
    const orderingCost = s / T_R
    const holdingCarbonCost = (D * D * (h + K * C * (1 - phi_gs))) / (2 * T_R)
    const transportCarbonCost = (Efs * C * (1 - phi_gs) + D * Evs * C * (1 - phi_gs)) / T_R
    const otherCarbonPenalty = (O * C * (1 - phi_gs)) / T_R
    const additionalCarbonPenalty = (D * S * C * (1 - phi_gs)) / T_R
    const investmentCost = gs / T_R
    const extraProcessingPenalty = Ws * C * (1 - phi_gs)
    const priceRisk = (gamma * p * p) / (2 * T_R)
    const crmRisk = (delta * crm * crm) / (2 * T_R)

    return procurementCost + crmCost + orderingCost + holdingCarbonCost +
           transportCarbonCost + otherCarbonPenalty + additionalCarbonPenalty +
           investmentCost + extraProcessingPenalty + priceRisk + crmRisk
  }

  // 計算所有結果
  const calculateResults = () => {
    const { G, T_F, T_R, p } = decisionVars
    const { crm } = otherParams

    const demand = calculateDemand(p, crm)
    const manufacturerCost = calculateManufacturerCost(G, T_F, p, crm)
    const retailerCost = calculateRetailerCost(G, T_R, p, crm)
    const totalCost = manufacturerCost + retailerCost
    const totalRevenue = demand * p
    const totalProfit = totalRevenue - totalCost

    setResults({
      totalProfit: Math.round(totalProfit),
      totalRevenue: Math.round(totalRevenue),
      totalCost: Math.round(totalCost),
      demand: Math.round(demand),
      manufacturerCost: Math.round(manufacturerCost),
      retailerCost: Math.round(retailerCost),
    })
  }

  // 更新決策變數
  const updateDecisionVar = (key, value) => {
    setDecisionVars(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }))
  }

  // 更新其他參數
  const updateOtherParam = (key, value) => {
    setOtherParams(prev => ({
      ...prev,
      [key]: parseFloat(value)
    }))
  }

  // 重置為預設值
  const resetToDefault = () => {
    setDecisionVars({
      G: 5000,
      T_F: 35,
      T_R: 25,
      p: 88,
    })
    setOtherParams({
      crm: 1500,
    })
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
        <h1 className="page-title">決策模型優化系統</h1>
        <p className="page-subtitle">調整決策變數，即時查看對總利潤的影響</p>
      </div>

      {/* 結果展示區 */}
      <div className="card" style={{ marginBottom: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
        <div className="card-body" style={{ padding: '2rem' }}>
          <h2 style={{ color: 'white', fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
            模型計算結果
          </h2>

          <div className="grid grid-cols-5" style={{ gap: '1.5rem' }}>
            {/* 總利潤 - 突出顯示 */}
            <div style={{
              gridColumn: 'span 5',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', fontWeight: '500' }}>
                總利潤 (Total Profit)
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: 'bold',
                color: results.totalProfit >= 0 ? '#10b981' : '#ef4444',
                marginBottom: '0.5rem',
              }}>
                ${results.totalProfit.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                收入 ${results.totalRevenue.toLocaleString()} - 成本 ${results.totalCost.toLocaleString()}
              </div>
            </div>

            {/* 4個決策變數結果 */}
            <ResultCard
              title="G - 減碳投資"
              value={`$${decisionVars.G.toLocaleString()}`}
              subtitle="減碳設備與技術投資金額"
              color="#3b82f6"
            />
            <ResultCard
              title="T_F - 製造週期"
              value={`${decisionVars.T_F} 天`}
              subtitle="製造商生產週期長度"
              color="#10b981"
            />
            <ResultCard
              title="T_R - 補貨週期"
              value={`${decisionVars.T_R} 天`}
              subtitle="零售商補貨週期長度"
              color="#f59e0b"
            />
            <ResultCard
              title="p - 銷售價格"
              value={`$${decisionVars.p}`}
              subtitle="每單位產品售價"
              color="#ef4444"
            />
            <ResultCard
              title="需求量"
              value={`${results.demand.toLocaleString()} 單位`}
              subtitle="預估市場需求"
              color="#8b5cf6"
            />
          </div>

          {/* 成本明細 */}
          <div className="grid grid-cols-2" style={{ gap: '1rem', marginTop: '1.5rem' }}>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                製造商成本
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#3b82f6' }}>
                ${results.manufacturerCost.toLocaleString()}
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: '0.75rem',
              padding: '1rem',
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                零售商成本
              </div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', color: '#10b981' }}>
                ${results.retailerCost.toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 決策變數調整區 */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">決策變數調整</h3>
          <button
            className="btn btn-secondary btn-sm"
            onClick={resetToDefault}
          >
            重置預設值
          </button>
        </div>
        <div className="card-body" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <SliderControl
              label="G - 減碳設備與技術的投資金額"
              value={decisionVars.G}
              displayValue={`$${decisionVars.G.toLocaleString()}`}
              onChange={(val) => updateDecisionVar('G', val)}
              min={1000}
              max={10000}
              step={100}
              color="#3b82f6"
            />
            <SliderControl
              label="T_F - 製造商一個生產週期的時間長度"
              value={decisionVars.T_F}
              displayValue={`${decisionVars.T_F} 天`}
              onChange={(val) => updateDecisionVar('T_F', val)}
              min={20}
              max={60}
              step={1}
              color="#10b981"
            />
            <SliderControl
              label="T_R - 零售商一個補貨週期的時間長度"
              value={decisionVars.T_R}
              displayValue={`${decisionVars.T_R} 天`}
              onChange={(val) => updateDecisionVar('T_R', val)}
              min={15}
              max={50}
              step={1}
              color="#f59e0b"
            />
            <SliderControl
              label="p - 零售商每單位產品銷售售價"
              value={decisionVars.p}
              displayValue={`$${decisionVars.p}`}
              onChange={(val) => updateDecisionVar('p', val)}
              min={60}
              max={120}
              step={1}
              color="#ef4444"
            />
          </div>
        </div>
      </div>

      {/* 其他參數調整區 */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">其他參數調整</h3>
          <p className="card-subtitle">調整其他影響因素</p>
        </div>
        <div className="card-body" style={{ padding: '2rem' }}>
          <SliderControl
            label="CRM投資 - 客戶關係管理投資金額"
            value={otherParams.crm}
            displayValue={`$${otherParams.crm.toLocaleString()}`}
            onChange={(val) => updateOtherParam('crm', val)}
            min={500}
            max={4000}
            step={50}
            color="#8b5cf6"
          />
        </div>
      </div>

      {/* 決策建議 */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header">
          <h3 className="card-title">智能決策建議</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {results.totalProfit < 0 && (
              <AlertCard
                type="error"
                title="利潤為負"
                message="當前配置導致虧損，建議降低成本或提高售價。"
              />
            )}
            {results.totalProfit >= 0 && results.totalProfit < 50000 && (
              <AlertCard
                type="warning"
                title="利潤偏低"
                message="當前利潤偏低，建議優化投資金額或調整週期參數。"
              />
            )}
            {results.totalProfit >= 50000 && results.totalProfit < 100000 && (
              <AlertCard
                type="info"
                title="表現良好"
                message="當前配置表現不錯，可嘗試微調參數以進一步優化。"
              />
            )}
            {results.totalProfit >= 100000 && (
              <AlertCard
                type="success"
                title="表現優異"
                message="當前配置獲得高利潤，請保持並持續監控市場變化。"
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// 結果卡片組件
function ResultCard({ title, value, subtitle, color }) {
  return (
    <div style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      textAlign: 'center',
      borderTop: `4px solid ${color}`,
    }}>
      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem', fontWeight: '500' }}>
        {title}
      </div>
      <div style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: '0.5rem',
      }}>
        {value}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#9ca3af', lineHeight: '1.3' }}>
        {subtitle}
      </div>
    </div>
  )
}

// 滑動條控制組件
function SliderControl({ label, value, displayValue, onChange, min, max, step, color }) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem'
      }}>
        <label style={{
          fontSize: '1rem',
          fontWeight: '600',
          color: '#374151'
        }}>
          {label}
        </label>
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '700',
          color: color,
          backgroundColor: `${color}15`,
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          minWidth: '120px',
          textAlign: 'center',
        }}>
          {displayValue}
        </div>
      </div>

      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{
            width: '100%',
            height: '0.75rem',
            borderRadius: '0.5rem',
            background: `linear-gradient(to right, ${color} 0%, ${color} ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
            outline: 'none',
            appearance: 'none',
            cursor: 'pointer',
          }}
          className="custom-slider"
        />
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.875rem',
        color: '#6b7280',
        marginTop: '0.5rem',
        fontWeight: '500',
      }}>
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <style jsx>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background: ${color};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        .custom-slider::-moz-range-thumb {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          background: ${color};
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
          border: none;
          transition: all 0.2s ease;
        }
        .custom-slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  )
}

// 提示卡片組件
function AlertCard({ type, title, message }) {
  const styles = {
    success: {
      bg: '#f0fdf4',
      border: '#86efac',
      titleColor: '#166534',
      messageColor: '#15803d',
      icon: '✓'
    },
    error: {
      bg: '#fef2f2',
      border: '#fca5a5',
      titleColor: '#991b1b',
      messageColor: '#dc2626',
      icon: '✕'
    },
    warning: {
      bg: '#fffbeb',
      border: '#fcd34d',
      titleColor: '#92400e',
      messageColor: '#d97706',
      icon: '⚠'
    },
    info: {
      bg: '#eff6ff',
      border: '#93c5fd',
      titleColor: '#1e40af',
      messageColor: '#2563eb',
      icon: 'ℹ'
    }
  }

  const style = styles[type] || styles.info

  return (
    <div style={{
      backgroundColor: style.bg,
      border: `2px solid ${style.border}`,
      borderRadius: '0.75rem',
      padding: '1.25rem',
      display: 'flex',
      gap: '1rem',
      alignItems: 'flex-start',
    }}>
      <div style={{
        fontSize: '1.5rem',
        fontWeight: 'bold',
        color: style.titleColor,
      }}>
        {style.icon}
      </div>
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontWeight: '600',
          color: style.titleColor,
          marginBottom: '0.5rem',
          fontSize: '1rem',
        }}>
          {title}
        </h4>
        <p style={{
          fontSize: '0.875rem',
          color: style.messageColor,
          lineHeight: '1.5',
          margin: 0,
        }}>
          {message}
        </p>
      </div>
    </div>
  )
}
