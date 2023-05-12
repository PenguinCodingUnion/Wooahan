import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

library.add(faQuestion);

const Tutorial = () => {
  const nav = useNavigate();

  return (
    <div
      onClick={() => {
        nav(`/tutorial`);
      }}
      className="pr-4 w-[50%] h-full flex justify-end items-center"
    >
      <button className="bg-mainYellow-200 rounded-xl w-full h-4/5 flex items-center justify-center">
        <FontAwesomeIcon icon={faQuestion} size="2xl" />
      </button>
    </div>
  );
};

export default Tutorial;
