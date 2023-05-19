import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../components/main/Header";
import Modal from "../components/main/modal/Modal";
import { useSelector, useDispatch } from "react-redux";
import BlockSet from "../components/main/books/BlockSet";
import BookModal from "../components/main/books_modal/BookModal";
import fox_left from "assets/images/books_fox_gif/fox_walk_left.gif";
import fox_right from "assets/images/books_fox_gif/fox_walk_right.gif";
import useSound from "util/hooks/useSound";
import bgm from "assets/sounds/mainbgm.mp3";

export const Books = () => {
  const showModal = useSelector((state) => state.modal.modalIsVisible);
  const showBookModal = useSelector((state) => state.bookText.modalIsVisible);
  const bookText = useSelector((state) => state.bookText.text);
  const starCount = useSelector((state) => state.loginInfo.starCount);
  const rewards = useSelector((state) => state.loginInfo.rewards);
  const email = useSelector((state) => state.loginInfo.email);

  useEffect(() => {
    // console.log("별가루 : " + starCount)
    // console.log("보상 카드 : " + rewards)
    // console.log("보상 카드 : " + email)
  }, []);

  useSound(bgm, 0.4, 2000);

  return (
    <div className="relative w-screen h-screen overflow-x-scroll overflow-y-hidden max-w-screen bg-imageSky">
      <Header titleIsVisible={false} topLeftButton={"home"} page={"books"} />
      {showModal && <Modal current={"books"} />}
      {showBookModal && <BookModal text={bookText} />}
      <BlockSet />
      <div className="absolute z-10 overflow-x-hidden bottom-[-2%] w-[200%] h-[40%] bg-[url('assets/images/books/background_book.jpg')] bg-cover">
        <img
          src={fox_right}
          className="absolute z-20 w-[15%] h-[75%] bottom-[-5%] animate-leftFox"
          alt=""
        />
      </ div>
    </div>
  );
};

Books.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
