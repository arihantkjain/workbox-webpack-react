import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withApollo } from 'react-apollo'
import { queryPostDetail } from 'modules/blog/qql'
import { Button } from 'components'


export const PostListComponent = ({ items, client }) => {
  const prefetchDetail = postId => client.query({ // eslint-disable-line
    query: queryPostDetail,
    variables: { id: postId },
  })

  return (
    <div>
      {items.map(item => (
        <div key={item.id}>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          <Link to={`/posts/${item.id}`}>
            <Button>Detail</Button>
          </Link>
        </div>
      ))}
    </div>
  )
}

PostListComponent.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  client: PropTypes.shape({
    query: PropTypes.func.isRequired,
  }).isRequired,
}

export default withApollo(PostListComponent)
