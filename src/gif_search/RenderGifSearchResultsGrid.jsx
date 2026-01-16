import React from 'react'

export default function RenderGifSearchResultsGrid({ gifs, selectedGif, setSelectedGif }) {
  if (!gifs?.length) return null
  return (
    <div style={{
      marginBottom: '16px',
      maxHeight: '180px',
      overflowY: 'auto',
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '6px',
      padding: '8px',
      backgroundColor: '#0f172a',
      borderRadius: '10px',
      border: '1px solid #334155'
    }}>
      {gifs.map((gif, index) => (
        <img
          key={gif.id||index}
          src={gif.images?.fixed_height_small?.url||gif.images?.fixed_height?.url}
          alt={gif.title||`GIF ${index+1}`}
          onClick={() => setSelectedGif(gif)}
          style={{
            width: '100%',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '6px',
            cursor: 'pointer',
            border: selectedGif?.id===gif.id ? '2px solid #667eea' : '1px solid #334155',
            transition: 'all 0.2s'
          }}
        />
      ))}
    </div>
  )
}
