import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const GameTrain = (props) => {
  return (
    <div>GameTrain</div>
  )
}

GameTrain.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameTrain)