import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpenReader } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

library.add(faBookOpenReader);

const Reward = (props) => {
  const nav = useNavigate();
  const buttonBackGround = ["bg-buttonPurple", "bg-buttonGreen", "bg-buttonBlue", "bg-buttonRed", "bg-buttonPurple", "bg-buttonGreen", "bg-buttonBlue", "bg-buttonRed"]

  return (
    <div
      onClick={() => {
        nav(`/books`);
      }}
      className="flex items-center justify-start w-1/6 h-full pl-4"
    >
      <button className={`${buttonBackGround[props.page]} rounded-xl w-1/2 h-4/5 flex items-center justify-center`}>
        <FontAwesomeIcon icon={faBookOpenReader} size="2xl" color="#33333A"  />
      </button>
    </div>
  );
};

export default Reward;
