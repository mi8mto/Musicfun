import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

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
      .then((json) => setSelectedTrackId(json.data));
  }, [selectedTrackId]);

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
      <div
        style={{
          display: "flex",
          gap: "30px",
        }}
      ></div>
    </>
  );
}
