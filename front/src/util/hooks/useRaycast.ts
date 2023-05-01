import { useThree } from "@react-three/fiber";
import { useMemo } from "react";
import { Object3D, Raycaster, Vector3 } from "three";

const useRaycast = (
  obj: { current: Object3D | null },
  height: number = 0,
  DIR: Vector3 = null
) => {
  const raycaster = useMemo(() => new Raycaster(), []);
  const pos = useMemo(() => new Vector3(), []);
  const dir = useMemo(() => (DIR ? DIR : new Vector3()), [DIR]);
  const scene = useThree((state) => state.scene);

  return () => {
    if (!obj.current) return [];
    obj.current.getWorldPosition(pos);
    pos.setY(pos.y + height);

    if (!DIR) obj.current.getWorldDirection(dir);

    raycaster.set(pos, dir);

    return raycaster.intersectObjects(scene.children);
  };
};

export default useRaycast;
