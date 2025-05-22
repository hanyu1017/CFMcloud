// pages/api/factories/index.js


export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        // 模擬工廠數據
        const factories = [
          {
            factory_id: 1,
            factory_name: '台北總廠',
            location: '台北市信義區',
            status: 'online',
            carbon_emissions: 87.6,
            process_emissions: 52.6,
            energy_emissions: 35.0,
            energy_consumption: 120.5,
            efficiency_rate: 18.5,
            carbon_reduction: -12.4,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            factory_id: 2,
            factory_name: '台中廠',
            location: '台中市西屯區',
            status: 'online',
            carbon_emissions: 65.3,
            process_emissions: 35.9,
            energy_emissions: 29.4,
            energy_consumption: 95.2,
            efficiency_rate: 21.0,
            carbon_reduction: -15.8,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            factory_id: 3,
            factory_name: '高雄廠',
            location: '高雄市前鎮區',
            status: 'online',
            carbon_emissions: 56.8,
            process_emissions: 31.2,
            energy_emissions: 25.6,
            energy_consumption: 78.9,
            efficiency_rate: 14.2,
            carbon_reduction: -8.7,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }
        ]
        res.status(200).json(factories)
        break
        
      case 'POST':
        // 創建新工廠的邏輯
        const newFactory = {
          factory_id: Date.now(),
          ...req.body,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
        res.status(201).json({ factory_id: newFactory.factory_id, message: '廠區創建成功' })
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