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
  
        <AudioPlayer
          size="minimal"
          src={transmission.audio_file}
          start={transmission.start_time}
          end={transmission.end_time}
          units={transmission.units}
          talkgroup={transmission.talkgroup}
        />
    
    </div>
  );
};

export default TransmissionPlayer;
