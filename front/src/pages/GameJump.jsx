import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const GameJump = (props) => {
  return (
    <div>GameJump</div>
  )
}

GameJump.propTypes = {
  // second: PropTypes.third
};

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(GameJump)