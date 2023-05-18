import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimney } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

library.add(faHouseChimney);

const Home = () => {
  const nav = useNavigate();

  return (
    <div
      onClick={() => {
        nav(`/main`);
      }}
      className="flex items-center justify-start w-1/6 h-full pl-4"
    >
      <button className="flex items-center justify-center w-1/2 bg-white rounded-xl h-4/5">
        <FontAwesomeIcon icon={faHouseChimney} size="2xl" color="#33333A" />
      </button>
    </div>
  );
};

export default Home;
