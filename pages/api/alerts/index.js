

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