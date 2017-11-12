import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Button } from 'components'


const PostForm = ({
  handleSubmit,
  submitting,
  handleDelete,
  isDeleting,
}) => (
  <form onSubmit={handleSubmit}>
    <Field name="id" component="input" type="hidden" />
    <Field name="title" component="input" type="text" />
    <Field name="text" component="textarea" />

    <Button type="submit" bsStyle="primary" disabled={submitting}>
      {submitting ? 'Saving...' : 'Save changes'}
    </Button>
    {!!handleDelete &&
    <Button
      type="button"
      bsStyle="danger"
      disabled={isDeleting}
      onClick={handleDelete}
    >
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>}
  </form>
)

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  submitting: PropTypes.bool,
  handleDelete: PropTypes.func,
  isDeleting: PropTypes.bool,
}

export default reduxForm({
  form: 'post',
})(PostForm)
