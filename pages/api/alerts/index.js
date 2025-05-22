// pages/api/alerts/index.js
export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const limit = req.query.limit ? parseInt(req.query.limit) : 10
        
        // 模擬警報數據
        const alerts = [
          {
            alert_id: 1,
            factory_id: 3,
            factory_name: '高雄廠',
            alert_type: 'energy',
            alert_level: 'high',
            message: '空調系統異常耗電',
            is_resolved: false,
            created_at: new Date().toISOString()
          },
          {
            alert_id: 2,
            factory_id: 1,
            factory_name: '台北總廠',
            alert_type: 'temperature',
            alert_level: 'high',
            message: '製程區域溫度過高',
            is_resolved: false,
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            alert_id: 3,
            factory_id: 3,
            factory_name: '高雄廠',
            alert_type: 'maintenance',
            alert_level: 'medium',
            message: '設備維護即將到期',
            is_resolved: false,
            created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
          }
        ].slice(0, limit)
        
        res.status(200).json(alerts)
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