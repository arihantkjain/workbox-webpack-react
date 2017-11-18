import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { compose } from 'recompose'
import { graphql } from 'react-apollo'
import { showSpinnerWhileApolloLoading, showApolloError, showNoData } from 'common/helpers'
import List from 'modules/blog/components/PostsList'
import { queryAllPosts } from 'modules/blog/qql'


export const ListPostsPage = ({ data: { allPosts } }) => (
  <section>
    <h2>All posts</h2>
    <Link to="/posts/create">Create New Post</Link>
    <List items={allPosts} />
  </section>
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

// TODO: Add no posts branch
const enhance = compose(
  graphql(queryAllPosts),
  showApolloError(),
  showSpinnerWhileApolloLoading(),
  showNoData(props => !props.data.allPosts)('There are no posts in database.'),
)

export default enhance(ListPostsPage)
