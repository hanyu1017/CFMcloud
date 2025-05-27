import React, { useState, useEffect, useMemo } from 'react';
import Layout from '../../components/Layout';
import MaintenanceCalendar from '../../components/maintenance/Calendar';
import { 
  Tool, AlertTriangle, CheckCircle, Calendar, 
  Search, Filter, BarChart2, Settings, Plus 
} from 'lucide-react';

export default function MaintenancePage() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'calendar'

  const statusConfig = {
    normal: { color: 'text-green-600 bg-green-50', icon: CheckCircle },
    warning: { color: 'text-yellow-600 bg-yellow-50', icon: AlertTriangle },
    critical: { color: 'text-red-600 bg-red-50', icon: AlertTriangle }
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/maintenance');
      if (!response.ok) throw new Error('獲取設備數據失敗');
      const data = await response.json();
      setEquipment(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate stats with useMemo to avoid unnecessary recalculations
  const stats = useMemo(() => {
    if (!equipment.length) return {
      total: 0,
      normal: 0,
      warning: 0,
      critical: 0
    };

    return {
      total: equipment.length,
      normal: equipment.filter(item => getMaintenanceStatus(item) === 'normal').length,
      warning: equipment.filter(item => getMaintenanceStatus(item) === 'warning').length,
      critical: equipment.filter(item => getMaintenanceStatus(item) === 'critical').length
    };
  }, [equipment]);

  const getMaintenanceStatus = (equipment) => {
    const today = new Date();
    const nextMaintenance = new Date(equipment.next_maintenance);
    const daysDiff = Math.ceil((nextMaintenance - today) / (1000 * 60 * 60 * 24));

    if (daysDiff < 0) return 'critical';
    if (daysDiff < 7) return 'warning';
    return 'normal';
  };

  // Add error boundary
  if (error) {
    return (
      <Layout>
        <div className="error-container">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">載入失敗</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchEquipment();
            }} 
            className="btn btn-primary"
          >
            重新載入
          </button>
        </div>
      </Layout>
    );
  }

  // Memoize filtered equipment
  const filteredEquipment = useMemo(() => {
    return equipment.filter(item => {
      if (filter !== 'all' && getMaintenanceStatus(item) !== filter) return false;
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      return true;
    });
  }, [equipment, filter, searchTerm]);

  // Render main content based on view
  const renderContent = () => {
    if (loading) {
      return <div className="loading-container">
        <div className="spinner" />
        <p className="text-gray-600 mt-4">載入設備數據中...</p>
      </div>;
    }

    if (view === 'calendar') {
      return <MaintenanceCalendar equipment={filteredEquipment} />;
    }

    return (
      <div className="card">
        <div className="divide-y divide-gray-200">
          {filteredEquipment.map(item => {
            const status = getMaintenanceStatus(item);
            const { icon: Icon, color } = statusConfig[status];
            return (
              <div key={item.equipment_id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.factory_name}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-sm text-gray-500">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          下次維護：{new Date(item.next_maintenance).toLocaleDateString()}
                        </div>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Settings className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {filteredEquipment.length === 0 && (
            <div className="p-8 text-center">
              <Tool className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                無符合條件的設備
              </h3>
              <p className="text-gray-500">
                請調整搜尋條件或新增設備
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="page-title">設備維護</h1>
              <p className="page-subtitle">管理設備維護排程與紀錄</p>
            </div>
            <button className="btn btn-primary">
              <Plus className="w-4 h-4 mr-2" />
              新增設備
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Tool className="w-6 h-6" />
            </div>
            <p className="stat-label">總設備數</p>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-green-100 text-green-600">
              <CheckCircle className="w-6 h-6" />
            </div>
            <p className="stat-label">正常運作</p>
            <p className="stat-value">{stats.normal}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-yellow-100 text-yellow-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="stat-label">待維護</p>
            <p className="stat-value">{stats.warning}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-red-100 text-red-600">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <p className="stat-label">急需維護</p>
            <p className="stat-value">{stats.critical}</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="card">
            <div className="p-4 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="搜尋設備..."
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
                    <option value="all">全部設備</option>
                    <option value="normal">正常運作</option>
                    <option value="warning">待維護</option>
                    <option value="critical">急需維護</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className={`btn ${view === 'list' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setView('list')}
                >
                  <BarChart2 className="w-4 h-4" />
                </button>
                <button
                  className={`btn ${view === 'calendar' ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setView('calendar')}
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </Layout>
  );
}