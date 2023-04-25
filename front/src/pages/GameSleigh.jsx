import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const GameSleigh = (props) => {
  return (
    <div>GameSleigh</div>
  )
}

GameSleigh.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameSleigh)