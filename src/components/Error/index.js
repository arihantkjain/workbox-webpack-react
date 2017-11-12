import React from 'react'
import PropTypes from 'prop-types'


const Error = ({ data }) => (
  <div>
    {data.error.message}
  </div>
)

Error.propTypes = {
  data: PropTypes.shape({
    error: PropTypes.shape({
      message: PropTypes.string,
    }),
  }),
}

export default Error
