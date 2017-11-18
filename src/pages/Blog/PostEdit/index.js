import React from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import PostForm from 'modules/blog/forms/Post'
import { compose, withHandlers } from 'recompose'
import { queryPostDetail, updatePost, queryAllPosts } from 'modules/blog/qql'
import { showSpinnerWhileApolloLoading, showApolloError, showNoData } from 'common/helpers'


const PostEditPage = ({ handleOnSubmit, data: { Post } }) => (
  <section>
    <h2>Update Posts</h2>
    <PostForm initialValues={Post} onSubmit={handleOnSubmit} />
  </section>
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

// TODO: Add no post branch
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
        updatePostMutation({
          variables: data,
          refetchQueries: [{ query: queryAllPosts }],
        })
          .then(response => history.push(`/posts/${response.data.updatePost.id}`))
          .catch(() => global.alert('There was an error while updating your post.')),
  }),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
  showNoData(props => !props.data.Post),
)

export default enhance(PostEditPage)
