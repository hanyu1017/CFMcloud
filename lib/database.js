// lib/database.js
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // AWS RDS endpoint
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // 在 Azure 上使用
    trustServerCertificate: false, // 在本地dev/自簽憑證時設為true
  },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  },
  requestTimeout: 30000,
  connectionTimeout: 30000,
  retries: 3
};

let pool;

async function connectDB() {
  try {
    if (!pool) {
      pool = await sql.connect(config);
      console.log('資料庫連接成功');
    }
    return pool;
  } catch (err) {
    console.error('資料庫連接失敗:', err);
    throw err;
  }
}

async function closeDB() {
  try {
    if (pool) {
      await pool.close();
      pool = null;
      console.log('資料庫連接已關閉');
    }
  } catch (err) {
    console.error('關閉資料庫連接時發生錯誤:', err);
  }
}

// 執行查詢的通用函數
async function executeQuery(query, params = {}) {
  try {
    const pool = await connectDB();
    const request = pool.request();
    
    // 添加參數
    Object.keys(params).forEach(key => {
      request.input(key, params[key]);
    });
    
    const result = await request.query(query);
    return result.recordset;
  } catch (err) {
    console.error('查詢執行失敗:', err);
    throw err;
  }
}

// 工廠數據查詢函數
async function getFactories() {
  const query = `
    SELECT 
      factory_id,
      factory_name,
      location,
      status,
      carbon_emissions,
      energy_consumption,
      efficiency_rate,
      created_at,
      updated_at
    FROM factories
    ORDER BY factory_name
  `;
  return await executeQuery(query);
}

async function getFactoryById(id) {
  const query = `
    SELECT 
      factory_id,
      factory_name,
      location,
      status,
      carbon_emissions,
      process_emissions,
      energy_emissions,
      energy_consumption,
      efficiency_rate,
      carbon_reduction,
      created_at,
      updated_at
    FROM factories
    WHERE factory_id = @id
  `;
  const result = await executeQuery(query, { id });
  return result[0];
}

async function createFactory(factoryData) {
  const query = `
    INSERT INTO factories (
      factory_name, 
      location, 
      status, 
      carbon_emissions, 
      energy_consumption, 
      efficiency_rate
    )
    VALUES (
      @factory_name, 
      @location, 
      @status, 
      @carbon_emissions, 
      @energy_consumption, 
      @efficiency_rate
    );
    SELECT SCOPE_IDENTITY() as factory_id;
  `;
  
  const result = await executeQuery(query, factoryData);
  return result[0].factory_id;
}

async function updateFactory(id, factoryData) {
  const query = `
    UPDATE factories
    SET 
      factory_name = @factory_name,
      location = @location,
      status = @status,
      carbon_emissions = @carbon_emissions,
      energy_consumption = @energy_consumption,
      efficiency_rate = @efficiency_rate,
      updated_at = GETDATE()
    WHERE factory_id = @id
  `;
  
  await executeQuery(query, { ...factoryData, id });
  return true;
}

async function deleteFactory(id) {
  const query = `DELETE FROM factories WHERE factory_id = @id`;
  await executeQuery(query, { id });
  return true;
}

// 警報查詢函數
async function getAlerts(limit = 10) {
  const query = `
    SELECT TOP (@limit)
      alert_id,
      factory_id,
      factory_name,
      alert_type,
      alert_level,
      message,
      created_at
    FROM alerts a
    JOIN factories f ON a.factory_id = f.factory_id
    ORDER BY created_at DESC
  `;
  return await executeQuery(query, { limit });
}

async function createAlert(alertData) {
  const query = `
    INSERT INTO alerts (
      factory_id,
      alert_type,
      alert_level,
      message
    )
    VALUES (
      @factory_id,
      @alert_type,
      @alert_level,
      @message
    );
    SELECT SCOPE_IDENTITY() as alert_id;
  `;
  
  const result = await executeQuery(query, alertData);
  return result[0].alert_id;
}

// 統計數據查詢函數
async function getFactoryStats() {
  const query = `
    SELECT 
      COUNT(*) as total_factories,
      SUM(carbon_emissions) as total_carbon_emissions,
      AVG(efficiency_rate) as avg_efficiency_rate,
      SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as online_factories,
      SUM(CASE WHEN status = 'offline' THEN 1 ELSE 0 END) as offline_factories
    FROM factories
  `;
  const result = await executeQuery(query);
  return result[0];
}

module.exports = {
  connectDB,
  closeDB,
  executeQuery,
  getFactories,
  getFactoryById,
  createFactory,
  updateFactory,
  deleteFactory,
  getAlerts,
  createAlert,
  getFactoryStats
};

// .env.local 範例
/*
DB_USER=your_username
DB_PASSWORD=your_password
DB_SERVER=your-rds-endpoint.region.rds.amazonaws.com
DB_NAME=your_database_name
*/

// SQL Server 資料庫結構
/*
-- 創建工廠表
CREATE TABLE factories (
    factory_id INT IDENTITY(1,1) PRIMARY KEY,
    factory_name NVARCHAR(100) NOT NULL,
    location NVARCHAR(200),
    status NVARCHAR(20) DEFAULT 'offline',
    carbon_emissions DECIMAL(10,2) DEFAULT 0,
    process_emissions DECIMAL(10,2) DEFAULT 0,
    energy_emissions DECIMAL(10,2) DEFAULT 0,
    energy_consumption DECIMAL(10,2) DEFAULT 0,
    efficiency_rate DECIMAL(5,2) DEFAULT 0,
    carbon_reduction DECIMAL(5,2) DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    updated_at DATETIME2 DEFAULT GETDATE()
);

-- 創建警報表
CREATE TABLE alerts (
    alert_id INT IDENTITY(1,1) PRIMARY KEY,
    factory_id INT FOREIGN KEY REFERENCES factories(factory_id),
    alert_type NVARCHAR(50) NOT NULL,
    alert_level NVARCHAR(20) DEFAULT 'medium',
    message NVARCHAR(500) NOT NULL,
    is_resolved BIT DEFAULT 0,
    created_at DATETIME2 DEFAULT GETDATE(),
    resolved_at DATETIME2 NULL
);

-- 插入範例數據
INSERT INTO factories (factory_name, location, status, carbon_emissions, process_emissions, energy_emissions, energy_consumption, efficiency_rate, carbon_reduction)
VALUES 
('台北總廠', '台北市信義區', 'online', 87.6, 52.6, 35.0, 120.5, 18.5, -12.4),
('台中廠', '台中市西屯區', 'online', 65.3, 35.9, 29.4, 95.2, 21.0, -15.8),
('高雄廠', '高雄市前鎮區', 'online', 56.8, 31.2, 25.6, 78.9, 14.2, -8.7);

INSERT INTO alerts (factory_id, alert_type, alert_level, message)
VALUES 
(3, 'energy', 'high', '空調系統異常耗電'),
(1, 'temperature', 'high', '製程區域溫度過高'),
(3, 'maintenance', 'medium', '設備維護即將到期');
*/