import React from 'react'
import PropTypes from 'prop-types'


const NoData = ({ message }) => (
  <div>
    {message}
  </div>
)

NoData.propTypes = {
  message: PropTypes.string.isRequired,
}

export default NoData
