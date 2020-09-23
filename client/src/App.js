import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// Material UI components
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

//Components
import PrivateRoute from './PrivateRoute';
import LandingPage from './components/LandingPage';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Verification from './components/Verification';
import AuthHeader from './components/HeaderAuth';
import Dashboard from './components/Dashboard';
import History from './components/History';
import ExpenseHistory from './components/ExpenseHistory';
import Trip from './components/Trip';
import NewTrip from './components/NewTrip';
import About from './components/About';
import Contact from './components/ContactUs';
import MyAccount from './components/MyAccount';

import BottomActions from './components/BottomActions';

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
    marginBottom: 50,
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },
  containerWrapper: {
    margin: 'auto',
  },
  hide: {
    marginBottom: 0,
  },
}));

function App({isAuthenticated}) {
  const classes = useStyles();

  /* 

  const user = {
    first_name:
    last_name:
    home_currency:
    email:
    password:
  }
  
  const trip = {
    trip_uid: 
    trip_ name:
    trip_budget_total:
    trip_start:
    trip_end:
    ----- virtual ------
    trip_length: int - days (calculate on backend)
    trip_currency: [] of currency types integers
  }

  const expense = {
    expense_uid: 
    fk_trip_uid:
    expense_name:
    expense_cost:
    expense_type:
    trip_length:
    expense_currency: country integer

  }
  
  */

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <Router>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/verification' component={Verification} />

        {isAuthenticated ? <AuthHeader /> : null}
        <main className={!isAuthenticated ? classes.hide : classes.content}>
          <Toolbar />
          <Grid
            container
            direction='column'
            className={classes.containerWrapper}
          >
            <Switch>
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/dashboard/trip' component={Trip} />
              <PrivateRoute
                exact
                path='/dashboard/history'
                component={ExpenseHistory}
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
        {window.location.pathname === '/dashboard' ? <BottomActions /> : null}
      </Router>
    </>
  );
}

App.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
