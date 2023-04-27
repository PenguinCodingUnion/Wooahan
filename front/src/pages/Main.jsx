import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import Header from '../components/main/Header'
import Carousel from '../components/main/Carousel'

import { useSelector } from 'react-redux'

import image_iceburg from "assets/images/background_iceberg.jpg"
import image_dessert from "assets/images/background_desert.jpg"
import image_forest from "assets/images/background_forest.jpg"
import image_underwater from "assets/images/background_underwater.jpg"

const coverImages =[
  image_iceburg, image_forest, image_underwater, image_dessert
]

export const Main = (props) => {
  const page = useSelector(state => state.backGround.page)
  
  return (
    <div className="relative w-screen h-screen">
      <img className="absolute w-screen h-screen z-0" src={coverImages[page]} />
      <Header />  
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