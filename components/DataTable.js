// components/DataTable.js
export default function DataTable({ factories }) {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>廠區</th>
          <th>碳排放總量</th>
          <th>製程排放</th>
          <th>能源排放</th>
          <th>節能率</th>
          <th>減碳成果</th>
        </tr>
      </thead>
      <tbody>
        {factories.map(factory => (
          <tr key={factory.factory_id}>
            <td>{factory.factory_name}</td>
            <td>{factory.carbon_emissions} 噸</td>
            <td>
              {factory.process_emissions} 噸 
              ({Math.round((factory.process_emissions / factory.carbon_emissions) * 100)}%)
            </td>
            <td>
              {factory.energy_emissions} 噸 
              ({Math.round((factory.energy_emissions / factory.carbon_emissions) * 100)}%)
            </td>
            <td>{factory.efficiency_rate}%</td>
            <td className={factory.carbon_reduction < 0 ? 'stat-positive' : 'stat-negative'}>
              {factory.carbon_reduction}% (與去年同期)
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}