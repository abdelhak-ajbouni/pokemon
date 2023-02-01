import { useEffect, useState } from "react";

export default function useSound(path: string, options?: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio(path));
  const { delay } = options || {};

  const play = () => {
    if (delay) {
      setTimeout(() => {
        audio.play();
      }, delay);
    } else {
      setIsPlaying(true);
      audio.play();
    }
  }

  const stop = () => {
    setIsPlaying(false);
    audio.pause();
    audio.currentTime = 0;
  }

  useEffect(() => {
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  }, [audio]);

  return [isPlaying, play, stop] as const;
}
