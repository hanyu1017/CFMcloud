// pages/api/factories/index.js
import { getFactories, createFactory } from '../../../lib/database'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const factories = await getFactories()
        res.status(200).json(factories)
        break
        
      case 'POST':
        const factoryId = await createFactory(req.body)
        res.status(201).json({ factory_id: factoryId, message: '廠區創建成功' })
        break
        
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: '伺服器錯誤' })
  }
}

// pages/api/factories/[id].js
import { getFactoryById, updateFactory, deleteFactory } from '../../../lib/database'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    switch (req.method) {
      case 'GET':
        const factory = await getFactoryById(id)
        if (!factory) {
          return res.status(404).json({ error: '廠區不存在' })
        }
        res.status(200).json(factory)
        break
        
      case 'PUT':
        await updateFactory(id, req.body)
        res.status(200).json({ message: '廠區更新成功' })
        break
        
      case 'DELETE':
        await deleteFactory(id)
        res.status(200).json({ message: '廠區刪除成功' })
        break
        
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: '伺服器錯誤' })
  }
}

// pages/api/factories/stats.js
import { getFactoryStats } from '../../../lib/database'

export default async function handler(req, res) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const stats = await getFactoryStats()
    res.status(200).json(stats)
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: '伺服器錯誤' })
  }
}

// pages/api/alerts/index.js
import { getAlerts, createAlert } from '../../../lib/database'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        const alerts = await getAlerts(limit)
        res.status(200).json(alerts)
        break
        
      case 'POST':
        const alertId = await createAlert(req.body)
        res.status(201).json({ alert_id: alertId, message: '警報創建成功' })
        break
        
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: '伺服器錯誤' })
  }
}

// components/Charts/PieChart.js
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

export default function CustomPieChart({ data }) {
  const chartData = data.map(factory => ({
    name: factory.factory_name,
    value: factory.carbon_emissions,
    color: getRandomColor()
  }))

  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe']

  function getRandomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p>{`${payload[0].name}: ${payload[0].value} 噸`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

// components/Charts/LineChart.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CustomLineChart({ data }) {
  const chartData = data.map(factory => ({
    name: factory.factory_name,
    efficiency: factory.efficiency_rate,
    carbonReduction: Math.abs(factory.carbon_reduction)
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p className="label">{`廠區: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'efficiency' ? '節能率' : '減碳成果'}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="efficiency" 
          stroke="#667eea" 
          strokeWidth={2}
          name="節能率"
        />
        <Line 
          type="monotone" 
          dataKey="carbonReduction" 
          stroke="#48bb78" 
          strokeWidth={2}
          name="減碳成果"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

// components/Charts/index.js
export { default as PieChart } from './PieChart'
export { default as LineChart } from './LineChart'

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

      {/* 新增廠區表單 Modal 可以在這裡實作 */}
    </Layout>
  )
}

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_SERVER: process.env.DB_SERVER,
    DB_NAME: process.env.DB_NAME,
  },
}

module.exports = nextConfig