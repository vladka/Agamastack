import ApolloClient, { NormalizedCacheObject, PresetConfig } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { ClientStateConfig } from 'apollo-link-state';

let apolloClient : ApolloClient<NormalizedCacheObject> = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}

// const iniMyState:ClientStateConfig = {
//   defaults: {
//     isConnected: true,
//     theme: 1111111
//   },
//   resolvers : {}
// }

const create = (initialState : ClientStateConfig) => {
  console.log('Init apollo with: ' +JSON.stringify(initialState,null,2).substring(0,100))
  const client = new ApolloClient<NormalizedCacheObject> ({
    //https://www.apollographql.com/docs/react/essentials/get-started.html#configuration
    uri: 'http://localhost:4000',
    clientState: initialState
    })
  return client;
}
const initApollo = (initialState:ClientStateConfig = null) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}

export default initApollo;


