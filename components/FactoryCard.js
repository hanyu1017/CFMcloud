// components/FactoryCard.js
export default function FactoryCard({ factory }) {
  const statusColors = {
    online: 'bg-green-100 text-green-800',
    offline: 'bg-red-100 text-red-800',
    maintenance: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{factory.factory_name}</h3>
          <p className="text-sm text-gray-500">{factory.location}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[factory.status]}`}>
          {factory.status === 'online' ? '運作中' : '停止運作'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-sm text-gray-500">碳排放量</p>
          <p className="text-lg font-semibold">{factory.carbon_emissions} 噸</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-gray-500">能源消耗</p>
          <p className="text-lg font-semibold">{factory.energy_consumption} kWh</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">效率指數</div>
          <div className="text-sm font-medium text-blue-600">{factory.efficiency_rate}%</div>
        </div>
        <div className="mt-2 h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-600 rounded-full transition-all duration-300" 
            style={{ width: `${factory.efficiency_rate}%` }}
          />
        </div>
      </div>
    </div>
  );
}