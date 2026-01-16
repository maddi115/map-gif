import React from 'react';
import { AlwaysVisiblePopupOptions } from '../map/MakePopupAlwaysVisible';

export default function RenderDropActionButtons({ markerRef, comment, setComment, gifState, setGifState, setShowInput, setIsDropLocked }) {
  const handleDrop = () => {
    if (!markerRef.current) return;
    const gifUrl = gifState.selectedGif?.images?.fixed_width_small?.url || gifState.selectedGif?.images?.fixed_height_small?.url;
    
    let html = '<div style="display: flex; flex-direction: column; align-items: center; gap: 4px;">';
    if (gifUrl) html += `<img src="${gifUrl}" style="max-width:120px; border-radius:4px; display:block;"/>`;
    if (comment) html += `<div style="font-size:13px; font-weight: 600; text-align: center; color:#1e293b;">${comment}</div>`;
    html += '</div>';

    if (gifUrl || comment) {
      // Apply the always visible options here
      markerRef.current.bindPopup(html, { 
        ...AlwaysVisiblePopupOptions,
        maxWidth: 180, 
        minWidth: 120 
      }).openPopup();

      setShowInput(false);
      setIsDropLocked(true);
      setComment('');
      setGifState({ searchTerm: '', gifs: [], selectedGif: null, isSearching: false });
    }
  };

  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      <button 
        onClick={handleDrop} 
        disabled={!gifState.selectedGif && !comment} 
        style={{ flex: 1, padding: '12px', background: (!gifState.selectedGif && !comment) ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
      >
        🎯 Drop
      </button>
      <button 
        onClick={() => setShowInput(false)} 
        style={{ padding: '12px', background: '#334155', color: '#94a3b8', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
      >
        ✕
      </button>
    </div>
  );
}
