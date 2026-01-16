export default function PlaceMarkerOnMap(map, { lat, lng }, { markerData, setMarkerData, showInput, setShowInput, selectedGif, setSelectedGif }) {
  setMarkerData({ lat, lng })
  setShowInput(true)
  setSelectedGif(null)

  if (map._lastMarker) map.removeLayer(map._lastMarker)

  const icon = window.L.divIcon({
    className: 'custom-marker',
    html: '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 20px; height: 20px; border: 2px solid #a78bfa; border-radius: 4px; box-shadow: 0 0 10px rgba(102, 126, 234, 0.8);"></div>',
    iconSize: [20,20], iconAnchor: [10,10]
  })

  const marker = window.L.marker([lat, lng], { icon }).addTo(map)
  map._lastMarker = marker
}
