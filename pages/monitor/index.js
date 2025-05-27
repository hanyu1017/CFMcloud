import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Activity, AlertTriangle, TrendingUp, Zap } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function MonitorPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    realTimeData: [],
    alerts: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 這裡應該是實際的 API 呼叫
        // const response = await fetch('/api/monitor/realtime');
        // const data = await response.json();
        
        // 模擬數據
        setData({
          realTimeData: Array(24).fill(0).map((_, i) => ({
            time: `${i}:00`,
            power: Math.random() * 100 + 50,
            temp: Math.random() * 30 + 20,
            humidity: Math.random() * 40 + 30,
            pressure: Math.random() * 20 + 90
          })),
          alerts: [
            { id: 1, severity: 'high', message: '溫度過高警報', location: 'A區生產線', time: '2分鐘前' },
            { id: 2, severity: 'medium', message: '濕度異常', location: 'B區包裝線', time: '5分鐘前' },
            { id: 3, severity: 'low', message: '能源使用量上升', location: 'C區製程', time: '10分鐘前' }
          ]
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // 每分鐘更新
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <div className="spinner" />
          <p className="text-gray-600 mt-4">載入監控數據中...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="error-container">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">載入失敗</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-primary">
            重新載入
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">即時監控</h1>
          <p className="page-subtitle">監控工廠即時運作狀況與重要指標</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="stat-title">設備運作狀態</h3>
            <p className="stat-value text-blue-600">正常</p>
          </div>
          
          {/* ...其他統計卡片... */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">能源使用趨勢</h2>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data.realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="power" stroke="#2563eb" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h2 className="card-title">環境參數監測</h2>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.realTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="temp" fill="#f59e0b" name="溫度" />
                  <Bar dataKey="humidity" fill="#3b82f6" name="濕度" />
                  <Bar dataKey="pressure" fill="#10b981" name="壓力" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">即時警報</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {data.alerts.map(alert => (
              <div key={alert.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-500 mt-1">{alert.location}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    alert.severity === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : alert.severity === 'medium'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {alert.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}