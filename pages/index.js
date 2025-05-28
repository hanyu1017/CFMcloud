// pages/index.js
const React = require('react');
const { useState, useEffect } = React;

const FactorySystem = () => {
  const [currentView, setCurrentView] = useState('home'); // 'home', 'login', 'register'
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 登入處理
  const handleLogin = (formData) => {
    // 導向 /factories
    if (typeof window !== 'undefined') {
      window.location.href = '/factories';
    }
  };

  // 註冊處理
  const handleRegister = (formData) => {
    // 導向 /factories
    if (typeof window !== 'undefined') {
      window.location.href = '/factories';
    }
  };

  // 訪客模式
  const handleGuestMode = () => {
    // 導向 /factories
    if (typeof window !== 'undefined') {
      window.location.href = '/factories';
    }
  };

  if (!mounted) {
    return React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: '#f8fafc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
    }, [
      React.createElement('div', {
        key: 'spinner',
        style: {
          width: '40px',
          height: '40px',
          border: '3px solid #e2e8f0',
          borderTop: '3px solid #3b82f6',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }
      }),
      React.createElement('style', {
        key: 'styles',
        jsx: true
      }, `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `)
    ]);
  }

  // 首頁組件
  const HomePage = () => React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }
  }, [
    // 頂部導航
    React.createElement('nav', {
      key: 'nav',
      style: {
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }
    }, React.createElement('div', {
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }
    }, [
      React.createElement('div', {
        key: 'logo',
        style: { display: 'flex', alignItems: 'center' }
      }, [
        React.createElement('div', {
          key: 'icon',
          style: {
            fontSize: '2rem',
            marginRight: '0.75rem'
          }
        }, '🏭'),
        React.createElement('div', { key: 'text' }, [
          React.createElement('h1', {
            key: 'title',
            style: {
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }
          }, '智慧工廠監控系統'),
          React.createElement('p', {
            key: 'subtitle',
            style: {
              fontSize: '0.875rem',
              color: '#64748b',
              margin: 0
            }
          }, 'Factory Intelligence Management Platform')
        ])
      ]),
      React.createElement('div', {
        key: 'nav-buttons',
        style: { display: 'flex', gap: '1rem' }
      }, [
        React.createElement('button', {
          key: 'login-btn',
          onClick: () => setCurrentView('login'),
          style: {
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.25)'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.35)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.25)';
          }
        }, '登入系統'),
        React.createElement('button', {
          key: 'guest-btn',
          onClick: handleGuestMode,
          style: {
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#475569',
            border: '2px solid #e2e8f0',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          },
          onMouseEnter: (e) => {
            e.target.style.borderColor = '#3b82f6';
            e.target.style.color = '#3b82f6';
          },
          onMouseLeave: (e) => {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.color = '#475569';
          }
        }, '訪客瀏覽')
      ])
    ])),

    // 主要內容
    React.createElement('div', {
      key: 'main',
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 100px)',
        padding: '2rem'
      }
    }, React.createElement('div', {
      style: {
        textAlign: 'center',
        maxWidth: '600px'
      }
    }, [
      // 主標題圖標
      React.createElement('div', {
        key: 'hero-icon',
        style: {
          fontSize: '4rem',
          marginBottom: '2rem'
        }
      }, '🏭'),
      
      // 主標題
      React.createElement('h2', {
        key: 'hero-title',
        style: {
          fontSize: '3rem',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }
      }, '智能製造管理平台'),
      
      // 描述
      React.createElement('p', {
        key: 'hero-desc',
        style: {
          fontSize: '1.25rem',
          color: '#64748b',
          marginBottom: '3rem',
          lineHeight: '1.6'
        }
      }, '整合多廠區生產數據，提供即時監控、智能分析與預測維護'),
      
      // 操作按鈕
      React.createElement('div', {
        key: 'hero-buttons',
        style: {
          display: 'flex',
          justifyContent: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap'
        }
      }, [
        React.createElement('button', {
          key: 'start-btn',
          onClick: () => setCurrentView('login'),
          style: {
            padding: '1.25rem 2.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
          }
        }, '開始使用 →'),
        
        React.createElement('button', {
          key: 'register-btn',
          onClick: () => setCurrentView('register'),
          style: {
            padding: '1.25rem 2.5rem',
            background: 'white',
            color: '#3b82f6',
            border: '2px solid #3b82f6',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          },
          onMouseEnter: (e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#3b82f6';
            e.target.style.transform = 'translateY(0)';
          }
        }, '立即註冊'),
        
        React.createElement('button', {
          key: 'guest-main-btn',
          onClick: handleGuestMode,
          style: {
            padding: '1.25rem 2.5rem',
            background: '#f8fafc',
            color: '#64748b',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          },
          onMouseEnter: (e) => {
            e.target.style.background = '#e5e7eb';
            e.target.style.transform = 'translateY(-2px)';
          },
          onMouseLeave: (e) => {
            e.target.style.background = '#f8fafc';
            e.target.style.transform = 'translateY(0)';
          }
        }, '訪客體驗')
      ])
    ]))
  ]);

  // 登入組件
  const LoginForm = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleSubmit = () => {
      if (formData.username && formData.password) {
        handleLogin(formData);
      }
    };

    return React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
      }
    }, React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        width: '100%',
        maxWidth: '400px'
      }
    }, [
      // 標題區域
      React.createElement('div', {
        key: 'header',
        style: { textAlign: 'center', marginBottom: '2rem' }
      }, [
        React.createElement('div', {
          key: 'icon',
          style: { fontSize: '3rem', marginBottom: '1rem' }
        }, '🏭'),
        React.createElement('h2', {
          key: 'title',
          style: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }
        }, '歡迎回來'),
        React.createElement('p', {
          key: 'subtitle',
          style: {
            color: '#64748b',
            fontSize: '0.875rem'
          }
        }, '登入您的工廠監控系統帳戶')
      ]),

      // 登入表單
      React.createElement('div', { key: 'form' }, [
        React.createElement('div', {
          key: 'username-field',
          style: { marginBottom: '1.5rem' }
        }, [
          React.createElement('label', {
            key: 'username-label',
            style: {
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }
          }, '用戶名稱或電子郵件'),
          React.createElement('input', {
            key: 'username-input',
            type: 'text',
            value: formData.username,
            onChange: (e) => setFormData({...formData, username: e.target.value}),
            style: {
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            },
            onFocus: (e) => e.target.style.borderColor = '#3b82f6',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入用戶名稱'
          })
        ]),

        React.createElement('div', {
          key: 'password-field',
          style: { marginBottom: '2rem' }
        }, [
          React.createElement('label', {
            key: 'password-label',
            style: {
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }
          }, '密碼'),
          React.createElement('input', {
            key: 'password-input',
            type: 'password',
            value: formData.password,
            onChange: (e) => setFormData({...formData, password: e.target.value}),
            style: {
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            },
            onFocus: (e) => e.target.style.borderColor = '#3b82f6',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入密碼'
          })
        ]),

        React.createElement('button', {
          key: 'submit-btn',
          onClick: handleSubmit,
          style: {
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
            marginBottom: '1.5rem'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
          }
        }, '登入系統')
      ]),

      // 其他選項
      React.createElement('div', {
        key: 'options',
        style: {
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
          textAlign: 'center'
        }
      }, [
        React.createElement('p', {
          key: 'question',
          style: {
            color: '#64748b',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }
        }, '還沒有帳戶？'),
        
        React.createElement('div', {
          key: 'action-buttons',
          style: { display: 'flex', gap: '0.75rem' }
        }, [
          React.createElement('button', {
            key: 'register-btn',
            onClick: () => setCurrentView('register'),
            style: {
              flex: 1,
              padding: '0.75rem',
              background: 'white',
              color: '#3b82f6',
              border: '2px solid #3b82f6',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            },
            onMouseEnter: (e) => {
              e.target.style.background = '#3b82f6';
              e.target.style.color = 'white';
            },
            onMouseLeave: (e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#3b82f6';
            }
          }, '立即註冊'),
          
          React.createElement('button', {
            key: 'guest-btn',
            onClick: handleGuestMode,
            style: {
              flex: 1,
              padding: '0.75rem',
              background: '#f8fafc',
              color: '#64748b',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            },
            onMouseEnter: (e) => {
              e.target.style.background = '#e5e7eb';
            },
            onMouseLeave: (e) => {
              e.target.style.background = '#f8fafc';
            }
          }, '訪客模式')
        ]),
        
        React.createElement('button', {
          key: 'back-btn',
          onClick: () => setCurrentView('home'),
          style: {
            marginTop: '1rem',
            color: '#64748b',
            background: 'none',
            border: 'none',
            fontSize: '0.875rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }
        }, '返回首頁')
      ])
    ]));
  };

  // 註冊組件
  const RegisterForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      company: ''
    });

    const handleSubmit = () => {
      if (formData.password !== formData.confirmPassword) {
        alert('密碼確認不匹配！');
        return;
      }
      if (formData.username && formData.email && formData.password) {
        handleRegister(formData);
      }
    };

    return React.createElement('div', {
      style: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif",
        padding: '2rem'
      }
    }, React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '3rem',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb',
        width: '100%',
        maxWidth: '450px'
      }
    }, [
      // 標題區域
      React.createElement('div', {
        key: 'header',
        style: { textAlign: 'center', marginBottom: '2rem' }
      }, [
        React.createElement('div', {
          key: 'icon',
          style: { fontSize: '3rem', marginBottom: '1rem' }
        }, '🏭'),
        React.createElement('h2', {
          key: 'title',
          style: {
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '0.5rem'
          }
        }, '建立新帳戶'),
        React.createElement('p', {
          key: 'subtitle',
          style: {
            color: '#64748b',
            fontSize: '0.875rem'
          }
        }, '開始使用智慧工廠監控系統')
      ]),

      // 註冊表單 (簡化版本，完整版本太長)
      React.createElement('div', { key: 'form' }, [
        // 用戶名稱
        React.createElement('div', {
          key: 'username-field',
          style: { marginBottom: '1.25rem' }
        }, [
          React.createElement('label', {
            key: 'label',
            style: {
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '0.5rem'
            }
          }, '用戶名稱 *'),
          React.createElement('input', {
            key: 'input',
            type: 'text',
            value: formData.username,
            onChange: (e) => setFormData({...formData, username: e.target.value}),
            style: {
              width: '100%',
              padding: '0.875rem 1rem',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              fontSize: '1rem',
              transition: 'border-color 0.2s ease',
              outline: 'none',
              boxSizing: 'border-box'
            },
            onFocus: (e) => e.target.style.borderColor = '#3b82f6',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入用戶名稱'
          })
        ]),

        // 提交按鈕
        React.createElement('button', {
          key: 'submit-btn',
          onClick: handleSubmit,
          style: {
            width: '100%',
            padding: '1rem',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '0.75rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
            marginBottom: '1.5rem'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.5)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.4)';
          }
        }, '建立帳戶')
      ]),

      // 其他選項
      React.createElement('div', {
        key: 'options',
        style: {
          borderTop: '1px solid #e5e7eb',
          paddingTop: '1.5rem',
          textAlign: 'center'
        }
      }, [
        React.createElement('button', {
          key: 'back-btn',
          onClick: () => setCurrentView('home'),
          style: {
            marginTop: '1rem',
            color: '#64748b',
            background: 'none',
            border: 'none',
            fontSize: '0.875rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }
        }, '返回首頁')
      ])
    ]));
  };

  // 根據當前視圖渲染對應組件
  switch (currentView) {
    case 'login':
      return LoginForm();
    case 'register':
      return RegisterForm();
    default:
      return HomePage();
  }
};

module.exports = FactorySystem;