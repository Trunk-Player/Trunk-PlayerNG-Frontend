import AudioPlayer from "components/controls/AudioPlayer";
import { useMemo } from "react";
import type { Transmission } from "types/api/Transmission";

export interface TransmissionPlayerProps {
  audioBaseUrl?: string;
  transmission: Transmission;
}

const TransmissionPlayer = ({
  audioBaseUrl,
  transmission,
}: TransmissionPlayerProps) => {
  const audioUrl = useMemo(
    () =>
      audioBaseUrl && transmission.audio_file
        ? `${audioBaseUrl}${transmission.audio_file}`
        : undefined,
    [audioBaseUrl, transmission.audio_file]
  );

  return (
    <div>
      {audioUrl ? (
        <AudioPlayer
          size="minimal"
          src={audioUrl}
          start={transmission.start_time}
          end={transmission.end_time}
          units={transmission.units}
        />
      ) : (
        // <audio
        //   src={audioUrl}
        //   controls={true}
        // >
        //   <a
        //     href={audioUrl}
        //     rel="noreferrer"
        //     target="_blank"
        //     className="text-blue-600 underline"
        //   >
        //     {audioUrl}
        //   </a>
        // </audio>
        <span>Invalid Audio Url</span>
      )}
    </div>
  );
};

export default TransmissionPlayer;
