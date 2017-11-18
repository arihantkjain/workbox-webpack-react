import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose, withHandlers } from 'recompose'
import { graphql } from 'react-apollo'
import { queryPostDetail, deletePost, queryAllPosts } from 'modules/blog/qql'
import { Button } from 'components'
import { showSpinnerWhileApolloLoading, showApolloError, showNoData } from 'common/helpers'


export const PostDetailPage = ({ match, handleDeletePost, data: { Post } }) => (
  <section>
    <h2>{Post.title}</h2>
    <p>{Post.text}</p>
    <Button onClick={handleDeletePost}>Delete Post</Button>
    <Link to={`/posts/${match.params.postId}/edit`}><Button>Edit Post</Button></Link>
  </section>
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
  match: PropTypes.shape({ // eslint-disable-line
    params: PropTypes.shape({
      postId: PropTypes.string,
    }),
  }),
}

// TODO: Add no post branch
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
        deletePostMutation({
          variables: { id: match.params.postId },
          refetchQueries: [{ query: queryAllPosts }],
        })
          .then(() => history.push('/posts'))
          .catch(() => global.alert('There was an error while deleting your post.')),
  }),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
  showNoData(props => !props.data.Post)('Post does not exists.'),
)

export default enhance(PostDetailPage)
