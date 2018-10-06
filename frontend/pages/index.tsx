import Dashboard from '../components/Dashboard'
import PostList from '../components/PostList'
import { NextContext } from 'next';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import SimpleLineChart from '../components/SimpleLineChart';
import SimpleTable from '../components/SimpleTable';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import CircularJSON from 'circular-json';
import { Theme } from '@material-ui/core/styles';
import { IPageContextWithClassesAndProps,IQueryParams, pageProps } from "../lib/types";

const styles = (theme:Theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },

  appBar: {
    zIndex: /*theme.zIndex.drawer -1*/ 1 ,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: 0,
    width: `calc(100% - ${0}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
 
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    paddingRight:'0px',
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

const Posts = (props:IPageContextWithClassesAndProps<{query:IQueryParams}>) => {
  console.log('>>>!TTTT!>>>' + CircularJSON.stringify({...props, pageContext: 'TEST'},null,6));
  const sidebar = <PostList {...props}  />;
  const {query,classes} = props;
  

  return (
   <Dashboard sidebar={sidebar}>
     <Typography variant="display1" gutterBottom>
      Orders  id={query.id}
    </Typography>
    <Typography component="div" className={classes.chartContainer}>
      <SimpleLineChart />
    </Typography>
    <Typography variant="display1" gutterBottom>
      Products  id={query.id}
    </Typography>
    <div className={classes.tableContainer}>
      <SimpleTable />
    </div>
   
   </Dashboard>)
}


Posts.getInitialProps = async function (ctx:NextContext<IQueryParams>) {
  const { query } = ctx;
  

  const iniMyState = {
    defaults: {
      themeIndex:0,
      sidebarOpen: true,
    },
    resolvers: {}
  }
  
  const pageProps: pageProps<{query:IQueryParams}> = {query, appState: iniMyState}
  return pageProps;
  
}

export default withStyles(styles)(Posts);

