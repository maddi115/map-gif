import React from 'react';
export default function RenderGifSearchResultsGrid({ gifState, setGifState }) {
  if (!gifState.gifs.length) return null;
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', maxHeight: '180px', overflowY: 'auto', marginBottom: '16px', padding: '8px', background: '#0f172a', borderRadius: '10px', border: '1px solid #334155' }}>
      {gifState.gifs.map(gif => (
        <img key={gif.id} src={gif.images.fixed_height_small.url} onClick={() => setGifState({...gifState, selectedGif: gif})} style={{ width: '100%', height: '80px', objectFit: 'cover', borderRadius: '6px', cursor: 'pointer', border: '1px solid #334155' }} />
      ))}
    </div>
  );
}
