import React from 'react';
export default function RenderApplicationHeader() {
  return (
    <div style={{ padding: '16px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b' }}>
      <h1 style={{ margin: 0, fontSize: '24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 'bold' }}>🎬 GIF Drop</h1>
      <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#94a3b8' }}>Drop GIFs at your location</p>
    </div>
  );
}
