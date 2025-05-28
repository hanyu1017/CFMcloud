// pages/_app.js
const React = require('react');

function App({ Component, pageProps }) {
  // 動態載入 CSS
  if (typeof window !== 'undefined') {
    // 確保只在客戶端載入一次
    if (!window.__cssLoaded) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = '/styles/globals.css';
      document.head.appendChild(link);
      window.__cssLoaded = true;
    }
  }

  return React.createElement(Component, pageProps);
}

module.exports = App;