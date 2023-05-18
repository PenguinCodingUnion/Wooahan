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
      <button className="flex items-center justify-center w-full bg-transparent rounded-xl h-4/5">
        <FontAwesomeIcon icon={faQuestion} size="2xl" color="#33333A" />
      </button>
    </div>
  );
};

export default Tutorial;
