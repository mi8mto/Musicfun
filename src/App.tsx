import { useState, useEffect } from "react";
import "./App.css";

export function App() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  useEffect(() => {
    if (!selectedTrackId) {
      return;
    }

    fetch(
      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" +
        selectedTrackId,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setSelectedTrack(json.data));
  }, [selectedTrackId]);

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
      ></div>
    </>
  );
}
