// components/Charts/LineChart.js
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function CustomLineChart({ data }) {
  const chartData = data.map(factory => ({
    name: factory.factory_name,
    efficiency: factory.efficiency_rate,
    carbonReduction: Math.abs(factory.carbon_reduction)
  }))

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'white',
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
        }}>
          <p className="label">{`廠區: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.dataKey === 'efficiency' ? '節能率' : '減碳成果'}: {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="efficiency" 
          stroke="#667eea" 
          strokeWidth={2}
          name="節能率"
        />
        <Line 
          type="monotone" 
          dataKey="carbonReduction" 
          stroke="#48bb78" 
          strokeWidth={2}
          name="減碳成果"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}