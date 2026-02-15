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

type Props = {
  isSelected: boolean;
  onSelect: (trackId: string) => void;
  track: TrackListItemOutput;
};

export function TrackItem({ onSelect, track, isSelected }: Props) {
  const handleClick = () => onSelect?.(track.id);

  return (
    <li
      key={track.id}
      style={{
        border: isSelected ? "1px solid orange" : "none",
      }}
    >
      <div onClick={handleClick}>{track.attributes.title}</div>

      <audio controls src={track.attributes.attachments[0].url}></audio>
    </li>
  );
}
