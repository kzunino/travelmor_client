import React from 'react';
import Moment from 'moment';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../../actions/trips';

// import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Table Imports

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  container: {
    borderRadius: 5,

    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  root: {
    width: '100%',
  },
  mainContentBox: {
    //backgroundColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.boxBackground.form,
    borderRadius: 8,
    marginTop: '2em',
    marginLeft: 0,
    marginRight: 0,
    paddingTop: '1em',
    paddingBottom: '1em',
    display: 'flex',
  },
  listItemBackground1: {
    margin: 0,
    backgroundColor: theme.palette.secondary.main,
  },
  listItemBackground2: {
    backgroundColor: theme.palette.secondary.light,
  },
  listItem: {
    width: '100%',
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

const History = ({trips}) => {
  const theme = useTheme();
  const classes = useStyles();

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  // Creates an array of each year a trip as been taken without duplicates
  // using the start date as the year - lists from most recent to past
  let tripYears = [];
  trips.forEach((trips) => {
    if (tripYears.indexOf(Moment(trips.start_date).format('YYYY')) === -1)
      tripYears.push(Moment(trips.start_date).format('YYYY'));
  });

  return (
    <>
      <Grid item>
        <Typography className={classes.heading} variant={matchXs ? 'h4' : 'h2'}>
          All Trip History
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Container maxWidth={'sm'} className={classes.container}>
        <Box m={1} boxShadow={3} className={classes.mainContentBox}>
          <Grid item>
            <Grid container>
              {tripYears.length ? (
                <Grid item>
                  {/* map over trips to get years then map over trips in that year to list them */}
                  {tripYears.map((year, index) => (
                    <List
                      subheader={
                        <ListSubheader>
                          {Moment(year).format('YYYY')}
                        </ListSubheader>
                      }
                      className={classes.root}
                      key={year + index}
                    >
                      {trips.map((trip, index) => {
                        if (year === Moment(trip.start_date).format('YYYY')) {
                          return (
                            <ListItem
                              key={trip.trip_uid}
                              component={Link}
                              to={`/history/${trip.trip_uid}`}
                              classes={{root: classes.listItem}}
                            >
                              <ListItemText
                                classes={classes.listItemText}
                                primary={`${trip.name}`}
                              />
                            </ListItem>
                          );
                        } else return null;
                      })}
                    </List>
                  ))}
                </Grid>
              ) : (
                <Grid item>
                  <Typography paragraph style={{paddingLeft: 15}}>
                    No trips yet!
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

History.propTypes = {
  trips: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trips: state.auth.user.trips,
});

export default connect(mapStateToProps, {getTrip})(History);
