import { useProgress } from "@react-three/drei";
import LoadingImg from "assets/images/loading/SleighLoading.png";

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
    <div>
      <img
        className="absolute w-screen h-screen top-0"
        src={LoadingImg}
        alt="#"
      />
      <div className="absolute bottom-2 w-screen text-center font-MaplestoryBold text-[3vw] text-shadow-loading shadow-white">
        게임 정보를 불러오고 있습니다
      </div>
    </div>
  );
};

export default SleighLoading;
