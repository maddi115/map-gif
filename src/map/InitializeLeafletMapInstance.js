import PlaceMarkerOnMap from './PlaceMarkerOnMap'

export default function InitializeLeafletMapInstance(mapRef, state) {
  if (!mapRef.current || mapRef.current._leaflet_map) return

  const createMap = () => {
    const map = window.L.map(mapRef.current).setView([34.0522, -118.2437], 13)
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '© OpenStreetMap contributors', maxZoom: 19 }).addTo(map)
    mapRef.current._leaflet_map = map

    map.on('click', e => PlaceMarkerOnMap(map, e.latlng, state))
  }

  if (!window.L) {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
    script.onload = createMap
    document.body.appendChild(script)
  } else { createMap() }
}
