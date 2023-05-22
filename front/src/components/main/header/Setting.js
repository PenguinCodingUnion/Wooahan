import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { modalActions } from "store/features/mainCard/modalSlice";

library.add(faGear);

const Setting = (props) => {
  const dispatch = useDispatch();

  const modalOpenHandler = () => {
    dispatch(modalActions.openModal());
  };

  const buttonBackGround = ["bg-buttonPurple", "bg-buttonGreen", "bg-buttonBlue", "bg-buttonRed", "bg-buttonPurple", "bg-buttonGreen", "bg-buttonBlue", "bg-buttonRed"]
  const pushButton = ["hover:bg-buttonDeepPurple", "hover:bg-buttonDeepGreen", "hover:bg-buttonDeepBlue", "hover:bg-buttonDeepRed", ]

  return (
    <div className="pr-4 w-[50%] h-full flex justify-end items-center">
      <button
        onClick={modalOpenHandler}
        className={`flex items-center justify-center w-full rounded-xl h-4/5 ${pushButton[props.page]} ${props.page === "books" ? `bg-white` : buttonBackGround[props.page]}`}
      >
        <FontAwesomeIcon icon={faGear} size="2xl" color="#33333A" />
      </button>
    </div>
  );
};

export default Setting;
