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
        console.log(this);
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
    // sound.on("play", () => {
    //   const fadeouttime = fadeoutTime;
    //   setTimeout(
    //     () => sound.fade(volume, 0, fadeouttime),
    //     (sound.duration() - sound.seek()) * 1000 - fadeouttime
    //   );
    // });

    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      soundStop();
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
};
export default useSound;
