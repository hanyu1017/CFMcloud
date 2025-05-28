// pages/n8n/index.js
import React from 'react';
import Layout from '../../components/Layout'; // 確保路徑正確

const N8nPage = () => {
  return (
    <Layout>
      <div className="page-container">
        <h1 className="page-title">n8n 服務</h1>
        <p className="page-subtitle">
          點擊以下連結以在新分頁中打開 n8n 服務：
        </p>
        <a
          href="https://cfmcloudn8n.up.railway.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          前往 n8n 服務
        </a>
      </div>
    </Layout>
  );
};

export default N8nPage;
