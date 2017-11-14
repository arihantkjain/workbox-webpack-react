import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'components'


const PostForm = ({
  handleSubmit,
  submitting,
}) => (
  <form onSubmit={handleSubmit}>
    <Field name="id" component="input" type="hidden" />
    Title: <br />
    <Field name="title" component="input" type="text" /> <br />
    Text: <br />
    <Field name="text" component="textarea" /> <br />

    <Button type="submit" disabled={submitting}>
      {submitting ? 'Submitting...' : 'Submit changes'}
    </Button>
  </form>
)

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
}

export default reduxForm({
  form: 'post',
})(PostForm)
