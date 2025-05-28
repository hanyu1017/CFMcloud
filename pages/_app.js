// pages/_app.js
const React = require('react');
const { useEffect } = React;

function App({ Component, pageProps }) {
  // 添加基本樣式
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const style = document.createElement('style');
      style.textContent = `
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Microsoft JhengHei', 'PingFang TC', system-ui, sans-serif;
          line-height: 1.6;
          color: #1f2937;
        }
        
        button {
          font-family: inherit;
          cursor: pointer;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return React.createElement(Component, pageProps);
}

module.exports = App;