import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

//import logo from '../imgs/travelmor_square.png';

import LandingPageContent from './LandingPageContent';

//const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbar: {
    background: 'transparent',
    padding: 0,
  },
  // logoContainer: {
  //   padding: 0,
  // },
  // logo: {
  //   width: drawerWidth,
  //   height: '5.5em',
  //   [theme.breakpoints.down('xs')]: {
  //     width: 200,
  //   },
  // },
  buttonWrapper: {
    marginLeft: 'auto',
  },
  signin: {
    color: '#fff',
    marginRight: '1em',
    textTransform: 'none',
    fontSize: '1rem',
    [theme.breakpoints.down('xs')]: {
      marginRight: '0',
    },
  },
  signup: {
    color: '#fff',
    marginRight: '1em',
    textTransform: 'none',
  },
}));

const LandingPage = () => {
  //const theme = useTheme();
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='static'
          style={{background: 'transparent', boxShadow: 'none'}}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
            {/* <Button
              component={Link}
              to='/'
              className={classes.logoContainer}
              disableRipple
            >
              <img src={logo} alt='Travelmor.logo' className={classes.logo} />
            </Button> */}
            <div className={classes.buttonWrapper}>
              <Button className={classes.signin} component={Link} to='/signin'>
                Sign In
              </Button>
              <Button className={classes.signin} component={Link} to='/signup'>
                Sign Up
              </Button>
            </div>
          </Toolbar>
        </AppBar>
      </div>
      {/* Landing Page Content Rendered Below */}
      <LandingPageContent />
    </>
  );
};

export default LandingPage;
