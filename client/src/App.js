import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

//Components
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

function App() {
  // if auth then set the header to authorized for private routes.

  // if auth - req to server for latest trip then load the dashboard with trip
  //if no trip then render basic dashboard with link to create a trip

  // Query database for all trips and pass them to auth header for trips tab

  //With Context should handle the global state - passes component state information
  //down to components

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
        {window.location.pathname === '/' ||
        window.location.pathname === '/signin' ||
        window.location.pathname === '/signup' ||
        window.location.pathname === '/verification' ? null : (
          <AuthHeader />
        )}
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/signin' component={SignIn} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/verification' component={Verification} />

          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/dashboard/trip' component={Trip} />
          <Route exact path='/dashboard/history' component={ExpenseHistory} />
          <Route exact path='/history' component={History} />
          <Route exact path='/newtrip' component={NewTrip} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/account' component={MyAccount} />

          <Route exact path='/trip' component={Trip} />
        </Switch>
        {window.location.pathname === '/dashboard' ? <BottomActions /> : null}
      </Router>
    </>
  );
}

export default App;
