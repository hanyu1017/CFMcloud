// pages/index.js
const React = require('react');
const { useState, useEffect } = React;

const FactorySystem = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [loginFormData, setLoginFormData] = useState({ username: '', password: '' });
  const [registerFormData, setRegisterFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    company: ''
  });

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

  // 關閉所有彈窗
  const closeAllModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  // 彈窗背景點擊處理
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeAllModals();
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

  // 登入彈窗組件
  const LoginModal = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (loginFormData.username && loginFormData.password) {
        handleLogin(loginFormData);
      }
    };

    return React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
      },
      onClick: handleBackdropClick
    }, React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e5e7eb',
        width: '90%',
        maxWidth: '420px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        transform: 'scale(1)',
        animation: 'modalSlideIn 0.3s ease-out'
      }
    }, [
      // 關閉按鈕
      React.createElement('button', {
        key: 'close-btn',
        onClick: closeAllModals,
        style: {
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#9ca3af',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'all 0.2s ease'
        },
        onMouseEnter: (e) => {
          e.target.style.color = '#374151';
          e.target.style.backgroundColor = '#f3f4f6';
        },
        onMouseLeave: (e) => {
          e.target.style.color = '#9ca3af';
          e.target.style.backgroundColor = 'transparent';
        }
      }, '×'),

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
      React.createElement('form', {
        key: 'form',
        onSubmit: handleSubmit
      }, [
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
            value: loginFormData.username,
            onChange: (e) => setLoginFormData({...loginFormData, username: e.target.value}),
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
            value: loginFormData.password,
            onChange: (e) => setLoginFormData({...loginFormData, password: e.target.value}),
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

        // 提交按鈕
        React.createElement('button', {
          key: 'submit-btn',
          type: 'submit',
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
        }, '立即登入')
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
          key: 'signup-prompt',
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
            onClick: () => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            },
            style: {
              flex: 1,
              padding: '0.75rem',
              background: 'white',
              color: '#059669',
              border: '2px solid #059669',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            },
            onMouseEnter: (e) => {
              e.target.style.background = '#059669';
              e.target.style.color = 'white';
            },
            onMouseLeave: (e) => {
              e.target.style.background = 'white';
              e.target.style.color = '#059669';
            }
          }, '立即註冊'),
          
          React.createElement('button', {
            key: 'guest-btn',
            onClick: () => {
              closeAllModals();
              handleGuestMode();
            },
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
        ])
      ])
    ]));
  };

  // 註冊彈窗組件
  const RegisterModal = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      if (registerFormData.password !== registerFormData.confirmPassword) {
        alert('密碼確認不匹配！');
        return;
      }
      if (registerFormData.username && registerFormData.email && registerFormData.password) {
        handleRegister(registerFormData);
      }
    };

    return React.createElement('div', {
      style: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
      },
      onClick: handleBackdropClick
    }, React.createElement('div', {
      style: {
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2.5rem',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
        border: '1px solid #e5e7eb',
        width: '90%',
        maxWidth: '480px',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        transform: 'scale(1)',
        animation: 'modalSlideIn 0.3s ease-out'
      }
    }, [
      // 關閉按鈕
      React.createElement('button', {
        key: 'close-btn',
        onClick: closeAllModals,
        style: {
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          cursor: 'pointer',
          color: '#9ca3af',
          padding: '0.5rem',
          borderRadius: '50%',
          transition: 'all 0.2s ease'
        },
        onMouseEnter: (e) => {
          e.target.style.color = '#374151';
          e.target.style.backgroundColor = '#f3f4f6';
        },
        onMouseLeave: (e) => {
          e.target.style.color = '#9ca3af';
          e.target.style.backgroundColor = 'transparent';
        }
      }, '×'),

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

      // 註冊表單
      React.createElement('form', {
        key: 'form',
        onSubmit: handleSubmit
      }, [
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
            value: registerFormData.username,
            onChange: (e) => setRegisterFormData({...registerFormData, username: e.target.value}),
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
            onFocus: (e) => e.target.style.borderColor = '#059669',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入用戶名稱'
          })
        ]),

        React.createElement('div', {
          key: 'email-field',
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
          }, '電子郵件 *'),
          React.createElement('input', {
            key: 'input',
            type: 'email',
            value: registerFormData.email,
            onChange: (e) => setRegisterFormData({...registerFormData, email: e.target.value}),
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
            onFocus: (e) => e.target.style.borderColor = '#059669',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入電子郵件'
          })
        ]),

        React.createElement('div', {
          key: 'company-field',
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
          }, '公司名稱'),
          React.createElement('input', {
            key: 'input',
            type: 'text',
            value: registerFormData.company,
            onChange: (e) => setRegisterFormData({...registerFormData, company: e.target.value}),
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
            onFocus: (e) => e.target.style.borderColor = '#059669',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入公司名稱（選填）'
          })
        ]),

        React.createElement('div', {
          key: 'password-field',
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
          }, '密碼 *'),
          React.createElement('input', {
            key: 'input',
            type: 'password',
            value: registerFormData.password,
            onChange: (e) => setRegisterFormData({...registerFormData, password: e.target.value}),
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
            onFocus: (e) => e.target.style.borderColor = '#059669',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請輸入密碼'
          })
        ]),

        React.createElement('div', {
          key: 'confirm-password-field',
          style: { marginBottom: '2rem' }
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
          }, '確認密碼 *'),
          React.createElement('input', {
            key: 'input',
            type: 'password',
            value: registerFormData.confirmPassword,
            onChange: (e) => setRegisterFormData({...registerFormData, confirmPassword: e.target.value}),
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
            onFocus: (e) => e.target.style.borderColor = '#059669',
            onBlur: (e) => e.target.style.borderColor = '#e5e7eb',
            placeholder: '請再次輸入密碼'
          })
        ]),

        // 提交按鈕
        React.createElement('button', {
          key: 'submit-btn',
          type: 'submit',
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
        React.createElement('p', {
          key: 'login-prompt',
          style: {
            color: '#64748b',
            fontSize: '0.875rem',
            marginBottom: '1rem'
          }
        }, '已經有帳戶了？'),
        
        React.createElement('button', {
          key: 'login-btn',
          onClick: () => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          },
          style: {
            padding: '0.75rem 2rem',
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
        }, '立即登入')
      ])
    ]));
  };

  // 主要首頁內容
  return React.createElement('div', {
    style: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      fontFamily: "'Microsoft JhengHei', 'PingFang TC', 'Noto Sans TC', system-ui, sans-serif"
    }
  }, [
    // 樣式定義
    React.createElement('style', {
      key: 'modal-styles',
      jsx: true
    }, `
      @keyframes modalSlideIn {
        from {
          opacity: 0;
          transform: scale(0.9) translateY(-20px);
        }
        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      body {
        overflow: ${(showLoginModal || showRegisterModal) ? 'hidden' : 'auto'};
      }
    `),

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
      // Logo 區域
      React.createElement('div', {
        key: 'logo',
        style: { display: 'flex', alignItems: 'center', gap: '0.75rem' }
      }, [
        React.createElement('div', {
          key: 'logo-icon',
          style: { fontSize: '2rem' }
        }, '🏭'),
        React.createElement('div', {
          key: 'logo-text',
          style: {
            fontSize: '1.5rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #3b82f6 0%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }
        }, '智慧工廠')
      ]),

      // 導航按鈕
      React.createElement('div', {
        key: 'nav-buttons',
        style: { display: 'flex', gap: '1rem', alignItems: 'center' }
      }, [
        React.createElement('button', {
          key: 'login-nav-btn',
          onClick: () => setShowLoginModal(true),
          style: {
            padding: '0.75rem 1.5rem',
            background: 'white',
            color: '#3b82f6',
            border: '2px solid #3b82f6',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          },
          onMouseEnter: (e) => {
            e.target.style.background = '#3b82f6';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-1px)';
          },
          onMouseLeave: (e) => {
            e.target.style.background = 'white';
            e.target.style.color = '#3b82f6';
            e.target.style.transform = 'translateY(0)';
          }
        }, '登入'),
        
        React.createElement('button', {
          key: 'register-nav-btn',
          onClick: () => setShowRegisterModal(true),
          style: {
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '2rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(5, 150, 105, 0.3)'
          },
          onMouseEnter: (e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)';
          },
          onMouseLeave: (e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 12px rgba(5, 150, 105, 0.3)';
          }
        }, '免費註冊')
      ])
    ])),

    // 主要內容區域
    React.createElement('main', {
      key: 'main',
      style: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem'
      }
    }, [
      // Hero 區域
      React.createElement('section', {
        key: 'hero',
        style: {
          textAlign: 'center',
          marginBottom: '6rem'
        }
      }, [
        React.createElement('div', {
          key: 'hero-icon',
          style: {
            fontSize: '6rem',
            marginBottom: '2rem',
            animation: 'float 3s ease-in-out infinite'
          }
        }, '🏭'),
        
        React.createElement('h1', {
          key: 'hero-title',
          style: {
            fontSize: '3.5rem',
            fontWeight: '800',
            background: 'linear-gradient(135deg, #1f2937 0%, #3b82f6 50%, #059669 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '1.5rem',
            lineHeight: '1.1'
          }
        }, '智慧工廠監控系統'),
        
        React.createElement('p', {
          key: 'hero-subtitle',
          style: {
            fontSize: '1.25rem',
            color: '#64748b',
            marginBottom: '3rem',
            maxWidth: '600px',
            margin: '0 auto 3rem auto',
            lineHeight: '1.6'
          }
        }, '運用先進技術，提升生產效率，實現智慧製造的全新體驗'),

        // CTA 按鈕組
        React.createElement('div', {
          key: 'cta-buttons',
          style: {
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }
        }, [
          React.createElement('button', {
            key: 'main-login-btn',
            onClick: () => setShowLoginModal(true),
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
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)'
            },
            onMouseEnter: (e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.5)';
            },
            onMouseLeave: (e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.4)';
            }
          }, '開始使用 →'),
          
          React.createElement('button', {
            key: 'main-register-btn',
            onClick: () => setShowRegisterModal(true),
            style: {
              padding: '1.25rem 2.5rem',
              background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(5, 150, 105, 0.4)'
            },
            onMouseEnter: (e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(5, 150, 105, 0.5)';
            },
            onMouseLeave: (e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.4)';
            }
          }, '立即註冊'),
          
          React.createElement('button', {
            key: 'guest-main-btn',
            onClick: handleGuestMode,
            style: {
              padding: '1.25rem 2.5rem',
              background: 'white',
              color: '#64748b',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            },
            onMouseEnter: (e) => {
              e.target.style.background = '#f8fafc';
              e.target.style.borderColor = '#cbd5e1';
              e.target.style.transform = 'translateY(-2px)';
            },
            onMouseLeave: (e) => {
              e.target.style.background = 'white';
              e.target.style.borderColor = '#e5e7eb';
              e.target.style.transform = 'translateY(0)';
            }
          }, '訪客體驗')
        ])
      ]),

      // 特色功能區域
      React.createElement('section', {
        key: 'features',
        style: {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }
      }, [
        React.createElement('div', {
          key: 'feature-1',
          style: {
            background: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          },
          onMouseEnter: (e) => e.target.style.transform = 'translateY(-5px)',
          onMouseLeave: (e) => e.target.style.transform = 'translateY(0)'
        }, [
          React.createElement('div', {
            key: 'icon',
            style: { fontSize: '3rem', marginBottom: '1rem' }
          }, '📊'),
          React.createElement('h3', {
            key: 'title',
            style: {
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }
          }, '即時監控'),
          React.createElement('p', {
            key: 'desc',
            style: {
              color: '#64748b',
              lineHeight: '1.6'
            }
          }, '24/7 即時監控生產線狀態，快速發現並解決問題')
        ]),
        
        React.createElement('div', {
          key: 'feature-2',
          style: {
            background: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          },
          onMouseEnter: (e) => e.target.style.transform = 'translateY(-5px)',
          onMouseLeave: (e) => e.target.style.transform = 'translateY(0)'
        }, [
          React.createElement('div', {
            key: 'icon',
            style: { fontSize: '3rem', marginBottom: '1rem' }
          }, '🤖'),
          React.createElement('h3', {
            key: 'title',
            style: {
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }
          }, 'AI 智能分析'),
          React.createElement('p', {
            key: 'desc',
            style: {
              color: '#64748b',
              lineHeight: '1.6'
            }
          }, '運用人工智慧技術，預測設備維護需求，優化生產效率')
        ]),
        
        React.createElement('div', {
          key: 'feature-3',
          style: {
            background: 'white',
            borderRadius: '1.5rem',
            padding: '2rem',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            textAlign: 'center',
            transition: 'transform 0.3s ease'
          },
          onMouseEnter: (e) => e.target.style.transform = 'translateY(-5px)',
          onMouseLeave: (e) => e.target.style.transform = 'translateY(0)'
        }, [
          React.createElement('div', {
            key: 'icon',
            style: { fontSize: '3rem', marginBottom: '1rem' }
          }, '🔧'),
          React.createElement('h3', {
            key: 'title',
            style: {
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1rem'
            }
          }, '遠程控制'),
          React.createElement('p', {
            key: 'desc',
            style: {
              color: '#64748b',
              lineHeight: '1.6'
            }
          }, '隨時隨地遠程監控和控制工廠設備，提升管理效率')
        ])
      ])
    ]),

    // 浮動動畫樣式
    React.createElement('style', {
      key: 'float-animation',
      jsx: true
    }, `
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
    `),

    // 彈窗渲染
    showLoginModal && LoginModal(),
    showRegisterModal && RegisterModal()
  ]);
};

module.exports = FactorySystem;