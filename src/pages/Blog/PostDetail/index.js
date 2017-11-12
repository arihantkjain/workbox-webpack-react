import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { queryPostDetail } from 'modules/blog/qql'
import { Spinner, Error } from 'components'


export const PostDetailPage = ({ data: { loading, error, Post } }) => {
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Error message={error.message} />
  }

  return (
    <div>
      <h2>{Post.title}</h2>
      <p>{Post.text}</p>
    </div>
  )
}

PostDetailPage.propTypes = {
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

const enhance = compose(graphql(queryPostDetail, {
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.postId,
    },
  }),
}))

export default enhance(PostDetailPage)
