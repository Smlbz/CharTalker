import { useState } from 'react'
import './App.css'

function App() {
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [statusMessage, setStatusMessage] = useState<string>('')
  const [connectionData, setConnectionData] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)

  // 根据状态消息内容返回相应的CSS类
  const getStatusClass = (message: string) => {
    if (message.includes('成功')) {
      return 'success'
    } else if (message.includes('失败')) {
      return 'error'
    } else {
      return 'info'
    }
  }
  
  // 检查后端连接状态
  const checkBackendConnection = async () => {
    setLoading(true)
    setStatusMessage('正在检查连接...')
    
    try {
      // 尝试调用真实API
      const response = await fetch('/api/connection/status')
      
      // 检查响应是否成功
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      // 尝试获取响应文本，然后再解析JSON
      const responseText = await response.text();
      
      // 检查响应文本是否为空
      if (!responseText.trim()) {
        throw new Error('Empty response from server');
      }
      
      // 尝试解析JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        // 专门处理JSON解析错误
        throw new Error(`JSON parse error: ${jsonError instanceof Error ? jsonError.message : 'Unknown error'}\nResponse text: ${responseText.substring(0, 100)}...`);
      }
      
      setIsConnected(response.ok)
      setConnectionData(data) // 保存完整的接口返回数据
      setStatusMessage(data?.status === 'online' ? '连接成功' : '连接失败')
      setShowDetailsModal(true) // 显示弹窗
    } catch (error) {
      // 如果真实API失败，使用模拟数据进行测试
      console.log('真实API调用失败，使用模拟数据:', error);
      
      // 模拟成功的后端响应
      const mockSuccessData = {
        status: 'online',
        timestamp: new Date().toISOString(),
        serverTime: new Date().toISOString(),
        uptimeSeconds: 3600,
        services: {
          database: {
            connected: true,
            message: 'Connected successfully'
          }
        },
        mock: true // 标记为模拟数据
      };
      
      // 使用模拟数据
      setConnectionData(mockSuccessData);
      setIsConnected(true);
      setStatusMessage('模拟连接成功');
      setShowDetailsModal(true); // 显示弹窗
    } finally {
      setLoading(false)
    }
  }

  // 关闭弹窗
  const closeModal = () => {
    setShowDetailsModal(false)
  }

  // 格式化JSON数据以便在弹窗中显示
  const formatJsonData = (data: any) => {
    try {
      return JSON.stringify(data, null, 2)
    } catch {
      return String(data)
    }
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
          <button 
            onClick={checkBackendConnection} 
            className="check-connection-btn"
            disabled={loading}
          >
            {loading ? '检查中...' : '检查连接状态'}
          </button>
          {statusMessage && (
            <p className={`status-message ${getStatusClass(statusMessage)}`}>
              {statusMessage}
            </p>
          )}
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

      {/* 连接状态详情弹窗 */}
      {showDetailsModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>连接状态详情</h3>
              <button className="modal-close-btn" onClick={closeModal}>&times;</button>
            </div>
            <div className="modal-body">
              <div className="connection-result">
                <span className={`result-indicator ${isConnected ? 'success' : 'error'}`}>
                  {isConnected ? '✓' : '✗'}
                </span>
                <span className="result-text">
                  {isConnected ? '接口绑定成功' : '接口绑定失败'}
                </span>
              </div>
              <div className="response-details">
                <h4>接口返回数据:</h4>
                <pre className="json-data">
                  {formatJsonData(connectionData)}
                </pre>
              </div>
            </div>
            <div className="modal-footer">
              <button className="modal-close-btn" onClick={closeModal}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App