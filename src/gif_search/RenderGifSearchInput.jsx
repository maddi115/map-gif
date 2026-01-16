import React, { useState } from 'react'

const GIPHY_API_KEY = '0b4Ls0Z42RdTVnUdJC8vKKfK6Imt9wsg'

export default function RenderGifSearchInput({ gifSearch, setGifSearch, isSearching, setGifs }) {
  const [localSearching, setLocalSearching] = useState(false)

  const searchGifs = async () => {
    if (!gifSearch.trim()) return
    setLocalSearching(true)
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(gifSearch)}&limit=12`
      const res = await fetch(url)
      const data = await res.json()
      if (data.data) setGifs(data.data)
    } catch (e) { console.error(e) }
    setLocalSearching(false)
  }

  return (
    <div style={{ marginBottom: '16px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>
        🎬 Search GIFs
      </label>
      <div style={{ display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={gifSearch}
          onChange={e => setGifSearch(e.target.value)}
          onKeyDown={e => { if (e.key==='Enter') searchGifs() }}
          placeholder="excited, funny..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#0f172a',
            color: '#e2e8f0',
            fontSize: '13px',
            outline: 'none'
          }}
        />
        <button
          onClick={searchGifs}
          disabled={localSearching || !gifSearch.trim()}
          style={{
            padding: '10px 16px',
            background: localSearching ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: localSearching ? 'not-allowed' : 'pointer',
            fontSize: '13px'
          }}
        >{localSearching ? '...' : '🔍'}</button>
      </div>
    </div>
  )
}
