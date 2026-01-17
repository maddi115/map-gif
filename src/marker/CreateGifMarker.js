import L from 'leaflet';
import CommentStyles from '../comment/CommentStyles';

export default function CreateGifMarker(gifUrl, comment) {
  return L.divIcon({
    className: 'custom-gif-marker',
    html: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 93px;">
      ${comment ? CommentStyles(comment) : ''}
      ${gifUrl ? `<img src="${gifUrl}" style="width: 65px; height: 65px; object-fit: cover; border-radius: 50%; box-shadow: 0 2px 12px rgba(0,0,0,0.25); border: 3px solid #ffffff;"/>` : ''}
    </div>`,
    iconSize: [93, 93],
    iconAnchor: [46.5, 46.5]
  });
}
