import { useDispatch } from "react-redux";
import { levelActions } from "store/features/mainCard/levelSlice";
import { useSelector } from "react-redux";

const levels = [
  { name: "상", level: 2 },
  { name: "중", level: 1 },
  { name: "하", level: 0 },
];

const SelectLevel = () => {
  const dispatch = useDispatch();

  const selectLevelHandler = (e) => {
    dispatch(levelActions.selectLevel(e.currentTarget.id));
  };

  const selectedLevel = useSelector((state) => state.level.level);

  return (
    <div className="flex justify-around items-center w-full h-[60%] pt-[1%]">
      {levels.map((level, index) => {
        return (
          <div
            onClick={selectLevelHandler}
            id={level.level}
            key={index}
            className={`flex justify-around items-center w-[8%] h-full ${
              +selectedLevel === +level.level ? `bg-[#F2F08A] shadow-2xl ` : ``
            } rounded-lg`}
          >
            <div className="font-['MaplestoryOTFBold'] text-2xl">
              {level.name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SelectLevel;
