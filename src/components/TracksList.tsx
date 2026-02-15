import { useState, useEffect } from "react";
import { TrackItem } from "./TrackItem.tsx";
const apiKey = import.meta.env.VITE_API_KEY;

type TrackListItemOutput = {
  id: string;
  title: string;
  artist: string;
  duration: number;
};

export function TracksList({ selectedTrackId, onTrackSelect }) {
  const [tracks, setTracks] = useState<Array<TrackListItemOutput> | null>(null);

  useEffect(() => {
    fetch("https://musicfun.it-incubator.app/api/1.0/playlists/tracks", {
      headers: {
        "api-key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((json) => setTracks(json.data));
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
