import pool from '../../../lib/database';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const result = await pool.query(`
          SELECT 
            s.*,
            f.factory_name,
            d.department_name,
            (
              SELECT COUNT(*) 
              FROM work_orders 
              WHERE assigned_to = s.staff_id AND status = 'in_progress'
            ) as active_tasks
          FROM staff s
          LEFT JOIN factories f ON s.factory_id = f.factory_id
          LEFT JOIN departments d ON s.department_id = d.department_id
          ORDER BY s.created_at DESC
        `);
        return res.status(200).json(result.rows);

      default:
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `不支援 ${req.method} 方法` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '獲取人員數據失敗' });
  }
}