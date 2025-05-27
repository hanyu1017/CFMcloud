import pool from '../../../lib/database';

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET':
        const result = await pool.query(`
          SELECT 
            wo.*,
            f.factory_name,
            u.name as assigned_to_name
          FROM work_orders wo
          LEFT JOIN factories f ON wo.factory_id = f.factory_id
          LEFT JOIN users u ON wo.assigned_to = u.user_id
          ORDER BY wo.created_at DESC
        `);
        return res.status(200).json(result.rows);

      case 'POST':
        const { title, description, priority, factory_id, assigned_to, type } = req.body;
        const insertResult = await pool.query(`
          INSERT INTO work_orders (
            title, description, priority, factory_id, 
            assigned_to, type, status, created_at
          ) VALUES ($1, $2, $3, $4, $5, $6, 'pending', NOW())
          RETURNING *
        `, [title, description, priority, factory_id, assigned_to, type]);
        return res.status(201).json(insertResult.rows[0]);

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: `不支援 ${req.method} 方法` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: '操作失敗' });
  }
}