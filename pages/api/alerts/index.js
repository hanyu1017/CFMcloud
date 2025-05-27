import pool from '../../../lib/database';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        
        const result = await pool.query(`
          SELECT 
            a.alert_id,
            a.type,
            a.severity,
            a.message,
            a.status,
            a.created_at,
            f.factory_name,
            f.location
          FROM alerts a
          LEFT JOIN factories f ON a.factory_id = f.factory_id
          ORDER BY a.created_at DESC
          LIMIT $1
        `, [limit]);

        res.status(200).json(result.rows);
        break
        
      case 'POST':
        const newAlert = {
          alert_id: Date.now(),
          ...req.body,
          created_at: new Date().toISOString()
        }
        res.status(201).json({ alert_id: newAlert.alert_id, message: '警報創建成功' })
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