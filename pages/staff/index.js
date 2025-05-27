import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import {
  Users, AlertTriangle, Search, Filter,
  UserPlus, Mail, Phone, MapPin, Building,
  Briefcase, Clock, ChevronRight
} from 'lucide-react';

export default function StaffPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/staff');
      if (!response.ok) throw new Error('獲取人員數據失敗');
      const data = await response.json();
      setStaff(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredStaff = staff.filter(person => {
    if (filter !== 'all' && person.status !== filter) return false;
    if (departmentFilter !== 'all' && person.department_id !== departmentFilter) return false;
    if (searchTerm && !person.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  const departments = Array.from(new Set(staff.map(s => s.department_name)));
  
  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    onLeave: staff.filter(s => s.status === 'on_leave').length,
    departments: departments.length
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="page-header">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="page-title">人員管理</h1>
              <p className="page-subtitle">管理工廠人員配置與調度</p>
            </div>
            <button className="btn btn-primary">
              <UserPlus className="w-4 h-4 mr-2" />
              新增人員
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="stat-card">
            <div className="stat-icon bg-blue-100 text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <p className="stat-label">總人數</p>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-green-100 text-green-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <p className="stat-label">在職人數</p>
            <p className="stat-value">{stats.active}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-yellow-100 text-yellow-600">
              <Clock className="w-6 h-6" />
            </div>
            <p className="stat-label">請假人數</p>
            <p className="stat-value">{stats.onLeave}</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon bg-purple-100 text-purple-600">
              <Building className="w-6 h-6" />
            </div>
            <p className="stat-label">部門數量</p>
            <p className="stat-value">{stats.departments}</p>
          </div>
        </div>

        <div className="card mb-6">
          <div className="p-4 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="搜尋人員..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="text-gray-400 w-5 h-5" />
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                >
                  <option value="all">全部部門</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  className="border border-gray-300 rounded-lg px-3 py-2"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">全部狀態</option>
                  <option value="active">在職</option>
                  <option value="on_leave">請假</option>
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
              {filteredStaff.map(person => (
                <div key={person.staff_id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-600 font-medium">
                        {person.name.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {person.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {person.department_name} - {person.position}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Mail className="w-4 h-4" />
                            <span className="hidden md:inline">{person.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Phone className="w-4 h-4" />
                            <span className="hidden md:inline">{person.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <MapPin className="w-4 h-4" />
                            <span>{person.factory_name}</span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-500">
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredStaff.length === 0 && (
                <div className="p-8 text-center">
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    無符合條件的人員
                  </h3>
                  <p className="text-gray-500">
                    請調整搜尋條件或新增人員
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