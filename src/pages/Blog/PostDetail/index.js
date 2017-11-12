import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { queryPostDetail } from 'modules/blog/qql'
import { Spinner, Error } from 'components'


export const PostsBaseContainer = ({ data }) => {
  if (data.loading) {
    return <Spinner />
  }

  if (data.error) {
    return <Error data={data.error} />
  }

  return (
    <div>
      <h2>{data.Post.title}</h2>
      <p>{data.Post.text}</p>
    </div>
  )
}

PostsBaseContainer.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
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

const PostsBaseContainerWithGraphQL = graphql(queryPostDetail, {
  options: ownProps => ({
    variables: {
      id: ownProps.match.params.postId,
    },
  }),
})(PostsBaseContainer)

export default PostsBaseContainerWithGraphQL
