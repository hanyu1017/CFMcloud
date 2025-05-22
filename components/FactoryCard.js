// components/FactoryCard.js
export default function FactoryCard({ factory }) {
  const getStatusClass = (status) => {
    return status === 'online' ? 'status-online' : 'status-offline'
  }

  const getStatusText = (status) => {
    return status === 'online' ? '運行中' : '離線'
  }

  return (
    <div className="factory-card">
      <div className="factory-header">
        <h3 className="factory-name">{factory.factory_name}</h3>
        <span className={`factory-status ${getStatusClass(factory.status)}`}>
          {getStatusText(factory.status)}
        </span>
      </div>
      
      <div className="factory-metrics">
        <div className="metric">
          <div className="metric-value">{factory.carbon_emissions}</div>
          <div className="metric-label">碳排放量 (噸)</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.efficiency_rate}%</div>
          <div className="metric-label">節能率</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.energy_consumption}</div>
          <div className="metric-label">能源消耗</div>
        </div>
        <div className="metric">
          <div className="metric-value">{factory.carbon_reduction}%</div>
          <div className="metric-label">減碳成果</div>
        </div>
      </div>
    </div>
  )
}