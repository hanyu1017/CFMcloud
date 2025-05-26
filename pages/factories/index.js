// pages/factories/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import FactoryCard from '../../components/FactoryCard'

export default function FactoriesPage() {
  const [factories, setFactories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)  // Add this line for the button

  useEffect(() => {
    const fetchFactories = async () => {
      try {
        const response = await fetch('/api/factories')
        if (!response.ok) {
          throw new Error('獲取廠區數據失敗')
        }
        const data = await response.json()
        setFactories(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('獲取廠區數據時發生錯誤:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchFactories()
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="loading">載入中...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="error">錯誤: {error}</div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page-header">
        <h1 className="page-title">廠區管理</h1>
        <p className="page-subtitle">管理所有廠區的基本資訊與營運狀況</p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">廠區列表</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            新增廠區
          </button>
        </div>

        <div className="grid grid-cols-3" style={{ gap: '1.5rem' }}>
          {Array.isArray(factories) && factories.map(factory => (
            <FactoryCard key={factory.factory_id} factory={factory} />
          ))}
        </div>

        {factories.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            尚無工廠資料
          </div>
        )}
      </div>

      {/* 新增廠區表單 Modal 可以在這裡實作 */}
    </Layout>
  )
}

