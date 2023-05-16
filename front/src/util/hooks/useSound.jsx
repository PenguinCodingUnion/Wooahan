import { Howl } from "howler";
import { useEffect, useRef } from "react";

export const useSound = (src, volume = 1, fadeoutTime = 0) => {
  const sound = useRef(null);
  const soundStop = () => {
    sound.current.stop();
    sound.current.unload();
    sound.current = null;
  };
  const soundPlay = (src) => {
    if (sound.current && sound.current.playing()) soundStop();

    sound.current = new Howl({
      src,
      onplay: function () {
        const fadeouttime = fadeoutTime;
        setTimeout(
          () => this.fade(volume, 0, fadeouttime),
          (this.duration() - this.seek()) * 1000 - fadeouttime
        );
      },
    });
    sound.current.volume(volume);
    sound.current.loop(true);
    sound.current.play();
  };

  useEffect(() => {
    soundPlay(src);

    return () => {
      soundStop();
    };
  }, []);
};
export default useSound;
