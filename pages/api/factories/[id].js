// pages/api/factories/[id].js
import { getFactoryById, updateFactory, deleteFactory } from '../../../lib/database'

export default async function handler(req, res) {
  const { id } = req.query

  try {
    switch (req.method) {
      case 'GET':
        const factory = await getFactoryById(id)
        if (!factory) {
          return res.status(404).json({ error: '廠區不存在' })
        }
        res.status(200).json(factory)
        break
        
      case 'PUT':
        await updateFactory(id, req.body)
        res.status(200).json({ message: '廠區更新成功' })
        break
        
      case 'DELETE':
        await deleteFactory(id)
        res.status(200).json({ message: '廠區刪除成功' })
        break
        
      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ error: '伺服器錯誤' })
  }
}