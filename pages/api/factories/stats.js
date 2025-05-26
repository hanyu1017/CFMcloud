// pages/api/factories/stats.js
import { getFactoryStats } from '../../../lib/database';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `不支援 ${req.method} 方法` });
  }

  try {
    const stats = await getFactoryStats();
    return res.status(200).json(stats);
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: '獲取統計資料失敗',
      message: process.env.NODE_ENV === 'development' ? error.message : '請稍後再試'
    });
  }
}