// pages/api/factories/[id].js
import pool from "../../../lib/database";

export default async function handler(req, res) {
  const { id } = req.query;
  
  switch (req.method) {
    case 'GET':
      return await getFactory(req, res, id);
    case 'PUT':
      return await updateFactory(req, res, id);
    case 'DELETE':
      return await deleteFactory(req, res, id);
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

// 獲取單個工廠
async function getFactory(req, res, id) {
  try {
    const query = 'SELECT * FROM factories WHERE factory_id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "工廠不存在" });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("獲取工廠錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}

// 更新工廠
async function updateFactory(req, res, id) {
  try {
    const {
      name,
      location,
      status,
      employees,
      efficiency,
      power_consumption,
      production_rate,
      alerts
    } = req.body;
    
    const query = `
      UPDATE factories SET
        name = COALESCE($1, name),
        location = COALESCE($2, location),
        status = COALESCE($3, status),
        employees = COALESCE($4, employees),
        efficiency = COALESCE($5, efficiency),
        power_consumption = COALESCE($6, power_consumption),
        production_rate = COALESCE($7, production_rate),
        alerts = COALESCE($8, alerts),
        updated_at = CURRENT_TIMESTAMP
      WHERE factory_id = $9
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
      alerts,
      id
    ];
    
    const result = await pool.query(query, values);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "工廠不存在" });
    }
    
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("更新工廠錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}

// 刪除工廠
async function deleteFactory(req, res, id) {
  try {
    const query = 'DELETE FROM factories WHERE factory_id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "工廠不存在" });
    }
    
    res.status(200).json({ 
      message: "工廠已成功刪除",
      deleted: result.rows[0]
    });
  } catch (err) {
    console.error("刪除工廠錯誤：", err);
    res.status(500).json({
      error: "伺服器錯誤",
      detail: err.message,
    });
  }
}