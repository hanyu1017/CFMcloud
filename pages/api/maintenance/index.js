import pool from '../../../lib/database';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const result = await pool.query(`
          SELECT 
            e.*,
            f.factory_name,
            COALESCE(
              (SELECT COUNT(*) 
               FROM maintenance_records mr 
               WHERE mr.equipment_id = e.equipment_id
              ), 0
            ) as maintenance_count,
            (
              SELECT status 
              FROM maintenance_records 
              WHERE equipment_id = e.equipment_id 
              ORDER BY maintenance_date DESC 
              LIMIT 1
            ) as last_maintenance_status
          FROM equipment e
          LEFT JOIN factories f ON e.factory_id = f.factory_id
          ORDER BY e.next_maintenance ASC
        `);
        return res.status(200).json(result.rows);

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `不支援 ${req.method} 方法` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '獲取設備數據失敗' });
  }
}