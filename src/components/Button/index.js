import React from 'react'
import PropTypes from 'prop-types'


const ButtonComponent = ({ children, ...rest }) => (
  <button {...rest}>
    {children}
  </button>
)

ButtonComponent.propTypes = {
  children: PropTypes.node,
}

export default ButtonComponent
