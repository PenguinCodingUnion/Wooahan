import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/main/Header' 
import Modal from '../components/main/modal/Modal'
import { useSelector } from 'react-redux'
import BlockSet from "../components/main/books/BlockSet"
import BookModal from '../components/main/books_modal/BookModal';

export const Books = () => {

  const showModal = useSelector(state => state.modal.modalIsVisible)
  const showBookModal = useSelector(state => state.bookText.modalIsVisible)
  const bookText = useSelector(state => state.bookText.text)

  return (
    <div>
      <Header titleIsVisible={false} topLeftButton={"home"}/>
      <div className="relative overflow-x-scroll w-screen h-screen bg-deepPink">
        {showModal && <Modal />}
        {showBookModal && <BookModal text={bookText}/>}
        <BlockSet />
      </div>
    </div>
  )
}

Books.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Books)