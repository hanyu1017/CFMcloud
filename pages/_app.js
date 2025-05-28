// pages/_app.js
require('../styles/globals.css');
const React = require('react');

function App({ Component, pageProps }) {
  return React.createElement(Component, pageProps);
}

module.exports = App;