import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from "@material-ui/icons/Close";

//todo: to typescript

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function SidebarMenu(props) {
  const { classes, onClose } = props;
  return (
    
 
      <AppBar>
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.flex}>
            Index 
          </Typography>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <CloseIcon onClick={onClose} />
          </IconButton>
          
        </Toolbar>
      </AppBar>
 
    
  );
}

export default withStyles(styles)(SidebarMenu);