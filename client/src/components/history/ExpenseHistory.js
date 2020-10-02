import React, {useState, forwardRef, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../../actions/trips';
import Moment from 'moment';

import TripTable from '../trip/tripComponents/TripTable';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Line Chart imports
import {Line} from 'react-chartjs-2';

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
  //table styles

  tableWrapper: {
    marginTop: '2em',
    padding: 0,
  },
}));

const ExpenseHistory = ({match, getTrip, trip_data}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    // trip_uid,
    // user,
    name,
    total_budget,
    length,
    // home_currency,
    // currencies,
    expenses,
    start_date,
    end_date,
  } = trip_data;

  let tripDays = [];
  let dailyBudgetData = [];
  let dailySpendingData = [];

  useEffect(() => {
    const {trip_uid} = match.params;
    getTrip(trip_uid);
  }, []);

  if (end_date) {
    // DaysArr creates a day for everyday of the trip
    let daysArr = [];
    let a = Moment(start_date).utc();
    let b = Moment(end_date).utc();
    //loops over all days from start to end date using a Moment for loop
    for (let i = Moment(a); i.isBefore(b); i.add(1, 'days')) {
      if (daysArr.indexOf(Moment(i).format('MM-DD-YYYY')) === -1) {
        daysArr.push(Moment(i).format('MM-DD-YYYY'));
      }
    }
    // Formats the dates for the X axis on graph
    tripDays = daysArr.map((day, index) => {
      if (index === 0) return Moment(day, 'MM-DD-YYYY').format('MMM Do');
      else if (Moment(day, 'MM-DD-YYYY').format('DD') === '1') {
        return Moment(day, 'MM-DD-YYYY').format('MMM Do');
      } else {
        return Moment(day, 'MM-DD-YYYY').format('Do');
      }
    });

    // Daily budget Data
    let daily_budget = total_budget / length;
    dailyBudgetData = tripDays.map(() => daily_budget);

    // Daily Spending Data
    /* Creates a days object filled with each day an expense occurred
        -organizes 
    */
    let daysObj = {};
    expenses.forEach((expense) => {
      let total = parseInt(
        daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')]
      );
      if (!daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')])
        daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')] = parseInt(
          expense.cost
        );
      else
        daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')] =
          total +
          parseInt(daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')]);
    });

    // Matches Spending with trip days saved in days array or pushes 0
    daysArr.forEach((day) => {
      if (daysObj.hasOwnProperty(day)) dailySpendingData.push(daysObj[day]);
      else dailySpendingData.push(0);
    });
  }

  let chartData = {
    labels: tripDays,
    datasets: [
      {
        label: 'Daily Spending',
        data: dailySpendingData,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Daily Budget',
        data: dailyBudgetData,
        fill: false,
        borderColor: '#742774',
      },
    ],
  };

  return (
    <>
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>
          {name} - Expense History
        </Typography>
      </Grid>
      <Divider />
      <Container component='div' maxWidth='lg' className={classes.tableWrapper}>
        <Grid container direction='column'>
          {/* Line Chart Item */}
          <Grid item xs={12}>
            <Box m={1} boxShadow={3} className={classes.tableBox}>
              <Typography variant='h5'>Trip Spending Overview</Typography>
              <Line data={chartData} />
            </Box>
          </Grid>
          {/* Table Item */}
          <TripTable tripData={trip_data} />
        </Grid>
      </Container>
    </>
  );
};

ExpenseHistory.propType = {
  trip_data: PropTypes.object.isRequired,
  getTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trip_data: state.trips,
});

export default connect(mapStateToProps, {getTrip})(ExpenseHistory);
