import { useEffect, useRef } from 'react';
import L from 'leaflet';
import DisableDoubleClickZoom from './DisableDoubleClickZoom';
import CheckIfPlacementIsAllowed from './CheckIfPlacementIsAllowed';
import 'leaflet/dist/leaflet.css';

export default function LeafletMap({ setMarker, markerRef, setShowInput, setGifState, setComment, isDropLocked }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const isLockedRef = useRef(isDropLocked);

  useEffect(() => {
    isLockedRef.current = isDropLocked;
  }, [isDropLocked]);

  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
        fadeAnimation: true,
        zoomAnimation: true
    }).setView([34.0522, -118.2437], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    mapInstanceRef.current = map;
    DisableDoubleClickZoom(map);

    map.on('click', (e) => {
      if (!CheckIfPlacementIsAllowed(isLockedRef.current)) return;
      const { lat, lng } = e.latlng;
      setMarker({ lat, lng });
      setShowInput(true);
      setGifState(prev => ({ ...prev, selectedGif: null, gifs: [], searchTerm: '' }));
      setComment('');

      if (markerRef.current) mapInstanceRef.current.removeLayer(markerRef.current);

      const icon = L.divIcon({
        className: 'custom-marker',
        html: '<div style="background: white; width:12px; height:12px; border-radius:50%; box-shadow:0 0 15px white;"></div>',
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      markerRef.current = L.marker([lat, lng], { icon }).addTo(mapInstanceRef.current);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(p => {
        const { latitude, longitude } = p.coords;
        if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
            mapInstanceRef.current.setView([latitude, longitude], 15);
        }
      }, (err) => console.log("Location denied."));
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full bg-black" />;
}
