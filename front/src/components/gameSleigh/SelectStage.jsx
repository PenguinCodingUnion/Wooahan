import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sleighActions } from "store/features/sliegh/sleighSlice";

const SelectStage = (props) => {
  const totalStage = 50; //전체 단계 정보
  const cleardStage = 22; // 내가 지금까지 깬 단계 정보

  const dispatch = useDispatch();

  const navigation = useNavigate();

  return (
    <div>
      <div>
        펭글 썰매여~{" "}
        <button
          onClick={() => {
            props.setIsSleigh();
          }}
        >
          닫어!
        </button>
      </div>
      <div>
        {[...Array(totalStage)].map((_, i) => {
          if (i < cleardStage)
            return (
              <div
                key={i}
                style={{ background: "blue" }}
                onClick={() => {
                  dispatch(sleighActions.setStage(i));
                  props.setIsSleigh();
                  navigation("/sleigh");
                }}
              >
                {i}단계
              </div>
            );
          return (
            <div
              key={i}
              style={{ background: "red" }}
              onClick={() => {
                console.log("전단계깨고와라..");
              }}
            >
              {i}단계
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectStage;
