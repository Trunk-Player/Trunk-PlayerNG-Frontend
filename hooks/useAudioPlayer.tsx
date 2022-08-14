import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

export const useAudioPlayer = (
  src: string,
  children: ReactNode
): [
  ReactNode,
  AudioContext,
  StereoPannerNode | null,
  MutableRefObject<HTMLAudioElement | null>
] => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const component = (
    <audio
      ref={audioRef}
      src={src}
      controls={false}
    >
      {children}
    </audio>
  );
  const context = new AudioContext();
  const [track, setTrack] = useState<StereoPannerNode | null>(null);

  useEffect(() => {
    if (audioRef.current !== null) {
      try {
        context.createMediaElementSource(audioRef.current);
        const t = new StereoPannerNode(context, { pan: 0 });
        t.connect(context.destination);
        setTrack(t);
        // TODO: Handle error with notification.
        // eslint-disable-next-line no-empty
      } catch {}
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [component, context, track, audioRef];
};
