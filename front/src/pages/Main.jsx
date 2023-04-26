import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const Main = (props) => {
  return (
    <div>Main</div>
  )
}

Main.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)