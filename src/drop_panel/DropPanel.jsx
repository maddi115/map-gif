import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import RenderGifSearchInput from '../gif_search/RenderGifSearchInput';
import RenderGifSearchResultsGrid from '../gif_search/RenderGifSearchResultsGrid';
import RenderSelectedGifPreview from '../gif_search/RenderSelectedGifPreview';
import DropButtons from './DropButtons';

export default function DropPanel(props) {
  return (
    <Card className="bg-black/90 border-zinc-800 backdrop-blur-md shadow-2xl text-white overflow-hidden border">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">📍 Placement Coords</CardTitle>
        <p className="text-xs text-zinc-500 tabular-nums">
          {props.marker ? `${props.marker.lat.toFixed(4)}, ${props.marker.lng.toFixed(4)}` : "Selecting..."}
        </p>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <RenderSelectedGifPreview {...props} />
        {!props.gifState.selectedGif && <RenderGifSearchInput {...props} />}
        {!props.gifState.selectedGif && <RenderGifSearchResultsGrid {...props} />}
        <div className="space-y-2">
          <Label className="text-xs text-zinc-400">Comment ({props.comment.length}/25)</Label>
          <Textarea
            maxLength={25}
            className="bg-zinc-950 border-zinc-800 focus-visible:ring-zinc-700 resize-none h-16 text-sm text-white"
            placeholder="Write something sleek..."
            value={props.comment}
            onChange={e => props.setComment(e.target.value)}
          />
        </div>
        <DropButtons {...props} />
      </CardContent>
    </Card>
  );
}
