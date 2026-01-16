import React from 'react';

export default function RenderDropActionButtons({ markerRef, comment, setComment, gifState, setGifState, setShowInput }) {
  const handleDrop = () => {
    if (!markerRef.current) return;
    const gifUrl = gifState.selectedGif?.images?.fixed_width_small?.url || gifState.selectedGif?.images?.fixed_height_small?.url;
    
    let html = '';
    if (gifUrl) html += `<img src="${gifUrl}" style="max-width:120px; border-radius:4px; display:block; margin-bottom:6px;"/>`;
    if (comment) html += `<div style="font-size:13px; max-width:150px; color:#1e293b;">${comment}</div>`;

    if (html) {
      markerRef.current.bindPopup(html, { maxWidth: 180, minWidth: 120 }).openPopup();
      setShowInput(false);
      setComment('');
      setGifState({ searchTerm: '', gifs: [], selectedGif: null, isSearching: false });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button onClick={handleDrop} disabled={!gifState.selectedGif && !comment} style={{ flex: 1, padding: '12px', background: (!gifState.selectedGif && !comment) ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>🎯 Drop</button>
      <button onClick={() => setShowInput(false)} style={{ padding: '12px', background: '#334155', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>✕</button>
    </div>
  );
}
