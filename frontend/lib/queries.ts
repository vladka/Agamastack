import gql from 'graphql-tag';

export const getPost = gql`
  query getPost($id: String!) {
    getPost(id: $id) {
      title
      id
    }
  }
`;


export const getAllPosts = gql`
  query getAllPosts {
    getAllPosts {
     id
     title
    }
  }
`;
