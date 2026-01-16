import React, { useState, useRef } from 'react';
import RenderApplicationHeader from './header/RenderApplicationHeader';
import RenderLeafletMapCanvas from './map/RenderLeafletMapCanvas';
import RenderFloatingDropPanel from './drop_panel/RenderFloatingDropPanel';

export default function App() {
  const [marker, setMarker] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [comment, setComment] = useState('');
  const [gifState, setGifState] = useState({ searchTerm: '', gifs: [], selectedGif: null, isSearching: false });
  const markerRef = useRef(null);

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, sans-serif', backgroundColor: '#0f172a', overflow: 'hidden' }}>
      <RenderApplicationHeader />
      <div style={{ flex: 1, position: 'relative' }}>
        <RenderLeafletMapCanvas 
          setMarker={setMarker}
          markerRef={markerRef} 
          setShowInput={setShowInput}
          setGifState={setGifState}
          setComment={setComment}
        />
        {showInput && (
          <RenderFloatingDropPanel
            marker={marker}
            markerRef={markerRef}
            comment={comment}
            setComment={setComment}
            gifState={gifState}
            setGifState={setGifState}
            setShowInput={setShowInput}
          />
        )}
      </div>
    </div>
  );
}
