import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/main/Header'
import Carousel from '../components/main/Carousel'

export const Main = (props) => {
  return (
    <div>
      <Header />
      <h2>hi</h2>

      <Carousel />
    </div>
  )
}

Main.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)