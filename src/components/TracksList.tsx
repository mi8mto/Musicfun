import { useState, useEffect } from "react";
const apiKey = import.meta.env.VITE_API_KEY;

export function TracksList(props) {
  const [tracks, setTracks] = useState(null);

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
    props.onTrackSelect?.(null);
  };
  return (
    <div>
      <hr />
      <button onClick={handleResetClick}>reset</button>
      <ul>
        {tracks.map((track) => {
          const handleClick = () => {
            props.onTrackSelect?.(track.id);
          };

          return (
            <li
              key={track.id}
              style={{
                border:
                  track.id === props.selectedTrackId
                    ? "1px solid orange"
                    : "none",
              }}
            >
              <div onClick={handleClick}>{track.attributes.title}</div>

              <audio controls src={track.attributes.attachments[0].url}></audio>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
