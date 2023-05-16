import PropTypes from 'prop-types'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../components/main/Header' 
import Modal from '../components/main/modal/Modal'
import { useSelector, useDispatch } from 'react-redux'
import BlockSet from "../components/main/books/BlockSet"
import BookModal from '../components/main/books_modal/BookModal';

export const Books = () => {

  const showModal = useSelector(state => state.modal.modalIsVisible)
  const showBookModal = useSelector(state => state.bookText.modalIsVisible)
  const bookText = useSelector(state => state.bookText.text)
  const starCount = useSelector(state => state.loginInfo.starCount)
  const rewards = useSelector(state => state.loginInfo.rewards)
  const email = useSelector(state => state.loginInfo.email)


  useEffect(() => {
    // console.log("별가루 : " + starCount)
    // console.log("보상 카드 : " + rewards)
    // console.log("보상 카드 : " + email)
  }, [])

  return (
    <div className="relative overflow-x-scroll w-screen h-screen bg-imageSky">
      <Header titleIsVisible={false} topLeftButton={"home"}/>
      {showModal && <Modal current={"books"} /> }
      {showBookModal && <BookModal text={bookText}/>}
      <BlockSet />
      <div className="absolute mt-[30%] w-[200%] h-[40%] bg-[url('assets/images/books/background_book.jpg')] bg-cover" />
    </div>
  )
}

Books.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Books)