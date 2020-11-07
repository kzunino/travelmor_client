import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../../actions/trips';
import Moment from 'moment';

// Trip Components
import TripMain from './tripComponents/TripMain';
import TripSpendingOverview from './tripComponents/TripSpendingOverview';
import TripBudgetBoxes from './tripComponents/TripBudgetBoxes';
import TripTable from './tripComponents/TripTable';
import TripPieChart from './tripComponents/TripPieChart';

// MUI Components
import Grid from '@material-ui/core/Grid';

// Bottom Actions
import BottomAction from '../BottomActions';

const Trip = ({match, getTrip, trip_data}) => {
  const {end_date} = trip_data;
  const today = Moment();
  const endDate = Moment(end_date);
  let todayIsAfterTripEnded = today.isAfter(endDate, 'days');

  useEffect(() => {
    if (window.location.pathname !== '/dashboard') {
      let {trip_uid} = match.params;
      getTrip(trip_uid);
    }
  }, [getTrip, match]);

  return (
    <>
      <Grid container justify='space-between'>
        {todayIsAfterTripEnded ? (
          <TripSpendingOverview tripData={trip_data} />
        ) : (
          <TripMain tripData={trip_data} />
        )}

        <TripBudgetBoxes tripData={trip_data} />
        <TripPieChart tripData={trip_data} />
        <TripTable tripData={trip_data} />
        
      </Grid>

      <BottomAction />
    </>
  );
};

Trip.propTypes = {
  getTrip: PropTypes.func.isRequired,
  trip_data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  trip_data: state.trips,
});

export default connect(mapStateToProps, {getTrip})(Trip);
