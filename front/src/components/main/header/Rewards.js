import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

library.add(faBookOpenReader);

const Reward = () => {
  const nav = useNavigate();

  return (
    <div
      onClick={() => {
        nav(`/books`);
      }}
      className="pl-4 w-1/6 h-full flex justify-start items-center"
    >
      <button className="bg-mainYellow-200 rounded-xl w-1/2 h-4/5 flex items-center justify-center">
        <FontAwesomeIcon icon={faBookOpenReader} size="2xl" />
      </button>
    </div>
  );
};

export default Reward;
