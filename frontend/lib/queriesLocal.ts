import gql from 'graphql-tag';


export const getIsMenuOpen = gql`
  query getIsMenuOpen {
    sidebarOpen @client
  }
`;


export const getTheme = gql`
  query getTheme {
    themeIndex @client
  }
`;

