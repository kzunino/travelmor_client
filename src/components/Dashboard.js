import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../actions/trips';

import Trip from './trip/Trip';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: '#fff',
  },
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
    marginRight: 'auto',
    [theme.breakpoints.up('lg')]: {
      marginLeft: 0,
    },
  },
}));

const Dashboard = ({trips, getTrip, name, location}) => {
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

  // Acts like component did mount and fetches updated data when the location
  // changes
  useEffect(() => {}, [location]);

  return (
    <>
      {/* -----Welcome Container----- */}
      <Grid item>
        <Typography className={classes.heading} variant={matchXs ? 'h4' : 'h2'}>
          Welcome, {name}!
        </Typography>
      </Grid>
      <Container maxWidth={'lg'} className={classes.container}>
        {!trips.length ? (
          <Grid item>
            <Grid container direction='column'>
              <Grid item>
                <Typography
                  className={classes.heading}
                  variant={matchXs ? 'h5' : 'h4'}
                >
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
          <Trip />
        )}
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  trips: PropTypes.array,
  getTrip: PropTypes.func.isRequired,
  name: PropTypes.string,
};

const mapStateToProps = (state) => ({
  trips: state.auth.user.trips,
  name: state.auth.user.first_name,
});

export default connect(mapStateToProps, {getTrip})(Dashboard);
