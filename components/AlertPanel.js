// components/AlertPanel.js
export default function AlertPanel({ alerts }) {
  const getAlertLevelClass = (level) => {
    switch (level) {
      case 'high': return 'alert-high'
      case 'medium': return 'alert-medium'
      case 'low': return 'alert-low'
      default: return 'alert-medium'
    }
  }

  const getAlertLevelText = (level) => {
    switch (level) {
      case 'high': return '高'
      case 'medium': return '中'
      case 'low': return '低'
      default: return '中'
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffInHours < 24) {
      return `今天 ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
    } else if (diffInHours < 48) {
      return `昨天 ${date.toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
    } else {
      return date.toLocaleDateString('zh-TW')
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="card-title">廠區警報</h2>
        <a href="#" className="btn btn-secondary">查看全部</a>
      </div>
      
      <div className="alert-panel">
        {alerts.map(alert => (
          <div key={alert.alert_id} className="alert-item">
            <div className="alert-header">
              <div className="alert-title">
                {alert.factory_name}：{alert.message}
                <span className={`alert-level ${getAlertLevelClass(alert.alert_level)}`}>
                  {getAlertLevelText(alert.alert_level)}
                </span>
              </div>
              <div className="alert-time">
                {formatDate(alert.created_at)}
              </div>
            </div>
            <div className="alert-factory">{alert.factory_name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}