// pages/factories/index.js
import { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import FactoryCard from '../../components/FactoryCard'

export default function FactoriesPage() {
  const [factories, setFactories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchFactories()
  }, [])

  const fetchFactories = async () => {
    try {
      const response = await fetch('/api/factories')
      const data = await response.json()
      setFactories(data)
    } catch (error) {
      console.error('獲取廠區數據失敗:', error)
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
          {factories.map(factory => (
            <FactoryCard key={factory.factory_id} factory={factory} />
          ))}
        </div>
      </div>

      {/* 新增廠區表單 Modal */}
      {showForm && (
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
            minWidth: '400px'
          }}>
            <h3>新增廠區</h3>
            <p>新增廠區功能開發中...</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowForm(false)}
              style={{ marginTop: '1rem' }}
            >
              關閉
            </button>
          </div>
        </div>
      )}
    </Layout>
  )
}