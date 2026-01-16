import React from 'react';
import { AlwaysVisiblePopupOptions } from '../map/MakePopupAlwaysVisible';
import RenderSleekComment from '../comment/RenderSleekComment';
import { Button } from "../components/ui/button";

export default function RenderDropActionButtons({ markerRef, comment, setComment, gifState, setGifState, setShowInput, setIsDropLocked }) {
  const handleDrop = () => {
    if (!markerRef.current) return;
    const gifUrl = gifState.selectedGif?.images?.fixed_width_small?.url || gifState.selectedGif?.images?.fixed_height_small?.url;
    
    let html = '<div style="display: flex; flex-direction: column; align-items: center; padding: 4px;">';
    if (gifUrl) {
      html += `<img src="${gifUrl}" style="max-width: 130px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.5); border: 1px solid rgba(255,255,255,0.1);"/>`;
    }
    html += RenderSleekComment(comment);
    html += '</div>';

    if (gifUrl || comment) {
      markerRef.current.bindPopup(html, { 
        ...AlwaysVisiblePopupOptions,
        maxWidth: 200, 
        minWidth: 140 
      }).openPopup();

      setShowInput(false);
      setIsDropLocked(true);
      setComment('');
      setGifState({ searchTerm: '', gifs: [], selectedGif: null, isSearching: false });
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        onClick={handleDrop} 
        disabled={!gifState.selectedGif && !comment} 
        variant="primary"
        className="flex-1 font-bold"
      >
        🎯 Drop
      </Button>
      <Button 
        onClick={() => setShowInput(false)} 
        variant="ghost"
        className="w-10 px-0"
      >
        ✕
      </Button>
    </div>
  );
}
