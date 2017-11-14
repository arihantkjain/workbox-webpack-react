import React from 'react'
import PropTypes from 'prop-types'
import { compose, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { queryPostDetail, deletePost } from 'modules/blog/qql'
import { Button } from 'components'
import { showSpinnerWhileApolloLoading, showApolloError } from 'common/helpers'


export const PostDetailPage = ({ handleDeletePost, data: { Post } }) => (
  <div>
    <h2>{Post.title}</h2>
    <p>{Post.text}</p>
    <Button onClick={handleDeletePost}>Delete Post</Button>
  </div>
)

PostDetailPage.propTypes = {
  handleDeletePost: PropTypes.func.isRequired,
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
  math: PropTypes.shape({ // eslint-disable-line
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }),
}

const enhance = compose(
  graphql(deletePost, { name: 'deletePostMutation' }),
  graphql(queryPostDetail, {
    options: ownProps => ({
      variables: {
        id: ownProps.match.params.postId,
      },
    }),
  }),
  withHandlers({
    handleDeletePost: ({ history, deletePostMutation, match }) =>
      () =>
        deletePostMutation({ variables: { id: match.params.postId } })
          .then(() => history.push('/posts'))
          .catch(() => global.alert('There was an error while deleting your post.')),
  }),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
)

export default enhance(PostDetailPage)
