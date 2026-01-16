export default function DisableDoubleClickZoom(mapInstance) {
  if (mapInstance && mapInstance.doubleClickZoom) {
    mapInstance.doubleClickZoom.disable();
  }
}
