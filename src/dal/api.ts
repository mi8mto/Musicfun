const apiKey = import.meta.env.VITE_API_KEY;

export type GetTrackDetailsOutputData = {
  id: string;
  attributes: {
    title: string;
    lyrics: string | null;
  };
};

type GetTrackDetailsOutput = {
  data: GetTrackDetailsOutputData;
};

export const getTrack = (trackId: string) => {
  const promise: Promise<GetTrackDetailsOutput> = fetch(
    "https://musicfun.it-incubator.app/api/1.0/playlists/tracks/" + trackId,
    {
      headers: {
        "api-key": apiKey,
      },
    },
  ).then((res) => res.json());
  return promise;
};

type AttachmentDto = {
  url: string;
};

type TrackListItemOutputAttributes = {
  title: string;
  attachments: Array<AttachmentDto>;
};

export type TrackListItemOutput = {
  id: string;
  attributes: TrackListItemOutputAttributes;
};

type GetTrackListOutput = { data: Array<GetTrackListOutput> };

export const getTracks = () => {
  const promise: Promise<GetTrackListOutput> = fetch(
    "https://musicfun.it-incubator.app/api/1.0/playlists/tracks",
    {
      headers: {
        "api-key": apiKey,
      },
    },
  ).then((res) => res.json());
  return promise;
};
