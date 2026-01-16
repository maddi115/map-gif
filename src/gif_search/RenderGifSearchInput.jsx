import React from 'react';

export default function RenderGifSearchInput({ gifState, setGifState }) {
  const handleSearch = async () => {
    if (!gifState.searchTerm.trim()) return;
    setGifState(prev => ({ ...prev, isSearching: true }));
    try {
      const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=0b4Ls0Z42RdTVnUdJC8vKKfK6Imt9wsg&q=${encodeURIComponent(gifState.searchTerm)}&limit=12`);
      const { data } = await res.json();
      setGifState(prev => ({ ...prev, gifs: data || [], isSearching: false }));
    } catch (e) { setGifState(prev => ({ ...prev, isSearching: false })); }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>🎬 Search GIFs</label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input 
          style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #334155', background: '#0f172a', color: 'white', fontSize: '13px', outline: 'none' }}
          placeholder="excited, funny..."
          value={gifState.searchTerm}
          onChange={e => setGifState({...gifState, searchTerm: e.target.value})}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={gifState.isSearching} style={{ padding: '10px 16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
          {gifState.isSearching ? '...' : '🔍'}
        </button>
      </div>
    </div>
  );
}
