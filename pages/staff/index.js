import React, { useState, useEffect } from 'react';

const DatabaseTestPage = () => {
  const [connectionStatus, setConnectionStatus] = useState('testing');
  const [testResults, setTestResults] = useState([]);
  const [selectedTable, setSelectedTable] = useState('factories');
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiBaseUrl] = useState(process.env.REACT_APP_API_URL || 'http://localhost:3001/api');

  // 資料庫表格列表
  const tables = [
    { name: 'factories', label: '工廠資料', icon: '🏭' },
    { name: 'equipment', label: '設備資料', icon: '⚙️' },
    { name: 'users', label: '用戶資料', icon: '👤' },
    { name: 'production_data', label: '生產數據', icon: '📊' },
    { name: 'alerts', label: '警報記錄', icon: '⚠️' },
    { name: 'energy_consumption', label: '能耗數據', icon: '⚡' },
    { name: 'maintenance_records', label: '維護記錄', icon: '🔧' }
  ];

  // 啟動時測試連線
  useEffect(() => {
    testDatabaseConnection();
  }, []);

  // 實際資料庫連線測試
  const testDatabaseConnection = async () => {
    setConnectionStatus('testing');
    setTestResults([]);
    
    try {
      console.log('開始資料庫連線測試...');
      
      // 調用後端API進行連線測試
      const response = await fetch(`${apiBaseUrl}/database/test`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log('連線測試結果:', result);

      if (result.success) {
        setConnectionStatus('success');
        setTestResults(result.tests || []);
      } else {
        setConnectionStatus('error');
        setTestResults([
          { 
            test: '連線失敗', 
            status: 'error', 
            message: result.error || '未知錯誤', 
            icon: '❌' 
          }
        ]);
      }
    } catch (error) {
      console.error('連線測試錯誤:', error);
      setConnectionStatus('error');
      setTestResults([
        { 
          test: '網路連線錯誤', 
          status: 'error', 
          message: `無法連接到伺服器: ${error.message}`, 
          icon: '🔌' 
        }
      ]);
    }
  };

  // 獲取表格數據
  const fetchTableData = async (tableName) => {
    setLoading(true);
    try {
      console.log(`獲取表格數據: ${tableName}`);
      
      const response = await fetch(`${apiBaseUrl}/database/table/${tableName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`${tableName} 數據:`, result);

      if (result.success) {
        setTableData(result.data || []);
      } else {
        console.error('獲取數據失敗:', result.error);
        setTableData([]);
      }
    } catch (error) {
      console.error('獲取數據錯誤:', error);
      setTableData([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'success': return 'status-online';
      case 'error': return 'status-offline';
      case 'testing': return 'status-maintenance';
      default: return 'status-offline';
    }
  };

  const getAlertClass = (type) => {
    switch(type) {
      case 'error': case 'critical': return 'alert-high';
      case 'warning': return 'alert-medium';
      case 'info': default: return 'alert-low';
    }
  };

  const renderMobileTableData = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      );
    }

    if (tableData.length === 0) {
      return (
        <div className="text-center" style={{ padding: 'var(--space-8)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📝</div>
          <p className="text-secondary">選擇一個表格來查看數據</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 grid-gap-sm">
        {tableData.map((row, index) => (
          <div key={index} className="factory-card fade-in">
            <div className="factory-header">
              <div className="factory-name">記錄 #{row.id || row.factory_id || row.equipment_id || row.user_id || index + 1}</div>
              {row.status && (
                <span className={`status-badge ${
                  row.status === 'online' || row.status === 'running' || row.status === 'completed' || row.status === 'active' 
                    ? 'status-online' : 
                  row.status === 'offline' || row.status === 'error' || row.status === 'resolved'
                    ? 'status-offline' : 'status-maintenance'
                }`}>
                  {row.status}
                </span>
              )}
            </div>
            <div className="factory-metrics">
              {Object.entries(row)
                .filter(([key]) => !['id', 'factory_id', 'equipment_id', 'user_id', 'status'].includes(key))
                .slice(0, 6) // 只顯示前6個字段
                .map(([key, value]) => (
                <div key={key} className="metric">
                  <div className="metric-label">{key.replace(/_/g, ' ')}</div>
                  <div className="metric-value text-sm">
                    {value === null || value === undefined ? '-' : value.toString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderDesktopTableData = () => {
    if (loading) {
      return (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      );
    }

    if (tableData.length === 0) {
      return (
        <div className="text-center" style={{ padding: 'var(--space-8)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 'var(--space-4)' }}>📝</div>
          <p className="text-secondary">選擇一個表格來查看數據</p>
        </div>
      );
    }

    const columns = Object.keys(tableData[0]);

    return (
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column}>
                  {column.replace(/_/g, ' ').toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => (
              <tr key={index} className="fade-in">
                {columns.map((column) => (
                  <td key={column}>
                    {row[column] === null || row[column] === undefined ? '-' : row[column].toString()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="main-content">
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* 頁面標題 */}
        <div className="page-header">
          <div className="page-breadcrumb">
            <span className="breadcrumb-item">系統管理</span>
            <span className="breadcrumb-separator"></span>
            <span className="breadcrumb-item">資料庫管理</span>
            <span className="breadcrumb-separator"></span>
            <span>連線測試</span>
          </div>
          <h1 className="page-title">SQL Server 資料庫測試</h1>
          <p className="page-subtitle">測試與 SQL Server 資料庫的連線狀態並查看範例數據</p>
        </div>

        {/* API連線狀態提示 */}
        <div className="card mb-4 card-primary">
          <div className="card-body">
            <div className="flex items-center">
              <span style={{ fontSize: '1.2rem', marginRight: 'var(--space-2)' }}>🔗</span>
              <div>
                <h4 className="text-primary font-semibold">API 連線設定</h4>
                <p className="text-sm text-secondary">
                  後端API地址: <code style={{ 
                    backgroundColor: 'var(--primary-100)', 
                    padding: 'var(--space-1) var(--space-2)', 
                    borderRadius: 'var(--radius-sm)',
                    fontFamily: 'monospace'
                  }}>{apiBaseUrl}</code>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 連線狀態卡片 */}
        <div className="card mb-4">
          <div className="card-header">
            <div>
              <h2 className="card-title">SQL Server 連線狀態</h2>
              <p className="card-subtitle">Microsoft SQL Server 數據庫連線測試</p>
            </div>
            <button
              onClick={testDatabaseConnection}
              className={`btn ${connectionStatus === 'testing' ? 'btn-secondary' : 'btn-primary'}`}
              disabled={connectionStatus === 'testing'}
            >
              {connectionStatus === 'testing' ? '測試中...' : '重新測試'}
            </button>
          </div>

          <div className="card-body">
            {/* 整體狀態 */}
            <div className="stat-card mb-4">
              <div className="stat-icon">
                {connectionStatus === 'success' ? '✅' : 
                 connectionStatus === 'error' ? '❌' : '🔄'}
              </div>
              <div className="stat-value text-lg">
                {connectionStatus === 'success' ? '資料庫連線正常' : 
                 connectionStatus === 'error' ? '資料庫連線失敗' : '正在測試連線...'}
              </div>
              <div className="stat-label">
                {connectionStatus === 'success' ? '所有測試項目通過，系統運行正常' : 
                 connectionStatus === 'error' ? '請檢查資料庫設定和網路連線' : '正在執行連線測試，請稍候...'}
              </div>
              <div className={`stat-change ${connectionStatus === 'success' ? 'positive' : 'negative'}`}>
                {connectionStatus === 'success' ? '運行正常' : 
                 connectionStatus === 'error' ? '需要檢查' : '測試中'}
              </div>
            </div>

            {/* 測試結果詳情 */}
            {testResults.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-primary mb-3">測試詳情</h4>
                <div className="alert-panel">
                  {testResults.map((result, index) => (
                    <div key={index} className={`alert-item ${getAlertClass(result.status)} slide-in-left`}>
                      <div className="alert-header">
                        <div className="alert-title">
                          {result.icon} {result.test}
                        </div>
                        <div className={`alert-level ${result.status === 'success' ? 'low' : 'high'}`}>
                          {result.status === 'success' ? '正常' : '異常'}
                        </div>
                      </div>
                      <div className="alert-content">
                        <div className="alert-factory">{result.message}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 資料表瀏覽 */}
        <div className="card">
          <div className="card-header">
            <div>
              <h2 className="card-title">資料表瀏覽</h2>
              <p className="card-subtitle">瀏覽系統中的各種資料表</p>
            </div>
          </div>

          <div className="card-body">
            {/* 表格選擇 */}
            <div className="mb-4">
              <div className="grid grid-cols-2 grid-gap-sm">
                {tables.map((table) => (
                  <button
                    key={table.name}
                    onClick={() => {
                      setSelectedTable(table.name);
                      fetchTableData(table.name);
                    }}
                    className={`factory-card ${selectedTable === table.name ? 'card-primary' : ''}`}
                    style={{
                      textAlign: 'center',
                      border: selectedTable === table.name ? '2px solid var(--accent-blue)' : undefined
                    }}
                  >
                    <div className="factory-header">
                      <div className="factory-name text-center">
                        <span style={{ fontSize: '1.8rem', display: 'block', marginBottom: 'var(--space-2)' }}>
                          {table.icon}
                        </span>
                        {table.label}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* 當前選擇的表格信息 */}
              {selectedTable && (
                <div className="card-primary mt-4">
                  <div className="card-body">
                    <div className="flex items-center mb-2">
                      <span style={{ fontSize: '1.2rem', marginRight: 'var(--space-2)' }}>
                        {tables.find(t => t.name === selectedTable)?.icon}
                      </span>
                      <h3 className="text-primary font-semibold">
                        {tables.find(t => t.name === selectedTable)?.label}
                      </h3>
                    </div>
                    <div className="text-sm text-secondary">
                      表格名稱: <code style={{ 
                        backgroundColor: 'var(--primary-100)', 
                        padding: 'var(--space-1) var(--space-2)', 
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'monospace'
                      }}>{selectedTable}</code>
                      {tableData.length > 0 && (
                        <span className="ml-4">共 {tableData.length} 筆記錄</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 數據顯示區域 - 響應式 */}
            <div>
              {/* 手機版 */}
              <div className="block mobile-view">
                {renderMobileTableData()}
              </div>
              
              {/* 桌面版 */}
              <div className="hidden desktop-view">
                {renderDesktopTableData()}
              </div>
            </div>
          </div>
        </div>

        {/* 系統資訊 */}
        <div className="mt-4 grid grid-cols-1">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">系統資訊</h2>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-2 grid-gap-md">
                <div className="stat-card">
                  <div className="stat-icon">💾</div>
                  <div className="stat-value">SQL Server</div>
                  <div className="stat-label">資料庫類型</div>
                  <div className="stat-change positive">運行中</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔤</div>
                  <div className="stat-value">UTF-8</div>
                  <div className="stat-label">字符編碼</div>
                  <div className="stat-change positive">支援中文</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📊</div>
                  <div className="stat-value">7</div>
                  <div className="stat-label">資料表數量</div>
                  <div className="stat-change positive">已建立</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🔗</div>
                  <div className="stat-value">{connectionStatus === 'success' ? 'Active' : 'Inactive'}</div>
                  <div className="stat-label">連線狀態</div>
                  <div className={`stat-change ${connectionStatus === 'success' ? 'positive' : 'negative'}`}>
                    {connectionStatus === 'success' ? '正常' : '異常'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API 端點說明 */}
        <div className="mt-4 card">
          <div className="card-header">
            <h2 className="card-title">API 端點說明</h2>
          </div>
          <div className="card-body">
            <div className="alert-panel">
              <div className="alert-item alert-low">
                <div className="alert-header">
                  <div className="alert-title">GET /api/database/test</div>
                  <div className="alert-level low">GET</div>
                </div>
                <div className="alert-content">
                  <div className="alert-factory">測試資料庫連線狀態</div>
                </div>
              </div>
              <div className="alert-item alert-low">
                <div className="alert-header">
                  <div className="alert-title">GET /api/database/table/:tableName</div>
                  <div className="alert-level low">GET</div>
                </div>
                <div className="alert-content">
                  <div className="alert-factory">獲取指定表格的數據</div>
                </div>
              </div>
              <div className="alert-item alert-low">
                <div className="alert-header">
                  <div className="alert-title">GET /api/factories</div>
                  <div className="alert-level low">GET</div>
                </div>
                <div className="alert-content">
                  <div className="alert-factory">獲取工廠列表數據</div>
                </div>
              </div>
              <div className="alert-item alert-low">
                <div className="alert-header">
                  <div className="alert-title">GET /api/equipment</div>
                  <div className="alert-level low">GET</div>
                </div>
                <div className="alert-content">
                  <div className="alert-factory">獲取設備清單數據</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 響應式CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-view {
            display: block !important;
          }
          .desktop-view {
            display: none !important;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-view {
            display: none !important;
          }
          .desktop-view {
            display: block !important;
          }
          .grid-cols-2 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          .grid-cols-2 {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default DatabaseTestPage;