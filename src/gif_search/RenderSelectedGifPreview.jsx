import React from 'react';
export default function RenderSelectedGifPreview({ gifState, setGifState }) {
  if (!gifState.selectedGif) return null;
  return (
    <div style={{ marginBottom: '16px', padding: '12px', background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', textAlign: 'center' }}>
      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>✓ SELECTED</div>
      <img src={gifState.selectedGif.images.fixed_height_small.url} style={{ maxWidth: '120px', borderRadius: '6px' }} />
      <button onClick={() => setGifState({...gifState, selectedGif: null})} style={{ display: 'block', margin: '8px auto 0', padding: '6px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' }}>✕ Remove</button>
    </div>
  );
}
