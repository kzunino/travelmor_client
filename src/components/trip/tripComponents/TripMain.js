import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//Charts
import {Bar} from 'react-chartjs-2';

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    height: '15em',
    padding: 5,
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      height: '12em',
      padding: 0,
    },
  },
  mainBoxBudgetItems: {
    padding: '1em',
    textAlign: 'left',
  },
  headingBox: {
    padding: 15,
    borderRadius: 3,
    backgroundColor: theme.palette.boxBackground.main,
    color: theme.palette.boxContentBudgetData.main,
  },
}));

// Sum of all expense objects from state for each day
// if none, then 0 is default value
const reduceExpenses = (obj) => {
  return (
    obj.reduce((acc, item) => {
      return acc + parseFloat(item.cost);
    }, 0) || 0
  );
};

const TripMain = ({tripData}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  let {
    // trip_uid,
    // user,
    name,
    total_budget,
    length,
    home_currency,
    // currencies,
    expenses,
    start_date,
    end_date,
  } = tripData;

  let weekExpenses = {
    todayExpenses: [],
    yesterdayExpenses: [],
    threeDaysAgoExpenses: [],
    fourDaysAgoExpenses: [],
    fiveDaysAgoExpenses: [],
    sixDaysAgoExpenses: [],
    sevenDaysAgoExpenses: [],
  };

  total_budget = parseFloat(total_budget);
  // Calculates the average daily budget
  let daily_budget = parseFloat((total_budget / length).toFixed(2));

  //sets daily totals of money spent
  let dailyTotals = {
    today: 0,
    yesterday: 0,
    threeDaysAgo: 0,
    fourDaysAgo: 0,
    fiveDaysAgo: 0,
    sixDaysAgo: 0,
    sevenDaysAgo: 0,
  };

  if (expenses) {
    // loops over initial [] of weekExpenses and filters through all expenses for
    // each day and returns weekExpenses with updated values
    const filterWeekExpenses = (weekExpenses) => {
      let i = 0;

      Object.keys(weekExpenses).forEach((key) => {
        weekExpenses[key] = expenses.filter((expense) => {
          return Moment(expense.purchase_date).isSame(
            Moment().startOf('day').subtract(i, 'days'),
            'day'
          )
            ? expense
            : null;
        });

        i++;
      });
      return weekExpenses;
    };

    filterWeekExpenses(weekExpenses);

    //sets daily totals of money spent for each day by reducing each item and adding
    //total cost per day
    dailyTotals = {
      today: reduceExpenses(weekExpenses.todayExpenses),
      yesterday: reduceExpenses(weekExpenses.yesterdayExpenses),
      threeDaysAgo: reduceExpenses(weekExpenses.threeDaysAgoExpenses),
      fourDaysAgo: reduceExpenses(weekExpenses.fourDaysAgoExpenses),
      fiveDaysAgo: reduceExpenses(weekExpenses.fiveDaysAgoExpenses),
      sixDaysAgo: reduceExpenses(weekExpenses.sixDaysAgoExpenses),
      sevenDaysAgo: reduceExpenses(weekExpenses.sevenDaysAgoExpenses),
    };
  }

  let {
    today,
    yesterday,
    threeDaysAgo,
    fourDaysAgo,
    fiveDaysAgo,
    sixDaysAgo,
    sevenDaysAgo,
  } = dailyTotals;

  const barData = (canvas) => {
    // const ctx = canvas.getContext('2d');
    // const gradient = ctx.createLinearGradient(0, 0, 0, 450);
    // gradient.addColorStop(0, 'rgba(75,192,192)');
    // gradient.addColorStop(1, 'rgba(75,192,192)');
    // ctx.fillStyle = gradient;
    // ctx.fillRect(20, 20, 150, 100);

    return {
      labels: [
        Moment().subtract(6, 'days').format('ddd'),
        Moment().subtract(5, 'days').format('ddd'),
        Moment().subtract(4, 'days').format('ddd'),
        Moment().subtract(3, 'days').format('ddd'),
        Moment().subtract(2, 'days').format('ddd'),
        Moment().subtract(1, 'days').format('ddd'),
        'Today',
      ],
      datasets: [
        {
          label: '$',
          backgroundColor: [
            //changes colors of bar based on overspending
            sevenDaysAgo < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            sixDaysAgo < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            fiveDaysAgo < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            fourDaysAgo < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            threeDaysAgo < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            yesterday < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
            today < daily_budget
              ? 'rgba(75,192,192,1)'
              : 'rgba(217, 30, 24, 1)',
          ],
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [
            sevenDaysAgo,
            sixDaysAgo,
            fiveDaysAgo,
            fourDaysAgo,
            threeDaysAgo,
            yesterday,
            today,
          ],
        },
      ],
    };
  };

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');
  return (
    <>
      {/* Heading Box Item */}
      <Grid item xs={12}>
        <Box m={1} boxShadow={3} className={classes.headingBox}>
          <Grid item>
            <Grid container justify='center'>
              <Grid item>
                <Typography variant={matchXs ? 'h4' : 'h3'}>{name}</Typography>
                <Typography variant='subtitle2' align='center'>
                  {Moment(start_date).format('MMM Do')} &ndash;{' '}
                  {Moment(end_date).format('MMM Do')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify='space-around' direction='row'>
              <Grid item className={classes.mainBoxBudgetItems}>
                <Typography variant='subtitle2'>trip budget</Typography>
                <Typography variant='h6'>
                  {/* {getSymbolFromCurrency(home_currency) !== undefined
                    ? getSymbolFromCurrency(home_currency)
                    : '$'}
                  {total_budget} */}

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
                </Typography>
              </Grid>
              <Grid item className={classes.mainBoxBudgetItems}>
                <Typography variant='subtitle2'>daily budget</Typography>
                <Typography variant='h6'>
                  {/* {getSymbolFromCurrency(home_currency) !== undefined
                    ? getSymbolFromCurrency(home_currency)
                    : '$'}
                  {daily_budget} */}
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
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item className={classes.chartContainer}>
            <Bar
              data={barData}
              options={{
                title: {
                  display: false,
                  fontSize: 20,
                },
                legend: {
                  display: false,
                  position: 'right',
                },
                maintainAspectRatio: false,

                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: true,
                        color: 'rgba(75,192,192,.1)',
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: true,
                        color: 'rgba(75,192,192,.1)',
                      },
                      ticks: {
                        display: true,
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default TripMain;
