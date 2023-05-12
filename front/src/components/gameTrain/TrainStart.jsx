import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import trainlong from "assets/images/tmp/structure_train_long.png";
import Train from "./Train";
import instance from "util/Axios";
import pig from "assets/images/tmp/넷째돼지.png";
import jar from "assets/images/tmp/무공해항아리.avif";
import LoadingComponent from "components/common/LoadingComponent";

export const TrainStart = (props) => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    instance
      .get("/game/train/0")
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setdata(response);
      })
      .catch((error) => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
        setdata([
          {
            last: "지",
            word1: { name: "돼지", imgUrl: pig },
            word2: { name: "항아리", imgUrl: jar },
            ans: "돼지",
          },
          {
            last: "비",
            word1: { name: "나방", imgUrl: pig },
            word2: { name: "나비", imgUrl: jar },
            ans: "나비",
          },
          {
            last: "제",
            word1: { name: "사형제", imgUrl: pig },
            word2: { name: "도덕률", imgUrl: jar },
            ans: "사형제",
          },
        ]);
      });
  }, []);
  const [start, setStart] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const cilckStart = () => {
    setStart(<Train data={data} />);
  };
  return (
    <div>
      {isLoading && <LoadingComponent />}
      {!start && !isLoading && (
        <>
          <div className="h-6"></div>
          <div className=" h-[6rem]">
            <p className="font-netmarbleB leading-[6rem] text-4xl">
              끝 글자가 일치하는 단어를 선택해 주세요!
            </p>
          </div>
          <div
            onClick={() => {
              cilckStart();
            }}
          >
            <div>
              <p className=" absolute  w-full animate-pulse font-MaplestoryBold text-7xl text-stroke-2 text-stroke-mainYellow-100">
                시작
              </p>
              <p className="font-MaplestoryBold text-7xl">시작</p>
            </div>
          </div>
          <div className="animate-goTrain w-[53rem] h-[9rem] absolute bottom-5 -right-6">
            <img src={trainlong} alt="기차" />
          </div>
          <div
            className="animate-goTrain w-[34.5rem] h-[8rem] absolute bottom-2 right-1
            font-netmarbleB grid grid-cols-4 items-center text-[3rem]"
          >
            <p>끝</p>
            <p>말</p>
            <p>기</p>
            <p>차</p>
          </div>
        </>
      )}
      {start}
    </div>
  );
};

TrainStart.propTypes = {
  //   second: PropTypes.third,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TrainStart);
