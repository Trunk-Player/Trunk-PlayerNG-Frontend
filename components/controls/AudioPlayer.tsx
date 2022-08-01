// import { useAudioPlayer } from "lib/hooks/useAudioPlayer";
import Link from "next/link";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import timezone from "dayjs/plugin/timezone";
import {
  ReactNode,
  SyntheticEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { secondsToMinutesSeconds } from "utils/timeUtils";
import classNames from "utils/classNames";

import {
  PlayIcon,
  PauseIcon,
  VolumeUpIcon,
  DownloadIcon,
} from "@heroicons/react/solid";

import type { TransmissionUnits } from "types/api/TransmissionUnit";

dayjs.extend(advancedFormat);
dayjs.extend(timezone);

const display24H = true;

export interface AudioPlayerProps {
  children?: ReactNode;
  src: string;
  start: string;
  end?: string;
  size: "minimal" | "detailed";
  detailedTitle?: string;
  detailedAuthor?: string;
  detailedAlbum?: string;
  className?: string;
  hasPlayPause?: boolean;
  hasCurrentTime?: boolean;
  hasDurationTime?: boolean;
  hasVolumeControl?: boolean;
  hasDownloadLink?: boolean;
  hasPlaybackSpeed?: boolean;
  units?: TransmissionUnits;
}

const AudioPlayer = ({
  children,
  src,
  start,
  end,
  size,
  // detailedTitle,
  // detailedAuthor,
  // detailedAlbum,
  className,
  hasPlayPause = true,
  hasCurrentTime = true,
  hasDurationTime = true,
  hasVolumeControl = true,
  hasDownloadLink = true,
  // hasPlaybackSpeed = true,
  units,
}: AudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [rendered, setRendered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);

  const isEmergency = useMemo(() => {
    return units ? units.filter((tu) => tu.emergency).length > 0 : false;
  }, [units]);

  // const [audioComponent, audioContext, audioTrack, audioRef] = useAudioPlayer(
  //   src,
  //   children
  // );

  useEffect(() => {
    if (audioRef.current !== null) {
      setRendered(true);
      // audioRef.current.on
    }
  }, []);

  const onAudioChange = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setIsPlaying(!e.currentTarget.paused);
    setCurrentTime(e.currentTarget.currentTime);
    setDuration(e.currentTarget.duration);
  };

  const doPlayAudio = () => {
    if (audioRef.current !== null) {
      audioRef.current.play();
    }
  };

  return size === "minimal" ? (
    <div
      className={classNames(
        className ? className : "",
        isEmergency
          ? "border-red-600 bg-red-200"
          : isPlaying
          ? "border-cyan-600 bg-cyan-50"
          : "border-gray-300 bg-gray-50",
        "py-3 px-5 border rounded-3xl bg-opacity-30 w-full flex flex-col"
      )}
    >
      <div className="flex justify-between items-center gap-x-3">
        {rendered ? (
          <>
            {hasPlayPause && (
              <>
                {!isPlaying ? (
                  <button onClick={doPlayAudio}>
                    <PlayIcon className="w-8 text-cyan-600 hover:text-cyan-700" />
                  </button>
                ) : (
                  <button onClick={doPlayAudio}>
                    <PauseIcon className="w-8 text-cyan-600 hover:text-cyan-700" />
                  </button>
                )}
              </>
            )}
            <span className="font-medium text-sm">
              {`${
                hasCurrentTime && currentTime !== null
                  ? secondsToMinutesSeconds(currentTime)
                  : ""
              }${hasCurrentTime && hasDurationTime ? " / " : ""}${
                hasDurationTime && duration !== null
                  ? secondsToMinutesSeconds(duration)
                  : "NULL"
              }`}
            </span>
            <span className="grow border mx-5"></span>
            {hasVolumeControl && (
              <button onClick={doPlayAudio}>
                <VolumeUpIcon className="w-6 text-cyan-600 text-opacity-60 hover:text-cyan-700" />
              </button>
            )}
            {hasDownloadLink && (
              <a
                href={src}
                download
              >
                <DownloadIcon className="w-6 text-cyan-600 text-opacity-60 hover:text-cyan-700" />
              </a>
            )}
          </>
        ) : (
          <span>Not Ready</span>
        )}
        <audio
          src={src}
          ref={audioRef}
          controls={false}
          onLoadedMetadata={onAudioChange}
          onPlay={onAudioChange}
          onPause={onAudioChange}
          onDurationChange={onAudioChange}
          onEnded={onAudioChange}
          onProgress={onAudioChange}
          onTimeUpdate={onAudioChange}
        >
          {children}
        </audio>
        {/* {audioComponent} */}
      </div>
      {units && (
        <div className="mt-2 text-xs text-gray-400 flex justify-between">
          <div>
            <span>Units:</span>{" "}
            <span>
              {units.map((tunit, i) => {
                const keyId = tunit.pos + tunit.UUID;
                let displayText = `(${tunit.unit})`; // `(${tunit.unit.decimal_id})`;

                return (
                  <span key={keyId}>
                    {i > 0 && ", "}
                    {tunit.emergency && (
                      <span className="font-bold text-red-600">EMERGENCY:</span>
                    )}
                    <Link
                      href={`/transmissionunits/${tunit.UUID}`}
                      passHref
                    >
                      <a
                        className={classNames(
                          tunit.emergency ? "font-bold text-red-600" : "",
                          "underline"
                        )}
                      >
                        {tunit.tag ? tunit.tag : displayText}
                      </a>
                    </Link>
                  </span>
                );
              })}
            </span>
          </div>
          <div>
            <span>
              {dayjs(start).format(
                display24H ? "MMM DD, YYYY HH:mm z" : "MMM DD, YYYY hh:mm A z"
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  ) : (
    <span>{children}</span>
  );
};

export default AudioPlayer;
