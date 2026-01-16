import React from 'react'

export default function RenderCommentTextInput({ commentData, setCommentData }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>
        💬 Comment ({commentData.length}/25)
      </label>
      <textarea
        value={commentData}
        onChange={e => setCommentData(e.target.value)}
        maxLength={25}
        placeholder="Short message..."
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '8px',
          border: '1px solid #334155',
          backgroundColor: '#0f172a',
          color: '#e2e8f0',
          fontSize: '13px',
          resize: 'none',
          height: '50px',
          outline: 'none',
          boxSizing: 'border-box'
        }}
      />
    </div>
  )
}
