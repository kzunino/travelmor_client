import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../actions/trips';

import Trip from './trip/Trip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 300,
    maxWidth: 700,
  },

  button: {
    marginTop: '1em',
    borderRadius: '2em',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  container: {
    padding: 0,
  },
  mainContentBox: {
    //backgroundColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.background.main,
    marginTop: '2em',
    marginLeft: 0,
    marginRight: 0,
    paddingTop: '1em',
    paddingBottom: '1em',
    display: 'flex',
  },

  chartContainer: {
    [theme.breakpoints.down('xs')]: {
      height: '12em',
    },
  },
  overallSpendingItems: {
    padding: '1em',
    textAlign: 'left',
  },
  dailySpendingItems: {
    padding: '1em',
    textAlign: 'left',
  },
  averageSpendingItems: {
    // marginRight: 'auto',
    padding: '1em',
    textAlign: 'left',
  },
  underBudgetColor: {
    color: '#56a655',
  },
  overBudgetColor: {
    color: '#ce4c52',
  },
  box: {
    backgroundColor: '#4a4a4a',
  },
  budgetData: {
    color: theme.palette.boxContentBudgetData.main,
  },
  budgetHeading: {
    color: theme.palette.boxContentBudgetHeading.main,
  },
}));

const Dashboard = ({trips, getTrip, trip_data, name}) => {
  const theme = useTheme();
  const classes = useStyles();

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  /*
  if user has trips rendered as Links, component will automatically fire
  a post request to render the most recent trip to the Dashboard and pass those as 
  props to the <TRIP/> component inside render method
  */

  useEffect(() => {
    if (trips.length) getTrip(trips[0].trip_uid);
  }, [trips, getTrip]);

  return (
    <>
      {/* -----Welcome Container----- */}
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>
          Welcome, {name}!
        </Typography>
      </Grid>
      <Divider />
      <Container maxWidth={'lg'} className={classes.container}>
        {!trips.length ? (
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Typography variant={matchXs ? 'h5' : 'h4'}>
                  Create a trip to get started!
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  variant='outlined'
                  disableRipple
                  component={Link}
                  to='/newtrip'
                  className={classes.button}
                >
                  Create New Trip
                </Button>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Trip tripData={trip_data} />
        )}
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  trips: PropTypes.array,
  getTrip: PropTypes.func.isRequired,
  trip_data: PropTypes.object.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  trips: state.auth.user.trips,
  trip_data: state.trips,
  name: state.auth.user.first_name,
});

export default connect(mapStateToProps, {getTrip})(Dashboard);
