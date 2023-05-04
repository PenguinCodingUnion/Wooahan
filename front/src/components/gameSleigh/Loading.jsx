import { useProgress } from "@react-three/drei";

// 로딩 게이지 확인용도
export const LoadingProgress = (props) => {
  const progress = useProgress();

  if (progress.progress === 100) {
    setTimeout(() => {
      props.setIsLoading(false);
    }, 1000);
  }

  return null;
};

// 로딩 페이지
export const SleighLoading = () => {
  return (
    <div
      className="mx-auto h-screen"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: "red",
      }}
    >
      로딩중 입니다.
    </div>
  );
};

export default SleighLoading;
