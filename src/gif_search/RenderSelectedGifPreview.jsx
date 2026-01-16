import React from 'react'

export default function RenderSelectedGifPreview({ selectedGif, setSelectedGif }) {
  if (!selectedGif) return null
  const gifUrl = selectedGif.images?.fixed_height_small?.url || selectedGif.images?.fixed_height?.url
  return (
    <div style={{
      marginBottom: '16px',
      padding: '12px',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>✓ SELECTED</div>
      <img src={gifUrl} alt="Selected GIF" style={{ maxWidth: '120px', maxHeight: '120px', borderRadius: '6px' }} />
      <button onClick={() => setSelectedGif(null)} style={{
        marginTop: '8px',
        padding: '6px 12px',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '11px',
        cursor: 'pointer',
        fontWeight: '600'
      }}>✕ Remove</button>
    </div>
  )
}
