import { Howl } from "howler";
import { useEffect } from "react";

export const useSound = (src, volume = 1, fadeoutTime = 0) => {
  let sound;
  const soundStop = () => {
    sound.stop();
    sound.unload();
  };
  const soundPlay = (src) => {
    if (sound && sound.playing()) soundStop();

    sound = new Howl({ src });
    sound.volume(volume);
    sound.loop(true);
    sound.play();
  };

  const handleVisibilityChange = () => {
    console.log(document.visibilityState);

    if (document.hidden) {
      soundStop();
    } else {
      soundPlay(src);
    }
  };

  useEffect(() => {
    soundPlay(src);
    sound.on("play", () => {
      const fadeouttime = fadeoutTime;
      setTimeout(
        () => sound.fade(volume, 0, fadeouttime),
        (sound.duration() - sound.seek()) * 1000 - fadeouttime
      );
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      soundStop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
export default useSound;
