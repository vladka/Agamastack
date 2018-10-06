//https://nextjs.org/docs/#custom-%3Capp%3E

import React from 'react';
import App, { Container } from 'next/app';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext, {IPageContext} from '../lib/getPageContext';
import withApolloClient from '../lib/with-apollo-client'
import { ApolloProvider,Query } from 'react-apollo'
import CircularJSON from 'circular-json'
import {getTheme, typeDefs } from '../lib/queriesLocal'
import allThemes from '../lib/themes'
import { createMuiTheme, createGenerateClassName , Theme} from '@material-ui/core/styles';
import { appIniProps, appIniResult } from "../lib/types";





class MyApp extends App {
  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  pageContext:IPageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  
  render() {
    
    const { Component, pageProps/* see 000111 */, apolloClient } = this.props;
    //console.log('xxxxx>>>'+CircularJSON.stringify(pageProps,null,5));
    return (
      <Container>
        
        {/* Wrap every page in Jss and Theme providers */}
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <ApolloProvider client={apolloClient}>
          
          <Query query={getTheme}>
          {({data,client})=> {
              console.log('THEMEXXXXXX:'+JSON.stringify(data,null,6));
              const themeDef:ThemeOptions = allThemes[data.themeIndex].options;
              const theme = createMuiTheme(themeDef);
              //console.log('THEMEXXXXMUI:'+CircularJSON.stringify(theme,null,6));
          
              {/* MuiThemeProvider makes the theme available down the React
              tree thanks to React context. */}
          return (<MuiThemeProvider
            theme={theme}
            // theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server side. */}
             
                   <Component pageContext={this.pageContext} {...pageProps}/> 
             
          </MuiThemeProvider>)
          }}
          </Query>
          
          </ApolloProvider>
        </JssProvider>
      </Container>
    );
  }
}



MyApp.getInitialProps = async function (ctx0:appIniProps) {
  
  const { Component, router, ctx } = ctx0;
  
    // console.log('>>>!!!>>>' + CircularJSON.stringify(ctx.query));
   console.log('>>>RRR>>>' + CircularJSON.stringify(Object.keys(router),null,3));
  let fromPageProps = await (Component.getInitialProps ? Component.getInitialProps(ctx) : {});
    
  
  const appState = fromPageProps.appState || {defaults: {}, resolvers:{}};
  const pageProps = {...fromPageProps};
  delete pageProps.appState;
  
  
  appState.defaults.themeIndex = appState.defaults.themeIndex || 0; 
  appState.defaults.sidebarOpen = appState.defaults.sidebarOpen || true;
   
  //be careful !, when initialise object, every level should have own __typename, example:
  /*
  appState.defaults.payment= {
     __typename: 'payment', 
    currency: 'euro',
    value: {
      __typename: "paymentInfo",
      pid: '123-aa',
      subscribtion:true,
      value: 1000
    }
  }
   */
  const result : appIniResult = {iniMyAppState:appState, pageProps:pageProps/* see 000111 */};
  return result;
  
}

export default withApolloClient(MyApp);
