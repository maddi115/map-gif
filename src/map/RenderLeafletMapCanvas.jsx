import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function RenderLeafletMapCanvas({ setMarker, markerRef, setShowInput, setGifState, setComment }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;
    const map = L.map(mapContainerRef.current).setView([34.0522, -118.2437], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    mapInstanceRef.current = map;

    const placeMarker = (lat, lng) => {
      setMarker({ lat, lng });
      setShowInput(true);
      setGifState(prev => ({ ...prev, selectedGif: null, gifs: [], searchTerm: '' }));
      setComment('');

      if (markerRef.current) map.removeLayer(markerRef.current);
      const icon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width:20px; height:20px; border:2px solid #a78bfa; border-radius:4px; box-shadow:0 0 10px rgba(102,126,234,0.8);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });
      markerRef.current = L.marker([lat, lng], { icon }).addTo(map);
    };

    map.on('click', e => placeMarker(e.latlng.lat, e.latlng.lng));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        const { latitude, longitude } = p.coords;
        map.setView([latitude, longitude], 15);
        placeMarker(latitude, longitude);
      });
    }
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%' }} />;
}
