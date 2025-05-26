// pages/api/factories/[id].js
import { getFactoryById, updateFactory, deleteFactory } from '../../../lib/database';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        const factory = await getFactoryById(parseInt(id));
        if (!factory) {
          return res.status(404).json({ error: '找不到此廠區' });
        }
        return res.status(200).json(factory);

      case 'PUT':
        const updatedFactory = await updateFactory(parseInt(id), req.body);
        return res.status(200).json(updatedFactory);

      case 'DELETE':
        const deleted = await deleteFactory(parseInt(id));
        if (!deleted) {
          return res.status(404).json({ error: '找不到此廠區' });
        }
        return res.status(200).json({ message: '廠區已刪除' });

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).json({ error: `不支援 ${req.method} 方法` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: '操作失敗',
      message: process.env.NODE_ENV === 'development' ? error.message : '請稍後再試'
    });
  }
}