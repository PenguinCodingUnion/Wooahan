import { useProgress } from "@react-three/drei";

// 로딩 게이지 확인용도
export const LoadingProgress = (props) => {
  const progress = useProgress();

  if (progress.progress === 100) {
    setTimeout(() => {
      props.setIsLoading(false);
    }, 2000);
  }

  return null;
};

export default LoadingProgress;
