import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/main/Header' 
import Modal from '../components/main/modal/Modal'
import { useSelector } from 'react-redux'

export const Books = () => {
  
    const showModal = useSelector(state => state.modal.modalIsVisible)

  return (
    <div className="relative w-screen h-screen bg-deepPink">
        <Header titleIsVisible={false} topLeftButton={"home"}/>
        {showModal && <Modal />}
    </div>
  )
}

Books.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Books)