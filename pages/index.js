import { useState } from 'react'

export default function Dashboard() {
  const [message] = useState('廠區管理系統')
  
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>{message}</h1>
      <p>系統正在運行中...</p>
    </div>
  )
}