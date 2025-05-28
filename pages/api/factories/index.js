// pages/api/factories/index.js

import pool from "../../../lib/database.js"; // 明確添加 .js 擴展名

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getFactories(req, res);
    case 'POST':
      return await createFactory(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// 獲取所有工廠
async function getFactories(req, res) {
  try {
    const { status, search, sortBy = 'name', order = 'ASC' } = req.query;
    
    let query = `
      SELECT 
        factory_id,
        name,
        location,
        status,
        employees,
        efficiency,
        power_consumption,
        production_rate,
        last_maintenance,
        alerts,
        created_at,
        updated_at
      FROM factories
    `;
    
    const conditions = [];
    const values = [];
    
    // 狀態篩選
    if (status && status !== 'all') {
      conditions.push(`status = $${values.length + 1}`);
      values.push(status);
    }
    
    // 搜索條件
    if (search) {
      conditions.push(`(name ILIKE $${values.length + 1} OR location ILIKE $${values.length + 2})`);
      values.push(`%${search}%`, `%${search}%`);
    }
    
    // 添加WHERE條件
    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }
    
    // 排序
    const validSortFields = ['name', 'efficiency', 'alerts', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    query += ` ORDER BY ${sortField} ${sortOrder}`;
    
    const result = await pool.query(query, values);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("獲取工廠數據錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}

// 創建新工廠
async function createFactory(req, res) {
  try {
    const {
      name,
      location,
      status = 'offline',
      employees = 0,
      efficiency = 0,
      power_consumption = 0,
      production_rate = 0
    } = req.body;
    
    // 驗證必要欄位
    if (!name || !location) {
      return res.status(400).json({
        error: "缺少必要欄位",
        detail: "工廠名稱和地址為必填項目"
      });
    }
    
    const query = `
      INSERT INTO factories (
        name, location, status, employees, efficiency, 
        power_consumption, production_rate, alerts
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      name,
      location,
      status,
      employees,
      efficiency,
      power_consumption,
      production_rate,
      0 // 初始警報數為0
    ];
    
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("創建工廠錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}
