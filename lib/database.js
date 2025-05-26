// lib/db.js - 資料庫連接配置
import sql from 'mssql';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const config = {
  server: process.env.DB_SERVER || 'cfmclouddb.c3sw88geq0el.ap-southeast-2.rds.amazonaws.com',
  database: process.env.DB_DATABASE || 'CFMdatabase',
  user: process.env.DB_USER || 'Edison',
  password: process.env.DB_PASSWORD || 'Edison0528',
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {
    encrypt: true,
    trustServerCertificate: true,
    enableArithAbort: true
  }
};

// Verify configuration
if (typeof window !== 'undefined') {
  console.log('%c資料庫配置', 'color: #4CAF50; font-weight: bold', {
    server: config.server,
    database: config.database,
    user: config.user,
    port: config.port
  });
}

export async function getFactoryById(id) {
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        SELECT * FROM factories 
        WHERE factory_id = @id
      `);
    return result.recordset[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('獲取廠區資料失敗');
  } finally {
    if (pool) await pool.close();
  }
}

export async function updateFactory(id, data) {
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .input('factory_name', sql.NVarChar(100), data.factory_name)
      .input('location', sql.NVarChar(200), data.location)
      .input('status', sql.VarChar(20), data.status)
      .input('carbon_emissions', sql.Decimal(10,2), data.carbon_emissions)
      .input('energy_consumption', sql.Decimal(10,2), data.energy_consumption)
      .input('efficiency_rate', sql.Decimal(5,2), data.efficiency_rate)
      .query(`
        UPDATE factories 
        SET 
          factory_name = @factory_name,
          location = @location,
          status = @status,
          carbon_emissions = @carbon_emissions,
          energy_consumption = @energy_consumption,
          efficiency_rate = @efficiency_rate,
          updated_at = GETDATE()
        WHERE factory_id = @id;
        
        SELECT * FROM factories WHERE factory_id = @id;
      `);
    
    return result.recordset[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('更新廠區資料失敗');
  } finally {
    if (pool) await pool.close();
  }
}

export async function deleteFactory(id) {
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query(`
        DELETE FROM factories 
        WHERE factory_id = @id;
        
        SELECT @@ROWCOUNT as deleted;
      `);
    
    return result.recordset[0].deleted > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('刪除廠區失敗');
  } finally {
    if (pool) await pool.close();
  }
}

export async function getFactoryStats() {
  let pool;
  try {
    pool = await new sql.ConnectionPool(config).connect();
    const result = await pool.request().query(`
      SELECT 
        COUNT(*) as total_factories,
        SUM(CASE WHEN status = 'online' THEN 1 ELSE 0 END) as active_factories,
        SUM(carbon_emissions) as total_emissions,
        AVG(carbon_emissions) as avg_emissions,
        SUM(energy_consumption) as total_energy,
        AVG(energy_consumption) as avg_energy,
        AVG(efficiency_rate) as avg_efficiency
      FROM factories;
    `);
    
    return result.recordset[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('獲取統計資料失敗');
  } finally {
    if (pool) await pool.close();
  }
}

export default config;

