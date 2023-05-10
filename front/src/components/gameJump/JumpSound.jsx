import { forwardRef, useEffect, useRef, useState } from "react";
import { useLoader, useThree } from "@react-three/fiber";
import { AudioListener, AudioLoader } from "three";

const JumpSound = forwardRef(({ url }, sound) => {
  // const sound = useRef();
  const { camera } = useThree();
  const [listener] = useState(() => new AudioListener());
  const buffer = useLoader(AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setVolume(10);

    // sound.current.play();
    // console.log(sound.current);
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);
  return <positionalAudio loop={false} ref={sound} args={[listener]} />;
});

export default JumpSound;
