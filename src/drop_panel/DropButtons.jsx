import CreateGifMarker from '../marker/CreateGifMarker';
import { Button } from "../components/ui/button";

export default function DropButtons({ markerRef, comment, setComment, gifState, setGifState, setShowInput, setIsDropLocked }) {
  const handleDrop = () => {
    if (!markerRef.current) return;
    const gifUrl = gifState.selectedGif?.images?.fixed_width_small?.url || gifState.selectedGif?.images?.fixed_height_small?.url;
    
    if (gifUrl || comment) {
      const icon = CreateGifMarker(gifUrl, comment);
      markerRef.current.setIcon(icon);
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
