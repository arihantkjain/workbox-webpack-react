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

export const createPost = gql`
  mutation createPost($title: String!, $text: String!) {
    createPost(title: $title, text: $text) {
      id
      title
      text
    }
  }
`
