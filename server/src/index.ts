import { GraphQLServer } from 'graphql-yoga'
import {IPost} from '../../common/src/generated/prisma'

// Typescript promises
import * as Promise from 'bluebird'
global.Promise = Promise

//see: https://www.apollographql.com/docs/graphql-tools/resolvers


const resolvers = {
  Query: {
    getPost: (_, {id}) => findPost(id),
    getAllPosts:(_) => getAllPosts()
  }
}

const findPost = (id:string)=>{
  const result : IPost =  {
    id: id,
    title: "demo",
    desc: "description",
    author: "uknown"
    
  } 
  return result;
}

const getAllPosts = ()=>{
  //just fake data
  return [findPost('abc'),findPost('axf')]
}

const typeDefs = `${__dirname}/../graphql/schema.graphql`;

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server is running on localhost:4000 using graphQL scheme on '+ typeDefs))







