export default async function RemoveMapPOIIcons(styleUrl) {
  const response = await fetch(styleUrl);
  const style = await response.json();
  
  // Remove all POI (Point of Interest) icon layers
  style.layers = style.layers.filter(layer => {
    // Keep layers that don't have icons or are not POI-related
    const isPOI = layer.layout && layer.layout['icon-image'];
    return !isPOI;
  });
  
  return style;
}
