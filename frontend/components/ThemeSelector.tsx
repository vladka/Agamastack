import React from 'react';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import gql from 'graphql-tag';
import *  as Queries from '../lib/queries';
import * as QueryTypes from '../generated/queryTypes'
import { IQueryParams } from 'lib/types';
import CircularJSON from 'circular-json'
import {getTheme,GET_TODOS} from '../lib/queriesLocal'
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
// import ApolloClient, { NormalizedCacheObject, PresetConfig } from 'apollo-boost'
import ApolloClient from 'apollo-client'
import { graphql, DataProps, DataValue, Query } from 'react-apollo'
import allThemes from '../lib/themes'
import { Theme } from '@material-ui/core/styles';
  
const handleChange = (event:React.ChangeEvent<HTMLSelectElement>,client:ApolloClient<any>)=>{
     const themeIndex = event.target.value;
     client.writeData( {data: {
         themeIndex
        }  
      }) ;
}

  //class AllPostsQuery extends Query<QueryTypes.getAllPostsQuery> {};
  
const ThemeSelector: React.SFC = () => 
  {
    
    return (<div>
      <Query query={getTheme} >
          {({data,client})=>{
              return (
                <div>
                   <Select
                      native
                      value={data.themeIndex}
                      onChange={(event)=>handleChange(event,client)}
                      inputProps={{
                        name: 'theme',
                        id: 'theme-native-simple',
                      }}
                    >
                       {allThemes.map((x,i)=><option key={i} value={i}>{x.name}</option>)}   
                    </Select>
                </div>
              );
          }}
      </Query>
    </div>);
  }

export default ThemeSelector;

