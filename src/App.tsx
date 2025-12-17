import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;
import "./App.css";

export function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [tracks, setTracks] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);

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
          setSelectedTrack(null);
        }}
      >
        reset soundtrack
      </button>
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      >
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
                    // setIsLoading(true);

                    fetch(
                      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" +
                        track.id,
                      {
                        headers: {
                          "api-key": apiKey,
                        },
                      }
                    )
                      .then((res) => res.json())
                      .then((json) => setSelectedTrack(json.data));
                    // .finally(() => setIsLoading(false));
                  }}
                >
                  {track.attributes.title}
                </div>

                <audio
                  controls
                  src={track.attributes.attachments[0].url}
                ></audio>
              </li>
            );
          })}
        </ul>
        <div>
          <h2>Details</h2>
          {!selectedTrack && !selectedTrackId && "Track is not selected"}
          {!selectedTrack && selectedTrackId && "Loading..."}
          {selectedTrack &&
            selectedTrackId &&
            selectedTrack.id !== selectedTrackId &&
            "Loading..."}
          {selectedTrack && (
            <div>
              <h3>{selectedTrack.attributes.title}</h3>
              <p>
                <h4></h4>
                {selectedTrack.attributes.lyrics ?? "no lyrics"}
              </p>
            </div>
          )}
        </div>
        
      </div>
    </>
  );
}
