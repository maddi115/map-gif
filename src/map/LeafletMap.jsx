import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'maplibre-gl/dist/maplibre-gl.css';
import '@maplibre/maplibre-gl-leaflet';
import DisableDoubleClickZoom from './DisableDoubleClickZoom';
import CheckIfPlacementIsAllowed from './CheckIfPlacementIsAllowed';
import RemoveMapPOIIcons from './RemoveMapPOIIcons';
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

    const initMap = async () => {
      const map = L.map(mapContainerRef.current, {
          fadeAnimation: true,
          zoomAnimation: true
      }).setView([34.0522, -118.2437], 13);

      // Load style without POI icons
      const cleanStyle = await RemoveMapPOIIcons('https://tiles.openfreemap.org/styles/bright');

      L.maplibreGL({
        style: cleanStyle
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
          html: '<div style="background: white; width:12px; height:12px; border-radius:50%; box-shadow:0 0 15px rgba(0,0,0,0.3);"></div>',
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        markerRef.current = L.marker([lat, lng], { 
          icon,
          pane: 'overlayPane'
        }).addTo(mapInstanceRef.current);
      });
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} className="w-full h-full bg-white" />;
}
