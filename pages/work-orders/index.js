import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { 
  AlertTriangle, Clock, CheckCircle, Tool, Plus, Search,
  Filter, SortAsc, Calendar, User, ArrowRight
} from 'lucide-react';

export default function WorkOrdersPage() {
  const [workOrders, setWorkOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);

  const statusConfig = {
    pending: { color: 'text-yellow-600 bg-yellow-50', icon: Clock },
    in_progress: { color: 'text-blue-600 bg-blue-50', icon: Tool },
    completed: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    cancelled: { color: 'text-gray-600 bg-gray-50', icon: AlertTriangle }
  };

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/work-orders');
      if (!response.ok) throw new Error('獲取工單數據失敗');
      const data = await response.json();
      setWorkOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = workOrders.filter(order => {
    if (filter !== 'all' && order.status !== filter) return false;
    if (searchTerm && !order.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 實作工單提交邏輯
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="page-title">工單管理</h1>
              <p className="page-subtitle">管理與追蹤所有維修與保養工單</p>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowForm(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              新增工單
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Tool className="w-6 h-6" />
            </div>
            <p className="stat-label">總工單數</p>
            <p className="stat-value">{workOrders.length}</p>
          </div>
          {/* 其他統計卡片 */}
        </div>

        <div className="card mb-6">
          <div className="p-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜尋工單..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">全部工單</option>
                  <option value="pending">待處理</option>
                  <option value="in_progress">處理中</option>
                  <option value="completed">已完成</option>
                  <option value="cancelled">已取消</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-container" />
        ) : error ? (
          <div className="error-container">
            <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
            <p className="text-gray-600">{error}</p>
          </div>
        ) : (
          <div className="card">
            <div className="divide-y divide-gray-200">
              {filteredOrders.map(order => {
                const { icon: Icon, color } = statusConfig[order.status];
                return (
                  <div key={order.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded-lg ${color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900">
                              {order.title}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {order.factory_name}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-gray-500">
                              <Calendar className="w-4 h-4 inline mr-1" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </div>
                            <div className="text-sm text-gray-500">
                              <User className="w-4 h-4 inline mr-1" />
                              {order.assigned_to_name}
                            </div>
                            <button className="text-blue-600 hover:text-blue-700">
                              <ArrowRight className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {filteredOrders.length === 0 && (
                <div className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    目前無工單
                  </h3>
                  <p className="text-gray-500">
                    點擊右上角「新增工單」建立新的工作單
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}