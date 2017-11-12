import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import List from 'modules/blog/components/PostsList'
import { queryAllPosts } from 'modules/blog/qql'
import { Spinner, Error } from 'components'


export const ListPostsPage = ({ data: { loading, error, allPosts } }) => {
  if (loading) {
    return <Spinner />
  }

  if (error) {
    return <Error message={error.message} />
  }

  return (
    <div>
      <h2>All posts</h2>
      <List items={allPosts} />
    </div>
  )
}

ListPostsPage.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.shape({
      message: PropTypes.string.isRequired,
    }),
    allPosts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
  }).isRequired,
}

const enhance = compose(graphql(queryAllPosts, {}))

export default enhance(ListPostsPage)
