import { useState, useEffect } from "react";
import { TrackItem } from "./TrackItem.tsx";
import { getTracks, type TrackListItemOutput } from "../dal/api.ts";

type Props = {
  selectedTrackId: string | null;
  onTrackSelect?: (id: string | null) => void;
};

export function TracksList({ selectedTrackId, onTrackSelect }: Props) {
  const [tracks, setTracks] = useState<Array<TrackListItemOutput> | null>(null);

  useEffect(() => {
    console.log("effect");
    getTracks().then((json) => setTracks(json.data));
  }, []);

  if (tracks === null) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div>
        <span>No tracks</span>
      </div>
    );
  }

  const handleResetClick = () => {
    onTrackSelect?.(null);
  };
  const handleClick = (trackId: string) => {
    onTrackSelect?.(trackId);
  };

  return (
    <div>
      <hr />
      <button onClick={handleResetClick}>reset</button>
      <ul>
        {tracks.map((track) => {
          return (
            <TrackItem
              key={track.id}
              track={track}
              isSelected={track.id === selectedTrackId}
              onSelect={handleClick}
            />
          );
        })}
      </ul>
    </div>
  );
}
