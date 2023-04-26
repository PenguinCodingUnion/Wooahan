import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const GameBubble = (props) => {
  return (
    <div>GameBubble</div>
  )
}

GameBubble.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameBubble)