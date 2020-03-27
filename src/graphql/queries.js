/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPosts = `query GetPosts($id: ID!) {
  getPosts(id: $id) {
    id
    name
    url
    description
  }
}
`;
export const listPostss = `query ListPostss(
  $filter: ModelpostsFilterInput
  $limit: Int
  $nextToken: String
) {
  listPostss(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      url
      description
    }
    nextToken
  }
}
`;
