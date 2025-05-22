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