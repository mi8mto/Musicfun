import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

type GetTrackDetailOutputData = {
  id: string;
  attributes: {
    title: string;
    lyrics: string | null;
  };
};

export function TrackDetail({ trackId }) {
  const [selectedTrack, setSelectedTrack] =
    useState<GetTrackDetailOutputData | null>(null);

  useEffect(() => {
    if (!trackId) {
      setSelectedTrack(null);
      return;
    }

    fetch(
      "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" + trackId,
      {
        headers: {
          "api-key": apiKey,
        },
      }
    )
      .then((res) => res.json())
      .then((json) => setSelectedTrack(json.data));
  }, [trackId]);

  return (
    <div>
      <h2>Details</h2>
      {!selectedTrack && !trackId && "Track is not selected"}
      {!selectedTrack && trackId && "Loading..."}
      {selectedTrack && trackId && selectedTrack.id !== trackId && "Loading..."}
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
