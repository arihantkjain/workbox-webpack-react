import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { showSpinnerWhileApolloLoading, showApolloError } from 'common/helpers'
import List from 'modules/blog/components/PostsList'
import { queryAllPosts } from 'modules/blog/qql'


export const ListPostsPage = ({ data: { allPosts } }) => (
  <div>
    <h2>All posts</h2>
    <Link to="/posts/create">Create New Post</Link>
    <List items={allPosts} />
  </div>
)

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

const enhance = compose(
  graphql(queryAllPosts),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
)

export default enhance(ListPostsPage)
