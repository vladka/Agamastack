//see: https://github.com/GraphCMS/example_01_nextjs_apollo/blob/master/pages/index.js
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Link from 'next/link'
import { graphql, DataProps, DataValue, Query } from 'react-apollo'
import ErrorMessage from './ErrorMessage'
import *  as Queries from '../lib/queries';
import * as QueryTypes from '../generated/queryTypes'
import { IQueryParams } from 'lib/types';


class AllPostsQuery extends Query<QueryTypes.getAllPostsQuery> { };

//const PostList: React.SFC<DataProps<QueryTypes.getAllPostsQuery> & IQueryParams> = props => 
const PostList: React.SFC<any> = props =>

  <AllPostsQuery query={Queries.getAllPosts} >
    {
      x => {
        if (x.loading) return <p>Loading...</p>;
        if (x.error) return <p>Error :(</p>;
        const items = x.data.getAllPosts;
        return (<div>
          <h1>Zpevnik {props.id} {props.name}</h1>
          <pre>{JSON.stringify(x.data, null, 4)}</pre>
          <List>

            {items.map((item, index) => (
              
              <Link key={item.id} as={`/${item.id}/${item.title}`} href={`/posts?id=${item.id}&title=${item.title}`}>
                <ListItem component="a" button>
                  <ListItemIcon>
                  <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
              
              

              // <ListItem button key={item.id}>
              //   <ListItemIcon>
                  
              //   </ListItemIcon>

              //   <ListItemText>
              //     <Link as={`/${item.id}/${item.title}`} href={`/posts?id=${item.id}&title=${item.title}`}>
              //       <a>{item.title}</a>
              //     </Link>
              //   </ListItemText>
              // </ListItem>

            ))}
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Orders" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText primary="Customers" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <BarChartIcon />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <LayersIcon />
              </ListItemIcon>
              <ListItemText primary="Integrations" />
            </ListItem>

          </List>

          <style jsx>{`
               
                 a {
                   font-size: 14px;
                   margin-right: 10px;
                   text-decoration: none;
                   padding-bottom: 0;
                   border: 0;
                 }
                
              `}</style>
        </div>)



      }
    }
  </AllPostsQuery>


export default PostList;

