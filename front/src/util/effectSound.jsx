import { Howl } from "howler";

export const effectSound = (src, volume = 1) => {
  let sound;
  const soundInject = (src) => {
    sound = new Howl({ src });
    sound.loop(false);
    sound.volume(volume);
    setTimeout(() => {
      sound.unload();
    }, 5000);
  };
  console.log(soundInject);
  soundInject(src);
  return sound;
};

export default effectSound;
