import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useMemo } from "react";
import * as SkeletonUtils from "three/examples/jsm/utils/SkeletonUtils";

export const useClonedModel = (url) => {
  const { scene, materials, animations } = useGLTF(url);
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  // console.log(clonedScene);
  const { nodes } = useGraph(clonedScene);

  return { scene: clonedScene, materials, animations, nodes };
};
