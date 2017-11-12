import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import List from 'modules/blog/components/PostsList'
import { queryAllPosts } from 'modules/blog/qql'
import { Spinner, Error } from 'components'


export const ListPosts = ({ data }) => {
  if (data.loading) {
    return <Spinner />
  }

  if (data.error) {
    return <Error data={data.error} />
  }

  return (
    <div>
      <h2>All posts</h2>
      <List items={data.allPosts} />
    </div>
  )
}

ListPosts.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    error: PropTypes.object,
    allPosts: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })),
  }).isRequired,
}

const ListPostsWithGraphQL = graphql(queryAllPosts, {})(ListPosts)

export default ListPostsWithGraphQL
