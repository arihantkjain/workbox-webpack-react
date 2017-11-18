import React from 'react'
import PropTypes from 'prop-types'
import { Header } from 'components'
import { renderRoutes } from 'react-router-config'


const App = ({ route }) => (
  <div>
    <Header
      title="Boilerplate"
      links={[
        {
          id: 1,
          label: 'Home',
          href: '/',
        },
        {
          id: 2,
          label: 'Redux Counter',
          href: '/counter',
        },
        {
          id: 3,
          label: 'GraphQl Blog',
          href: '/posts',
        },
      ]}
    />
    {renderRoutes(route.routes)}
  </div>
)

App.propTypes = {
  route: PropTypes.any, // eslint-disable-line
}

export default App
