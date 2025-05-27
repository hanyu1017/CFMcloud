// pages/api/factories/stats.js
import pool from "../../../lib/database";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
  
  try {
    // 獲取統計數據
    const statsQuery = `
      SELECT 
        COUNT(*) as total_factories,
        COUNT(CASE WHEN status = 'online' THEN 1 END) as online_factories,
        COUNT(CASE WHEN status = 'maintenance' THEN 1 END) as maintenance_factories,
        COUNT(CASE WHEN status = 'offline' THEN 1 END) as offline_factories,
        COALESCE(SUM(employees), 0) as total_employees,
        COALESCE(AVG(efficiency), 0) as average_efficiency,
        COALESCE(SUM(alerts), 0) as total_alerts,
        COALESCE(SUM(power_consumption), 0) as total_power_consumption
      FROM factories
    `;
    
    const result = await pool.query(statsQuery);
    const stats = result.rows[0];
    
    // 格式化數據
    const formattedStats = {
      totalFactories: parseInt(stats.total_factories),
      onlineFactories: parseInt(stats.online_factories),
      maintenanceFactories: parseInt(stats.maintenance_factories),
      offlineFactories: parseInt(stats.offline_factories),
      totalEmployees: parseInt(stats.total_employees),
      averageEfficiency: parseFloat(stats.average_efficiency).toFixed(1),
      totalAlerts: parseInt(stats.total_alerts),
      totalPowerConsumption: parseInt(stats.total_power_consumption)
    };
    
    res.status(200).json(formattedStats);
  } catch (err) {
    console.error("獲取統計數據錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}