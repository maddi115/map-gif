import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import DisableDoubleClickZoom from './DisableDoubleClickZoom';
import CheckIfPlacementIsAllowed from './CheckIfPlacementIsAllowed';
import 'leaflet/dist/leaflet.css';

export default function RenderLeafletMapCanvas({ setMarker, markerRef, setShowInput, setGifState, setComment, isDropLocked }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  // We use a Ref for the lock so the click handler always has the latest value 
  // without needing to re-initialize the entire map object.
  const isLockedRef = useRef(isDropLocked);

  useEffect(() => {
    isLockedRef.current = isDropLocked;
  }, [isDropLocked]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current).setView([34.0522, -118.2437], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 }).addTo(map);
    mapInstanceRef.current = map;

    DisableDoubleClickZoom(map);

    map.on('click', (e) => {
      // Check the ref instead of the state to avoid map re-renders
      if (!CheckIfPlacementIsAllowed(isLockedRef.current)) return;
      
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      setShowInput(true);
      setGifState(prev => ({ ...prev, selectedGif: null, gifs: [], searchTerm: '' }));
      setComment('');

      if (markerRef.current) mapInstanceRef.current.removeLayer(markerRef.current);
      
      const icon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width:20px; height:20px; border:2px solid #a78bfa; border-radius:4px; box-shadow:0 0 10px rgba(102,126,234,0.8);"></div>',
        iconSize: [20, 20],
        iconAnchor: [10, 10]
      });

      markerRef.current = L.marker([lat, lng], { icon }).addTo(mapInstanceRef.current);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        const { latitude, longitude } = p.coords;
        map.setView([latitude, longitude], 15);
      }, (err) => console.log("Location access denied."));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Empty array: Map only builds ONCE.

  return <div ref={mapContainerRef} style={{ height: '100%', width: '100%', cursor: isDropLocked ? 'not-allowed' : 'crosshair' }} />;
}
