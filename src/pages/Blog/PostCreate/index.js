import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PostForm from 'modules/blog/forms/Post'
import { compose, withHandlers } from 'recompose'
import { createPost } from 'modules/blog/qql'


const PostCreatePage = ({ handleOnSubmit }) => (
  <div>
    <h2>Create Posts</h2>
    <PostForm onSubmit={handleOnSubmit} />
  </div>
)

PostCreatePage.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired, // eslint-disable-line
  history: PropTypes.shape({ // eslint-disable-line
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const enhance = compose(
  graphql(createPost),
  withHandlers({
    handleOnSubmit: ({ history, mutate }) =>
      async (data) => {
        try {
          const response = await mutate({ variables: data })
          history.push(`/posts/${response.data.createPost.id}`)
        } catch (e) {
          global.alert('There was an error while creating your post.')
        }
      },
  }),
)

export default enhance(PostCreatePage)
