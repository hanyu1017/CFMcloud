import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { AlertTriangle, BellRing, CheckCircle, Clock, Filter, Search } from 'lucide-react';

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const severityConfig = {
    high: { icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
    medium: { icon: Clock, color: 'text-yellow-600 bg-yellow-50' },
    low: { icon: BellRing, color: 'text-blue-600 bg-blue-50' },
    resolved: { icon: CheckCircle, color: 'text-green-600 bg-green-50' }
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/alerts');
        if (!response.ok) throw new Error('獲取警報數據失敗');
        const data = await response.json();
        setAlerts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    const interval = setInterval(fetchAlerts, 30000); // 每30秒更新
    return () => clearInterval(interval);
  }, []);

  const filteredAlerts = alerts.filter(alert => {
    if (filter !== 'all' && alert.severity !== filter) return false;
    if (searchTerm && !alert.message.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">警報中心</h1>
          <p className="page-subtitle">監控與管理所有工廠的警報訊息</p>
        </div>

        <div className="card mb-6">
          <div className="p-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜尋警報..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">全部警報</option>
                  <option value="high">高重要性</option>
                  <option value="medium">中重要性</option>
                  <option value="low">低重要性</option>
                  <option value="resolved">已解決</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner" />
            <p className="text-gray-600 mt-4">載入警報數據中...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">載入失敗</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary">
              重新載入
            </button>
          </div>
        ) : (
          <div className="card">
            <div className="divide-y divide-gray-200">
              {filteredAlerts.map(alert => {
                const { icon: Icon, color } = severityConfig[alert.severity];
                return (
                  <div key={alert.alert_id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{alert.message}</h3>
                          <span className="text-xs text-gray-500">{alert.created_at}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{alert.factory_name} - {alert.location}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredAlerts.length === 0 && (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">目前無警報</h3>
                  <p className="text-gray-500">所有系統運作正常</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}