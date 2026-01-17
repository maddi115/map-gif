import { useState, useRef, useEffect } from 'react';
import RenderApplicationHeader from './header/RenderApplicationHeader';
import LeafletMap from './map/LeafletMap';
import DropPanel from './drop_panel/DropPanel';
import Toast from './components/ui/toast';

export default function App() {
  const [marker, setMarker] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [isDropLocked, setIsDropLocked] = useState(false);
  const [comment, setComment] = useState('');
  const [gifState, setGifState] = useState({ searchTerm: '', gifs: [], selectedGif: null, isSearching: false });
  const [showToast, setShowToast] = useState(false);
  const markerRef = useRef(null);

  useEffect(() => {
    if (isDropLocked) {
      setShowToast(true);
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isDropLocked]);

  return (
    <div className="dark w-screen h-screen flex flex-col bg-black text-white overflow-hidden font-sans">
      {showToast && <Toast message="GIF Dropped Successfully!" />}
      <RenderApplicationHeader />
      <div className="flex-1 relative">
        <LeafletMap
          setMarker={setMarker}
          markerRef={markerRef}
          setShowInput={setShowInput}
          setGifState={setGifState}
          setComment={setComment}
          isDropLocked={isDropLocked}
        />
        {showInput && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] w-full max-w-sm px-4">
             <DropPanel
                marker={marker}
                markerRef={markerRef}
                comment={comment}
                setComment={setComment}
                gifState={gifState}
                setGifState={setGifState}
                setShowInput={setShowInput}
                setIsDropLocked={setIsDropLocked}
              />
          </div>
        )}
      </div>
    </div>
  );
}
