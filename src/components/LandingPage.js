import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import LandingPageContent from './LandingPageContent';
import CircularProgress from '@material-ui/core/CircularProgress';

//const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  root: {
    display: 'flex',
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1,
  },
  toolbar: {
    background: 'transparent',
    padding: 0,
  },
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

const LandingPage = ({isAuthenticated, isLoading}) => {
  const classes = useStyles();

  //If authenticated redirect to dashboard
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  // if isLoading, don't render the page
  return isLoading ? (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ) : (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='static'
          style={{background: 'transparent', boxShadow: 'none'}}
          className={classes.appBar}
        >
          <Toolbar className={classes.toolbar}>
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

LandingPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps)(LandingPage);
