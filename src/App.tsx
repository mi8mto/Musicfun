import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import "./App.css";

export function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [tracks, setTracks] = useState(null);

  useEffect(() => {
    console.log("effect");
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
        <h1>Musicfun player</h1>
        <span>Loading...</span>
      </div>
    );
  }

  if (tracks.length === 0) {
    return (
      <div>
        <h1>Musicfun player</h1>
        <span>No tracks</span>
      </div>
    );
  }

  return (
    <>
      <h1>Musicfun player</h1>
      <button
        onClick={() => {
          setSelectedTrackId(null);
        }}
      >
        reset soundtrack
      </button>
      <ul>
        {tracks.map((track) => (
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
        ))}
      </ul>
    </>
  );
}
