// pages/api/factories/index.js

import sql from 'mssql';
import config from '../../../lib/database.js';

export default async function handler(req, res) {
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    
    switch (req.method) {
      case 'GET':
        const result = await pool.request().query(`
          SELECT * FROM factories ORDER BY created_at DESC
        `);
        
        // Set headers for better debugging
        res.setHeader('X-Total-Count', result.recordset.length);
        res.setHeader('X-Query-Time', new Date().toISOString());
        
        res.status(200).json(result.recordset);
        break;

      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: '獲取廠區數據失敗',
      message: process.env.NODE_ENV === 'development' ? error.message : '請稍後再試'
    });
  } finally {
    if (pool) {
      try {
        await pool.close();
      } catch (err) {
        console.error('Error closing connection:', err);
      }
    }
  }
}