import initApollo from './init-apollo'
import Head from 'next/head'
import { getDataFromTree } from 'react-apollo'
import React, { Component } from 'react';
import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import CircularJSON from 'circular-json'
import { appIniProps, appIniResult } from "./types";

export default (App) => {
  
  
  return class Apollo extends React.Component {
    
    static displayName = 'withApollo (App)'
    
    static async getInitialProps (ctx0:appIniProps) {
      const { Component, router, ctx } = ctx0
      console.log(">>>"+JSON.stringify(ctx.query,null,2));
      
      const appProps:appIniResult = await App.getInitialProps(ctx0)
      
      
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(appProps.iniMyAppState)
      if (!process.browser) {
        try {
          
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          )
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
          console.error('Error while running `getDataFromTree`', error)
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind()
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.extract()

      // console.log ("EEEEEEEEE");
      // console.log(JSON.stringify(apolloState,null,4).substring(1,250));

      // const apolloNewState = {
      //   defaults: {...apolloState.ROOT_QUERY, getSubjects: apolloState.ROOT_QUERY.getSubjects.map(x=>({...x, __typename: x.typename})) }
      // }

      // console.log ("EEEEEEEEE");
      // console.log(JSON.stringify(apolloNewState,null,1).substring(1,250));

      return {
        ...appProps,
        apolloState:apolloState
      }
    }

    apolloClient: ApolloClient<NormalizedCacheObject> = null;

    constructor (props) {
      // console.log ("AAAAA");
      // console.log(JSON.stringify(props.apolloState,null,1).substring(1,50));
      super(props)
      this.apolloClient = initApollo();
      this.apolloClient.restore(props.apolloState);
    }

    render () {
      console.log('rendering APP'); 
      return <App {...this.props} apolloClient={this.apolloClient} />
    }
  }
}
