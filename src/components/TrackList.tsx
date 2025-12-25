import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

export function TrackList() {
  const [tracks, setTracks] = useState(null);
  const [selectedTrackId, setSelectedTrackId] = useState(null);

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

  return (
    <ul>
      {tracks.map((track) => {
        return (
          <li
            key={track.id}
            style={{
              border:
                track.id === selectedTrackId ? "1px solid orange" : "none",
            }}
          >
            <div
              onClick={() => {
                setSelectedTrackId(track.id);
              }}
            >
              {track.attributes.title}
            </div>

            <audio controls src={track.attributes.attachments[0].url}></audio>
          </li>
        );
      })}
    </ul>
  );
}
