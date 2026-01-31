import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

export function TrackDetail(props) {
  const [selectedTrack, setSelectedTrack] = useState(null);
  const selectedTrackId = props.trackId;

  useEffect(() => {
    if (!selectedTrackId) {
      setSelectedTrack(null);
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
  );
}
