import React from 'react'
import PropTypes from 'prop-types'


const Error = ({ data }) => {
  let message = 'Something went wrong. :('

  // GraphQl Network Error Message
  if (data.networkError) {
    message = 'Your device is currently offline.'
  }

  return (
    <div>
      {message}
    </div>
  )
}

Error.propTypes = {
  data: PropTypes.shape({
    networkError: PropTypes.string,
  }),
}

export default Error
