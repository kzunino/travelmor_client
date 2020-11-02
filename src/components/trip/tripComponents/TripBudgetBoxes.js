import React from 'react';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

//icons
import TodayIcon from '@material-ui/icons/Today';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
  },
  containerWrapper: {
    margin: 'auto',
  },

  icon: {
    marginLeft: 15,
  },
  accountBalanceColor: {
    color: 'rgb(96, 202, 235)',
  },
  dailyIconColor: {
    color: 'rgb(232, 81, 82)',
  },
  todayIconColor: {
    color: 'rgb(218,112,214)',
  },
  spendingWidgetTitle: {
    marginRight: 15,
  },

  mainBoxBudgetItems: {
    padding: '1em',
    textAlign: 'left',
  },

  underBudgetColor: {
    color: '#56a655',
  },
  overBudgetColor: {
    color: '#ce4c52',
  },
  budgetHeading: {
    color: theme.palette.boxContentBudgetHeading.main,
  },
  headingBox: {
    padding: 15,
    borderRadius: 3,
  },
  boxContentSpendingInfo: {
    padding: 10,
    borderRadius: 3,
    backgroundColor: theme.palette.boxBackground.main,
    color: theme.palette.boxContentBudgetData.main,
  },
  budgetBox: {
    padding: 15,
    borderRadius: 3,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}));

// Sum of all expense objects from state for each day
// if none, then 0 is default value
// returns float
const reduceExpenses = (obj) => {
  return obj.reduce((acc, item) => {
    return acc + parseFloat(item.cost);
  }, 0);
};

const TripBudgetBoxes = ({tripData}) => {
  const classes = useStyles();

  const {
    total_budget,
    length,
    home_currency,
    expenses,
    end_date,
    start_date,
  } = tripData;

  let todayExpenses;
  let totalSpentToday = 0;
  let pastAndTodaysExpenses;
  let totalSpentUntilToday = 0;
  let day_remaining = 0;
  let daily_budget = (total_budget / length).toFixed(2);
  let daily_average = 0;
  let adjusted_daily_budget = 0;
  let total_budget_spent = 0;
  let total_budget_remaining = 0;
  let days_left = length;
  let daysIntoTrip = 1;

  let todaysDate = Moment();
  let startDate = Moment(start_date);
  let endDate = Moment(end_date);

  // When props are passed down and render logic executes to make calculations
  if (expenses) {
    //filters all expenses except for today's expenses
    todayExpenses = expenses.filter((expense) => {
      return Moment(expense.purchase_date).isSame(todaysDate, 'days')
        ? expense
        : null;
    });

    pastAndTodaysExpenses = expenses.filter((expense) => {
      return Moment(expense.purchase_date).isSameOrBefore(todaysDate, 'days')
        ? expense
        : null;
    });

    // calculates total spent today
    totalSpentToday = reduceExpenses(todayExpenses);

    // calculate remaining for spending today
    day_remaining = daily_budget - totalSpentToday;

    // calculate all expenses spend until todays date
    totalSpentUntilToday = reduceExpenses(pastAndTodaysExpenses);

    // calculates total spent and remaining in budget
    total_budget_spent = reduceExpenses(expenses).toFixed(2);
    total_budget_remaining = (total_budget - total_budget_spent).toFixed(2);

    // daily average is the average spent so far in the trip

    if (
      !todaysDate.isSame(startDate, 'day') &&
      !todaysDate.isAfter(endDate, 'day') &&
      !todaysDate.isBefore(startDate, 'day')
    ) {
      daysIntoTrip = todaysDate.diff(startDate, 'days') + 1;
    } else if (todaysDate.isBefore(startDate, 'day')) {
      daysIntoTrip = 0;
    } else if (todaysDate.isAfter(endDate, 'day')) {
      daysIntoTrip = length;
    }

    // Daily average is the average spent up until today
    if (totalSpentUntilToday === 0 && daysIntoTrip === 0) {
      daily_average = 0.0;
    } else {
      daily_average = (totalSpentUntilToday / daysIntoTrip).toFixed(2);
    }

    // Days left is length of the trip minus the days into the trip
    days_left = length - daysIntoTrip;

    // edge case - if days left is zero or less then there is one day remaining
    if (days_left <= 0) {
      days_left = 1;
    }

    adjusted_daily_budget = (total_budget_remaining / days_left).toFixed(2);
  }

  return (
    <>
      {/* Budget Boxes Item */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.boxContentSpendingInfo}>
              <Grid container direction='column'>
                <Grid item>
                  <Grid container justify='space-between'>
                    <Grid item>
                      <TodayIcon
                        classes={{root: classes.todayIconColor}}
                        fontSize='large'
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h5'
                        className={classes.spendingWidgetTitle}
                      >
                        {todaysDate.format('MMM Do')}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container justify='space-around'>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      spent today
                    </Typography>
                    <Typography variant='h6' align='right'>
                      <CurrencyFormat
                        value={totalSpentToday}
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
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      remaining
                    </Typography>
                    <Typography
                      variant='h6'
                      className={
                        day_remaining > 0
                          ? classes.underBudgetColor
                          : classes.overBudgetColor
                      }
                      align='right'
                    >
                      <CurrencyFormat
                        value={day_remaining}
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
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.boxContentSpendingInfo}>
              <Grid container direction='column'>
                <Grid item>
                  <Grid container justify='space-between'>
                    <Grid item>
                      <TimelineIcon
                        fontSize='large'
                        classes={{root: classes.dailyIconColor}}
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h5'
                        className={classes.spendingWidgetTitle}
                      >
                        Trip
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container justify='space-around'>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      daily avg
                    </Typography>
                    <Typography variant='h6' align='right'>
                      <CurrencyFormat
                        value={daily_average}
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
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      adjusted budget
                    </Typography>
                    <Typography variant='h6' align='right'>
                      <CurrencyFormat
                        value={adjusted_daily_budget}
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
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Total Widget */}
          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.boxContentSpendingInfo}>
              <Grid container direction='column'>
                <Grid item>
                  <Grid container justify='space-between'>
                    <Grid item>
                      <AccountBalanceIcon
                        classes={{root: classes.accountBalanceColor}}
                        fontSize='large'
                        className={classes.icon}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant='h5'
                        className={classes.spendingWidgetTitle}
                      >
                        Total
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container justify='space-around'>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      total spent
                    </Typography>
                    <Typography variant='h6' align='right'>
                      {/* {getSymbolFromCurrency(home_currency) !== undefined
                        ? getSymbolFromCurrency(home_currency)
                        : '$'}
                      {total_budget_spent} */}

                      <CurrencyFormat
                        value={total_budget_spent}
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
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      remaining
                    </Typography>
                    <Typography
                      variant='h6'
                      className={
                        total_budget_remaining > 0
                          ? classes.underBudgetColor
                          : classes.overBudgetColor
                      }
                      align='right'
                    >
                      {/* {getSymbolFromCurrency(home_currency) !== undefined
                        ? getSymbolFromCurrency(home_currency)
                        : '$'}
                      {total_budget_remaining} */}

                      <CurrencyFormat
                        value={total_budget_remaining}
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
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TripBudgetBoxes;
