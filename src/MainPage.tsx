// main.tsx

import { useState } from "react";
import { TracksList } from "./ui/TracksList.tsx";
import { TrackDetail } from "./ui/TrackDetail.tsx";
import "./index.css";

export function MainPage() {
  const [trackId, setTrackId] = useState<string | null>(null);

  const handleTrackSelect = (id: string | null): void => {
    setTrackId(id);
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "40px" }}>
        <TracksList
          selectedTrackId={trackId}
          onTrackSelect={handleTrackSelect}
        />
        <TrackDetail trackId={trackId} />
      </div>
    </div>
  );
}
