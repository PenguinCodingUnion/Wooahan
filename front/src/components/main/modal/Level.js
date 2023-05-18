import SelectLevel from "./SelectLevel";

const Level = () => {
  return (
    <div className="h-[35%]">
      <div className="font-['MaplestoryOTFBold'] text-[5vh] mt-[2%]">
        난이도를 선택해 주세요.
      </div>
      <SelectLevel />
    </div>
  );
};

export default Level;
