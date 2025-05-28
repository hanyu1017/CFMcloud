// pages/_app.js
import '../styles/globals.css'; // CSS 保持 import
const React = require('react');

function App({ Component, pageProps }) {
  return React.createElement(Component, pageProps);
}

module.exports = App;