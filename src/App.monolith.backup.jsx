import React, { useState, useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

export default function App() {
  const [marker, setMarker] = useState(null);
  const [comment, setComment] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [gifSearch, setGifSearch] = useState('');
  const [gifs, setGifs] = useState([]);
  const [selectedGif, setSelectedGif] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);
  
  const GIPHY_API_KEY = '0b4Ls0Z42RdTVnUdJC8vKKfK6Imt9wsg';

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = initMap;
    document.body.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
      }
    };
  }, []);

  const initMap = () => {
    if (mapInstanceRef.current || !window.L) return;

    const map = window.L.map(mapRef.current).setView([34.0522, -118.2437], 13);

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      maxZoom: 19
    }).addTo(map);

    mapInstanceRef.current = map;

    getUserLocation();

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      placeMarker(lat, lng);
    });
  };

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15);
          }
          placeMarker(latitude, longitude);
        },
        (error) => {
          console.error('Location error:', error);
        }
      );
    }
  };

  const placeMarker = (lat, lng) => {
    setMarker({ lat, lng });
    setShowInput(true);
    setSelectedGif(null);
    setGifs([]);
    setGifSearch('');

    if (markerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current);
    }

    const redSquareIcon = window.L.divIcon({
      className: 'custom-marker',
      html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 20px; height: 20px; border: 2px solid #a78bfa; border-radius: 4px; box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    if (mapInstanceRef.current) {
      const newMarker = window.L.marker([lat, lng], { icon: redSquareIcon }).addTo(mapInstanceRef.current);
      markerRef.current = newMarker;
    }
  };

  const searchGifs = async () => {
    if (!gifSearch.trim()) {
      alert('Please enter a search term!');
      return;
    }
    
    setIsSearching(true);
    
    try {
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(gifSearch)}&limit=12`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.data && data.data.length > 0) {
        setGifs(data.data);
      } else {
        setGifs([]);
        alert('No GIFs found. Try a different search!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error loading GIFs: ' + error.message);
      setGifs([]);
    }
    setIsSearching(false);
  };

  const handleGifSelect = (gif) => {
    setSelectedGif(gif);
  };

  const handleCommentSubmit = () => {
    if (!markerRef.current) return;
    
    let popupContent = '';
    
    if (selectedGif) {
      const gifUrl = selectedGif.images?.fixed_width_small?.url || selectedGif.images?.fixed_height_small?.url || selectedGif.images?.fixed_height?.url;
      if (gifUrl) {
        popupContent += `<img src="${gifUrl}" style="max-width: 120px; max-height: 120px; display: block; margin-bottom: 6px; border-radius: 4px;" />`;
      }
    }
    
    if (comment) {
      popupContent += `<div style="font-size: 13px; max-width: 150px;">${comment}</div>`;
    }
    
    if (popupContent) {
      markerRef.current.bindPopup(popupContent, { 
        maxWidth: 180,
        minWidth: 120
      }).openPopup();
      setShowInput(false);
      setSelectedGif(null);
      setGifs([]);
      setGifSearch('');
      setComment('');
    }
  };

  return (
    <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'system-ui, -apple-system, sans-serif', margin: 0, padding: 0, backgroundColor: '#0f172a' }}>
      <div style={{ padding: '16px', backgroundColor: '#0f172a', color: 'white', boxShadow: '0 2px 8px rgba(0,0,0,0.5)', borderBottom: '1px solid #1e293b' }}>
        <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>🎬 GIF Drop</h1>
        <p style={{ margin: '4px 0 0 0', fontSize: '13px', opacity: 0.7, color: '#94a3b8' }}>Drop GIFs at your location</p>
      </div>

      <div ref={mapRef} style={{ flex: 1, position: 'relative' }}></div>

      {showInput && (
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
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>
              🎬 Search GIFs
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchGifs();
                  }
                }}
                placeholder="excited, funny..."
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #334155',
                  backgroundColor: '#0f172a',
                  color: '#e2e8f0',
                  fontSize: '13px',
                  fontFamily: 'inherit',
                  outline: 'none'
                }}
              />
              <button
                onClick={searchGifs}
                disabled={isSearching || !gifSearch.trim()}
                style={{
                  padding: '10px 16px',
                  background: isSearching ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: isSearching ? 'not-allowed' : 'pointer',
                  fontSize: '13px'
                }}
              >
                {isSearching ? '...' : '🔍'}
              </button>
            </div>
          </div>

          {selectedGif && (
            <div style={{ 
              marginBottom: '16px', 
              padding: '12px', 
              backgroundColor: '#0f172a', 
              border: '1px solid #334155',
              borderRadius: '10px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>
                ✓ SELECTED
              </div>
              <img 
                src={selectedGif.images?.fixed_height_small?.url || selectedGif.images?.fixed_height?.url} 
                alt="Selected GIF"
                style={{ maxWidth: '120px', maxHeight: '120px', borderRadius: '6px' }}
              />
              <button
                onClick={() => setSelectedGif(null)}
                style={{
                  marginTop: '8px',
                  padding: '6px 12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '11px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ✕ Remove
              </button>
            </div>
          )}

          {gifs.length > 0 && (
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
                  key={gif.id || index}
                  src={gif.images?.fixed_height_small?.url || gif.images?.fixed_height?.url}
                  alt={gif.title || `GIF ${index + 1}`}
                  onClick={() => handleGifSelect(gif)}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    border: selectedGif?.id === gif.id ? '2px solid #667eea' : '1px solid #334155',
                    transition: 'all 0.2s'
                  }}
                />
              ))}
            </div>
          )}

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#94a3b8' }}>
              💬 Comment ({comment.length}/25)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
                fontFamily: 'inherit',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleCommentSubmit}
              disabled={!selectedGif && !comment}
              style={{
                flex: 1,
                padding: '12px',
                background: (!selectedGif && !comment) ? '#334155' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '700',
                cursor: (!selectedGif && !comment) ? 'not-allowed' : 'pointer',
                fontSize: '14px'
              }}
            >
              🎯 Drop
            </button>
            <button
              onClick={() => {
                setShowInput(false);
                setSelectedGif(null);
                setGifs([]);
                setGifSearch('');
                setComment('');
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
          
          {marker && (
            <div style={{ marginTop: '12px', fontSize: '11px', color: '#64748b', textAlign: 'center' }}>
              📍 {marker.lat.toFixed(4)}, {marker.lng.toFixed(4)}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
