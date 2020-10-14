import React, {useEffect} from 'react';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Material UI components
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

//Components
import PrivateRoute from './PrivateRoute';
import Alerts from './components/Alerts';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import AuthHeader from './components/HeaderAuth';
import Dashboard from './components/Dashboard';
import History from './components/history/History';
import ExpenseHistory from './components/history/ExpenseHistory';
import Trip from './components/trip/Trip';
import NewTrip from './components/NewTrip';
import About from './components/About';
import Contact from './components/ContactUs';
import MyAccount from './components/MyAccount';
import EditTrip from './components/trip/EditTrip';

import {loadUser} from './actions/auth';
import store from './store';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    backgroundColor: theme.palette.background.main,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
    },
  },
  containerWrapper: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1em',
    },
  },
  hide: {
    display: 'none',
    marginBottom: 0,
    backgroundColor: 'white',
    height: 0,
  },
}));

function App({isAuthenticated, user}) {
  const classes = useStyles();

  // Loads user to maintain authentication
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Alerts />
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/verification' component={Verification} />
        {isAuthenticated && user ? <AuthHeader /> : null}
        <main className={!isAuthenticated ? classes.hide : classes.content}>
          <Toolbar />
          <Grid
            container
            direction='column'
            className={classes.containerWrapper}
          >
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/trip/:trip_uid' component={Trip} />
              <PrivateRoute
                exact
                path='/history/:trip_uid'
                component={ExpenseHistory}
              />
              <PrivateRoute
                exact
                path='/trip/edit/:trip_uid'
                component={EditTrip}
              />

              <PrivateRoute exact path='/history' component={History} />
              <PrivateRoute exact path='/newtrip' component={NewTrip} />
              <PrivateRoute exact path='/about' component={About} />
              <PrivateRoute exact path='/contact' component={Contact} />
              <PrivateRoute exact path='/account' component={MyAccount} />

              <PrivateRoute exact path='/trip' component={Trip} />
            </Switch>
          </Grid>
        </main>
      </Router>
    </>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(App);
