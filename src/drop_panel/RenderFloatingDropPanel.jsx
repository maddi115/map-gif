import React from 'react'
import RenderGifSearchInput from '../gif_search/RenderGifSearchInput'
import RenderGifSearchResultsGrid from '../gif_search/RenderGifSearchResultsGrid'
import RenderSelectedGifPreview from '../gif_search/RenderSelectedGifPreview'
import RenderCommentTextInput from '../comment/RenderCommentTextInput'

export default function RenderFloatingDropPanel({
  showInput,
  setShowInput,
  commentData,
  setCommentData,
  gifs,
  gifSearch,
  selectedGif,
  isSearching,
  setGifSearch,
  setGifs,
  setSelectedGif
}) {
  if (!showInput) return null

  return (
    <div style={{ 
      position: 'absolute', 
      bottom: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      backgroundColor: '#1e293b',
      padding: '20px',
      borderRadius: '16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
      border: '1px solid #334155',
      minWidth: '270px',
      maxWidth: '90vw',
      maxHeight: '80vh',
      overflowY: 'auto',
      zIndex: 1000
    }}>
      <RenderGifSearchInput
        gifSearch={gifSearch}
        setGifSearch={setGifSearch}
        isSearching={isSearching}
        setGifs={setGifs}
      />
      <RenderSelectedGifPreview
        selectedGif={selectedGif}
        setSelectedGif={setSelectedGif}
      />
      <RenderGifSearchResultsGrid
        gifs={gifs}
        selectedGif={selectedGif}
        setSelectedGif={setSelectedGif}
      />
      <RenderCommentTextInput
        commentData={commentData}
        setCommentData={setCommentData}
      />

      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => alert('DROP MARKER with GIF + COMMENT')}
          disabled={!selectedGif && !commentData}
          style={{
            flex: 1,
            padding: '12px',
            background: (!selectedGif && !commentData) ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '700',
            cursor: (!selectedGif && !commentData) ? 'not-allowed' : 'pointer',
            fontSize: '14px'
          }}
        >
          🎯 Drop
        </button>
        <button
          onClick={() => {
            setShowInput(false)
            setSelectedGif(null)
            setGifs([])
            setGifSearch('')
            setCommentData('')
          }}
          style={{
            padding: '12px 16px',
            backgroundColor: '#334155',
            color: '#94a3b8',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '13px'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
