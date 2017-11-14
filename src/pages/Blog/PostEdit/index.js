import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PostForm from 'modules/blog/forms/Post'
import { compose, withHandlers } from 'recompose'
import { queryPostDetail, updatePost } from 'modules/blog/qql'
import { showSpinnerWhileApolloLoading, showApolloError } from 'common/helpers'


const PostEditPage = ({ handleOnSubmit, data: { Post } }) => (
  <div>
    <h2>Update Posts</h2>
    <PostForm initialValues={Post} onSubmit={handleOnSubmit} />
  </div>
)

PostEditPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    Post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }),
  }).isRequired,
  handleOnSubmit: PropTypes.func.isRequired,
  updatePostMutation: PropTypes.func.isRequired, // eslint-disable-line
  history: PropTypes.shape({ // eslint-disable-line
    push: PropTypes.func.isRequired,
  }).isRequired,
}

const enhance = compose(
  graphql(updatePost, { name: 'updatePostMutation' }),
  graphql(queryPostDetail, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.postId,
      },
    }),
  }),
  withHandlers({
    handleOnSubmit: ({ history, updatePostMutation }) =>
      data =>
        updatePostMutation({ variables: data })
          .then(response => history.push(`/posts/${response.data.updatePost.id}`))
          .catch(() => global.alert('There was an error while updating your post.')),
  }),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
)

export default enhance(PostEditPage)
