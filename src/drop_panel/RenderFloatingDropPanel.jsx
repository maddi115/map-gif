import React from 'react';
import RenderGifSearchInput from '../gif_search/RenderGifSearchInput';
import RenderGifSearchResultsGrid from '../gif_search/RenderGifSearchResultsGrid';
import RenderSelectedGifPreview from '../gif_search/RenderSelectedGifPreview';
import RenderDropActionButtons from './RenderDropActionButtons';

export default function RenderFloatingDropPanel(props) {
  return (
    <div style={{
      position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
      backgroundColor: '#1e293b', padding: '20px', borderRadius: '16px', border: '1px solid #334155',
      width: '270px', maxWidth: '90vw', maxHeight: '80vh', overflowY: 'auto', zIndex: 1000, boxShadow: '0 8px 32px rgba(0,0,0,0.8)'
    }}>
      <RenderSelectedGifPreview {...props} />
      {!props.gifState.selectedGif && <RenderGifSearchInput {...props} />}
      {!props.gifState.selectedGif && <RenderGifSearchResultsGrid {...props} />}
      
      <div style={{ marginBottom: '12px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>
          💬 Comment ({props.comment.length}/25)
        </label>
        <textarea 
          maxLength={25}
          style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '8px', background: '#0f172a', color: 'white', border: '1px solid #334155', fontSize: '13px', resize: 'none', height: '50px' }}
          placeholder="Short message..."
          value={props.comment}
          onChange={e => props.setComment(e.target.value)}
        />
      </div>
      
      <RenderDropActionButtons {...props} />

      {props.marker && (
        <div style={{ marginTop: '12px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
          📍 {props.marker.lat.toFixed(4)}, {props.marker.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
