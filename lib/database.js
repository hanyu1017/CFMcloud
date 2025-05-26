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

export default config;

