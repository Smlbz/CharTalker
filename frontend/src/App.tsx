import { useState } from 'react'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)

  // 模拟检查后端连接状态
  const checkBackendConnection = () => {
    // 在实际应用中，这里会调用API检查后端连接
    setIsConnected(false)
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>CharTalker</h1>
        <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
          {isConnected ? '已连接' : '未连接'}
        </div>
      </header>
      
      <main className="app-main">
        <div className="welcome-section">
          <h2>欢迎使用CharTalker</h2>
          <p>一个简单的角色对话应用</p>
          <button onClick={checkBackendConnection} className="check-connection-btn">
            检查连接状态
          </button>
        </div>
        
        <div className="features-preview">
          <h3>功能预览</h3>
          <div className="feature-card">
            <h4>角色搜索</h4>
            <p>浏览和搜索各种对话角色</p>
          </div>
          <div className="feature-card">
            <h4>聊天功能</h4>
            <p>与你喜欢的角色进行对话</p>
          </div>
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© 2024 CharTalker - 简单的角色对话应用</p>
      </footer>
    </div>
  )
}

export default App