// pages/_app.js
import '../styles/globals.css'; // Import global styles
import React, { useEffect, useState } from 'react';

function App({ Component, pageProps }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevent rendering until the DOM is ready
  }

  return <Component {...pageProps} />;
}

export default App;