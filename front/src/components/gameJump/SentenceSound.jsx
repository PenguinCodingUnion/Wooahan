import { useLoader, useThree } from "@react-three/fiber";
import { forwardRef, useEffect, useState } from "react";
import { AudioListener, AudioLoader } from "three";

const SentenceSound = forwardRef(({ fileName }, sound) => {
  // const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, fileName);

  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setVolume(170);

    // sound.current.play();

    camera.add(listener);
    return () => camera.remove(listener);
  }, [buffer, camera, listener, sound]);

  return <positionalAudio loop={false} ref={sound} args={[listener]} />;
});

export default SentenceSound;
