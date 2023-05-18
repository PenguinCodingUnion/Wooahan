import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { modalActions } from "store/features/mainCard/modalSlice";

library.add(faGear);

const Setting = () => {
  const dispatch = useDispatch();

  const modalOpenHandler = () => {
    dispatch(modalActions.openModal());
  };

  return (
    <div className="pr-4 w-[50%] h-full flex justify-end items-center">
      <button
        onClick={modalOpenHandler}
        className="flex items-center justify-center w-full bg-transparent rounded-xl h-4/5"
      >
        <FontAwesomeIcon icon={faGear} size="2xl" />
      </button>
    </div>
  );
};

export default Setting;
