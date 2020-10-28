import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../../../actions/trips';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Line Chart imports
import {Line} from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  spendingChartContainer: {
    backgroundColor: theme.palette.boxBackground.main,
    padding: 15,
  },
}));

const TripSpendingOverview = ({match, getTrip, trip_data}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  const {
    // trip_uid,
    // user,
    // name,
    total_budget,
    length,
    home_currency,
    // currencies,
    expenses,
    start_date,
    end_date,
  } = trip_data;

  let tripDays = [];
  let dailyBudgetData = [];
  let dailySpendingData = [];

  let daily_budget = parseFloat((total_budget / length).toFixed(2));

  if (end_date) {
    // DaysArr creates a day for everyday of the trip
    let daysArr = [];
    let firstDayOfTrip = Moment(start_date);
    let lastDayOfTrip = Moment(end_date);
    //loops over all days from start to end date using a Moment for loop
    for (
      let i = Moment(firstDayOfTrip);
      i.isBefore(lastDayOfTrip);
      i.add(1, 'days')
    ) {
      if (daysArr.indexOf(Moment(i).format('MM-DD-YYYY')) === -1) {
        daysArr.push(Moment(i).format('MM-DD-YYYY'));
      }
    }
    // Formats the dates for the X axis on graph
    tripDays = daysArr.map((day, index) => {
      if (index === 0) return Moment(day, 'MM-DD-YYYY').format('MMM Do');
      else if (Moment(day, 'MM-DD-YYYY').format('DD') === '01') {
        return Moment(day, 'MM-DD-YYYY').format('MMM Do');
      } else {
        return Moment(day, 'MM-DD-YYYY').format('Do');
      }
    });

    // Daily budget Data

    dailyBudgetData = tripDays.map(() => (total_budget / length).toFixed(2));

    // Daily Spending Data
    /* Creates a days object filled with each day an expense occurred
        -organizes 
        - if day doesn't exist it creates day with cost, if it does exist
        it adds the cost to the previous day totals
    */
    let daysObj = {};
    expenses.forEach((expense) => {
      if (!daysObj[Moment(expense.purchase_date).format('MM-DD-YYYY')]) {
        daysObj[
          Moment(expense.purchase_date).format('MM-DD-YYYY')
        ] = parseFloat(expense.cost);
      } else {
        daysObj[
          Moment(expense.purchase_date).format('MM-DD-YYYY')
        ] += parseFloat(expense.cost);
      }
    });

    // Matches Spending with trip days saved in days array or pushes 0
    daysArr.forEach((day) => {
      if (daysObj.hasOwnProperty(day)) dailySpendingData.push(daysObj[day]);
      else dailySpendingData.push(0);
    });
  }

  console.log(dailySpendingData);

  let options = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: {
            userCallback: function (item, index) {
              //always return first day of trip to chart
              if (index === 0) return item;
              // sm-lg screen
              if (tripDays.length >= 1 && tripDays.length < 30 && !matchXs) {
                if ((index + 1) % 1 === 0) return item;
              } else if (
                tripDays.length >= 30 &&
                tripDays.length < 200 &&
                !matchXs
              ) {
                if ((index + 1) % 5 === 0) return item;
              } else if (
                tripDays.length >= 200 &&
                tripDays.length < 367 &&
                !matchXs
              ) {
                if ((index + 1) % 15 === 0) return item;
              }

              //if matchXS is true
              if (tripDays.length >= 15 && tripDays.length < 30 && matchXs) {
                if ((index + 1) % 2 === 0) return item;
              } else if (
                tripDays.length >= 30 &&
                tripDays.length < 200 &&
                matchXs
              ) {
                if ((index + 1) % 15 === 0) return item;
              } else if (
                tripDays.length >= 200 &&
                tripDays.length < 367 &&
                matchXs
              ) {
                if ((index + 1) % 30 === 0) return item;
              }
            },
            autoSkip: false,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 7,
          },
        },
      ],
    },
  };

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
      {/* Line Chart Item */}
      <Grid item xs={12}>
        <Box m={1} boxShadow={3} className={classes.spendingChartContainer}>
          <Grid item>
            <Typography className={classes.heading} variant='h6'>
              Trip Spending Overview
            </Typography>
            <Typography variant='subtitle2'>
              {Moment(start_date).format('MMM Do')} &ndash;{' '}
              {Moment(end_date).format('MMM Do')}
            </Typography>
            <Typography style={{marginTop: '1em'}} variant='subtitle2'>
              <strong>Total Budget</strong>:{' '}
              {
                <CurrencyFormat
                  value={total_budget}
                  displayType={'text'}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  prefix={
                    getSymbolFromCurrency(home_currency) !== undefined
                      ? getSymbolFromCurrency(home_currency)
                      : '$'
                  }
                />
              }
            </Typography>
            <Typography style={{marginTop: '.5em'}} variant='subtitle2'>
              <strong>Daily budget:</strong>{' '}
              {
                <CurrencyFormat
                  value={daily_budget}
                  displayType={'text'}
                  thousandSeparator={true}
                  fixedDecimalScale={true}
                  decimalScale={2}
                  prefix={
                    getSymbolFromCurrency(home_currency) !== undefined
                      ? getSymbolFromCurrency(home_currency)
                      : '$'
                  }
                />
              }
            </Typography>
          </Grid>

          <Grid item>
            <div style={{minHeight: 275}}>
              <Line data={chartData} options={options} />
            </div>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

TripSpendingOverview.propType = {
  trip_data: PropTypes.object.isRequired,
  getTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trip_data: state.trips,
});

export default connect(mapStateToProps, {getTrip})(TripSpendingOverview);
