import React, { useState } from 'react';

const FactoryDashboardHome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    // 基本驗證
    if (!formData.email || !formData.password) {
      alert('請填寫所有必填欄位！');
      return;
    }
    
    if (!isLogin && !formData.name) {
      alert('請輸入您的姓名！');
      return;
    }
    
    if (isLogin) {
      // 登入邏輯
      console.log('登入:', { email: formData.email, password: formData.password });
      // 這裡可以添加實際的登入API調用
      // 成功後跳轉到儀表板
      alert('登入成功！即將跳轉到儀表板...');
    } else {
      // 註冊邏輯
      if (formData.password !== formData.confirmPassword) {
        alert('密碼確認不匹配！');
        return;
      }
      console.log('註冊:', { 
        name: formData.name, 
        email: formData.email, 
        password: formData.password 
      });
      alert('註冊成功！請登入您的帳戶。');
      setIsLogin(true);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--primary-900, #0f172a) 0%, var(--primary-800, #1e293b) 50%, var(--accent-blue, #2563eb) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif",
      position: 'relative'
    }}>
      {/* 背景裝飾 */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(79, 70, 229, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
        `,
        pointerEvents: 'none'
      }}></div>

      {/* 動態背景圓點 */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.3), transparent),
          radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.3), transparent),
          radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.3), transparent),
          radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.3), transparent)
        `,
        backgroundSize: '150px 150px',
        animation: 'backgroundMove 20s linear infinite',
        pointerEvents: 'none'
      }}></div>

      <div className="card" style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 1.5rem',
        position: 'relative',
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(203, 213, 225, 0.3)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}>
        {/* 系統標題 */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, var(--accent-blue, #2563eb) 0%, var(--accent-indigo, #4f46e5) 100%)',
            borderRadius: '20px',
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)'
          }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7V17C3 18.1 3.9 19 5 19H19C20.1 19 21 18.1 21 17V7H3Z" fill="white" fillOpacity="0.9"/>
              <path d="M21 5H3V7H21V5Z" fill="white"/>
              <path d="M7 9H17V11H7V9Z" fill="rgba(37, 99, 235, 0.8)"/>
              <path d="M7 13H13V15H7V13Z" fill="rgba(37, 99, 235, 0.6)"/>
            </svg>
          </div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: 'var(--primary-900, #0f172a)',
            marginBottom: '0.5rem',
            letterSpacing: '-0.02em'
          }}>
            工廠監控系統
          </h1>
          <p style={{
            color: 'var(--gray-600, #4b5563)',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            智能製造管理平台
          </p>
        </div>

        {/* 表單切換標籤 */}
        <div style={{
          display: 'flex',
          marginBottom: '2rem',
          background: 'var(--gray-100, #f3f4f6)',
          borderRadius: '12px',
          padding: '6px',
          position: 'relative'
        }}>
          <div
            style={{
              position: 'absolute',
              top: '6px',
              left: isLogin ? '6px' : '50%',
              width: 'calc(50% - 6px)',
              height: 'calc(100% - 12px)',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 1
            }}
          />
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              color: isLogin ? 'var(--primary-900, #0f172a)' : 'var(--gray-500, #6b7280)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 2,
              fontSize: '0.875rem'
            }}
          >
            登入
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              padding: '0.75rem',
              border: 'none',
              borderRadius: '8px',
              background: 'transparent',
              color: !isLogin ? 'var(--primary-900, #0f172a)' : 'var(--gray-500, #6b7280)',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'color 0.3s ease',
              position: 'relative',
              zIndex: 2,
              fontSize: '0.875rem'
            }}
          >
            註冊
          </button>
        </div>

        {/* 表單 */}
        <div>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                姓名
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                placeholder="請輸入您的姓名"
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              電子郵件
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="請輸入您的電子郵件"
            />
          </div>

          <div style={{ marginBottom: isLogin ? '1.5rem' : '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem'
            }}>
              密碼
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '1rem',
                transition: 'border-color 0.3s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#667eea'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
              placeholder="請輸入您的密碼"
            />
          </div>

          {!isLogin && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '0.5rem'
              }}>
                確認密碼
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.3s ease',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                placeholder="請再次輸入密碼"
              />
            </div>
          )}

          {isLogin && (
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                color: '#718096',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{ marginRight: '0.5rem' }}
                />
                記住我
              </label>
              <a href="#" style={{
                fontSize: '0.875rem',
                color: '#667eea',
                textDecoration: 'none'
              }}>
                忘記密碼？
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              fontSize: '1rem',
              padding: '0.875rem'
            }}
          >
            {isLogin ? '登入系統' : '建立帳戶'}
          </button>
        </div>

        {/* 分隔線和其他登入選項 */}
        <div style={{
          margin: '2rem 0',
          position: 'relative',
          textAlign: 'center'
        }}>
          <div style={{
            height: '1px',
            background: 'var(--gray-300, #d1d5db)',
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0
          }}></div>
          <span style={{
            background: 'white',
            padding: '0 1.5rem',
            color: 'var(--gray-500, #6b7280)',
            fontSize: '0.875rem',
            fontWeight: '500'
          }}>
            或使用社交帳號
          </span>
        </div>

        {/* 社交登入按鈕 */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '0.75rem',
          marginBottom: '2rem'
        }}>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              border: '2px solid var(--gray-300, #d1d5db)',
              borderRadius: '12px',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--gray-700, #374151)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent-blue, #2563eb)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--gray-300, #d1d5db)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
              <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button
            type="button"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.75rem',
              border: '2px solid var(--gray-300, #d1d5db)',
              borderRadius: '12px',
              background: 'white',
              cursor: 'pointer',
              transition: 'all 0.15s ease-in-out',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: 'var(--gray-700, #374151)'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent-blue, #2563eb)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--gray-300, #d1d5db)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ marginRight: '0.5rem' }}>
              <path fill="#1877f2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Facebook
          </button>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontSize: '0.875rem',
            color: 'var(--gray-600, #4b5563)',
            fontWeight: '500'
          }}>
            {isLogin ? '還沒有帳戶？' : '已有帳戶？'}
            <button
              type="button"
              onClick={toggleForm}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-blue, #2563eb)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontSize: '0.875rem',
                marginLeft: '0.25rem',
                fontWeight: '600'
              }}
            >
              {isLogin ? '立即註冊' : '立即登入'}
            </button>
          </p>
        </div>
      </div>

      {/* 頁腳資訊 */}
      <div style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        textAlign: 'center',
        color: 'rgba(255,255,255,0.8)',
        fontSize: '0.75rem'
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          © 2025 工廠監控系統. 版權所有
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            隱私政策
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            服務條款
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>
            技術支援
          </a>
        </div>
      </div>

      {/* CSS 動畫定義 */}
      <style jsx>{`
        @keyframes backgroundMove {
          0% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -10px); }
          50% { transform: translate(10px, -5px); }
          75% { transform: translate(-5px, 10px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

export default FactoryDashboardHome;