import { useState, useEffect } from "react";
import { getTrack } from "../dal/api";
import type { GetTrackDetailsOutputData } from "../dal/api";

type Props = {
  trackId: string | null;
};

export function TrackDetail({ trackId }: Props) {
  const [selectedTrack, setSelectedTrack] =
    useState<GetTrackDetailsOutputData | null>(null);

  useEffect(() => {
    if (!trackId) {
      setSelectedTrack(null);
      return;
    }

    getTrack(trackId).then((json) => setSelectedTrack(json.data));
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
