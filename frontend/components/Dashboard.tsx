import React, {ReactNode} from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {Query} from 'react-apollo';
import ThemeSelector from './ThemeSelector';
import SidePanel from "./SidePanel";
import { getIsMenuOpen } from "../lib/queriesLocal";
import { Theme } from '@material-ui/core/styles';
import Header from './Header'



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
    height:'calc(100vh - 62px)', 
    overflowY:'auto', 
    overflowX: 'hidden', 
    marginTop: '62px'
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
});

interface DashboardProps {
  sidebar?: ReactNode,
  classes: any
}

interface IDashboardState {
  open: boolean,
  anchorEl: any//todo
}

class Dashboard extends React.Component<DashboardProps,IDashboardState> {
  state = {
    open: true,
    anchorEl: null,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuInDockMode = () =>{

  }

  onSetSidebarOpen = (opened: boolean, client)=> {
    client.writeData( {data: {sidebarOpen: opened }});
  }
  
  
 

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    
    return (
      <React.Fragment>
        <CssBaseline />
        
        <Query query={getIsMenuOpen} ssr={false}  >
        {({data,client})=>
        <SidePanel sidebar={this.props.sidebar}  
            open={data.sidebarOpen}
            onSetOpen={(opened:boolean)=>this.onSetSidebarOpen(opened,client)}
            >
                 
                  <div className={classes.root}>
                  <AppBar
                    position="absolute"
                    className={classNames(classes.appBar, data.sidebarOpen && classes.appBarShift)}
                  >
                    <Toolbar disableGutters={!data.sidebarOpen} className={classes.toolbar}>
                      <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={()=>this.onSetSidebarOpen(true,client)}
                        className={classNames(
                          classes.menuButton,
                          data.sidebarOpen && classes.menuButtonHidden,
                        )}
                      >
                        <MenuIcon />
                      </IconButton>
                      <Typography variant="title" color="inherit" noWrap className={classes.title}>
                        Dashboard 
                      </Typography>
                      <IconButton
                          aria-owns={open ? 'menu-appbar' : null}
                          aria-haspopup="true"
                          onClick={this.handleMenu}
                          color="inherit"
                        >
                          <AccountCircle />
                        </IconButton>
                      <IconButton color="inherit">
                        <Badge badgeContent={4} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                      <Menu
                          id="menu-appbar"
                          anchorEl={anchorEl}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          open={open}
                          onClose={this.handleClose}
                        >
                          <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                          <MenuItem onClick={this.handleClose}>My account</MenuItem>
                        </Menu>
                    </Toolbar>
                  </AppBar>
                 
                  <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                      <Header />
                      <ThemeSelector />
                      {this.props.children}
                      

                      
                    
                  </main>
                </div>
               
             
             
          
          </SidePanel> 
        }
        </Query>
        <style jsx global>{`
    html {
      height: 100%;
    }
    
    body {
      height: 100%;
      margin: 0px;
    }
    
    #app {
      height: 100%;
    }
    `}</style>
      </React.Fragment>
    );
  }
}



export default withStyles(styles)(Dashboard);
