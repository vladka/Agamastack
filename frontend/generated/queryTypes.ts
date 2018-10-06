/* tslint:disable */
//  This file was automatically generated and should not be edited.

export interface getPostQueryVariables {
  id: string,
};

export interface getPostQuery {
  getPost:  {
    __typename: "IPost",
    title: string,
    id: string,
  },
};

export interface getAllPostsQuery {
  getAllPosts:  Array< {
    __typename: "IPost",
    id: string,
    title: string,
  } | null >,
};
