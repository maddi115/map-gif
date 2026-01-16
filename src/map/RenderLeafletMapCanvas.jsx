import { useEffect, useRef } from 'react'
import InitializeLeafletMapInstance from './InitializeLeafletMapInstance'
import PlaceMarkerOnMap from './PlaceMarkerOnMap'

export default function RenderLeafletMapCanvas({ markerData, setMarkerData, showInput, setShowInput, selectedGif, setSelectedGif }) {
  const mapRef = useRef(null)

  useEffect(() => {
    InitializeLeafletMapInstance(mapRef, { markerData, setMarkerData, showInput, setShowInput, selectedGif, setSelectedGif })
    return () => { mapRef.current?._leaflet_map?.remove() }
  }, [markerData, setMarkerData, showInput, setShowInput, selectedGif, setSelectedGif])

  return <div ref={mapRef} style={{ flex: 1, position: 'relative' }} />
}
