import gql from 'graphql-tag'


export const queryAllPosts = gql`query allPosts{
  allPosts{
    id
    title
    text
  }
}
`

export const queryPostDetail = gql`query PostDetail($id: ID!){
  Post(id: $id){
    id
    title
    text
  }
}
`
