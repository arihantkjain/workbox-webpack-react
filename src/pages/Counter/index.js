import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { incrementCounter, decrementCounter } from 'modules/counter/ducks'
import { selectCounterValue } from 'modules/counter/selectors'


export const CounterPage = ({ increment, decrement, counterValue }) => (
  <section>
    <h2>Redux Counter</h2>
    <p>
      Minimal example redux implementation.
    </p>
    <p>
      Current counter value is: <strong>{counterValue}</strong>
    </p>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
  </section>
)

CounterPage.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counterValue: PropTypes.number.isRequired,
}

const mapStateToProps = state => ({
  counterValue: selectCounterValue(state),
})

const mapDispatchToProps = {
  increment: incrementCounter,
  decrement: decrementCounter,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterPage)
