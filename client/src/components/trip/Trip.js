import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../../actions/trips';

// import {Link} from 'react-router-dom';

// Trip Components
import TripMain from './tripComponents/TripMain';
import TripBudgetBoxes from './tripComponents/TripBudgetBoxes';
import TripTable from './tripComponents/TripTable';
import TripPieChart from './tripComponents/TripPieChart';

// MUI Componenets
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// Bottom Actions
import BottomAction from '../BottomActions';

// import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginBottom: 50,
    //backgroundColor: '#2F2F31',
    backgroundColor: 'whitesmoke',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },

  containerWrapper: {
    margin: 'auto',
  },

  // mainContentBox: {
  //   //backgroundColor: theme.palette.secondary.light,
  //   backgroundColor: theme.palette.background.main,
  //   marginTop: '2em',
  //   marginLeft: 0,
  //   marginRight: 0,
  //   paddingTop: '1em',
  //   paddingBottom: '1em',
  //   display: 'flex',
  // },
}));

const Trip = ({match, getTrip, trip_data}) => {
  // const theme = useTheme();
  const classes = useStyles();

  useEffect(() => {
    if (window.location.pathname !== '/dashboard') {
      let {trip_uid} = match.params;
      getTrip(trip_uid);
    }
  }, [window.location.pathname]);

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

  return (
    <>
      <Grid item>
        <Grid container justify='space-between'>
          <TripMain tripData={trip_data} />
          <TripBudgetBoxes tripData={trip_data} />
          <TripTable tripData={trip_data} />
          <TripPieChart tripData={trip_data} />
        </Grid>
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
