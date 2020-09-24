import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//Charts
import {Bar} from 'react-chartjs-2';

import {makeStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
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

  chartContainer: {
    height: '15em',
    padding: 5,
    [theme.breakpoints.down('xs')]: {
      height: '12em',
    },
  },

  mainBoxBudgetItems: {
    padding: '1em',
    textAlign: 'left',
  },
  budgetHeading: {
    color: theme.palette.boxContentBudgetHeading.main,
  },
  headingBox: {
    padding: 15,
    borderRadius: 3,
  },
}));

const TripMain = ({tripData}) => {
  // const theme = useTheme();
  const classes = useStyles();

  const {
    trip_uid,
    user,
    name,
    total_budget,
    length,
    home_currency,
    currencies,
    expenses,
    start_date,
    end_date,
  } = tripData;

  const [weekExpenses, setWeekExpenses] = useState({
    todayExpenses: [],
    yesterdayExpenses: [],
    threeDaysAgoExpenses: [],
    fourDaysAgoExpenses: [],
    fiveDaysAgoExpenses: [],
    sixDaysAgoExpenses: [],
    sevenDaysAgoExpenses: [],
  });

  let {
    todayExpenses,
    yesterdayExpenses,
    threeDaysAgoExpenses,
    fourDaysAgoExpenses,
    fiveDaysAgoExpenses,
    sixDaysAgoExpenses,
    sevenDaysAgoExpenses,
  } = weekExpenses;

  // Sum of all expenses for each day
  // if none then 0 is default value
  let dailyWeekTotals = {
    today:
      todayExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    yesterday:
      yesterdayExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    threeDaysAgo:
      threeDaysAgoExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    fourDaysAgo:
      fourDaysAgoExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    fiveDaysAgo:
      fiveDaysAgoExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    sixDaysAgo:
      sixDaysAgoExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
    sevenDaysAgo:
      sevenDaysAgoExpenses.reduce((acc, item) => {
        return acc + parseFloat(item.cost);
      }, 0) || 0,
  };

  let {
    today,
    yesterday,
    threeDaysAgo,
    fourDaysAgo,
    fiveDaysAgo,
    sixDaysAgo,
    sevenDaysAgo,
  } = dailyWeekTotals;

  useEffect(() => {
    //checks to see if purchase date
    // Passing in 'day' will check day, month, and year
    // if timezone is present first moment will be timezone used for comparison
    const weekExpenses = () => {
      if (expenses) {
        setWeekExpenses({
          //Filters through all expenses and sets todays purchases
          todayExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isAfter(
              Moment(Date.now()),
              'day'
            )
              ? expense
              : null;
          }),

          //Yesterday expenses
          //filters purchase date if is the same as todays date - one day
          yesterdayExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(1, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //three days ago expenses
          threeDaysAgoExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(2, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //four days ago expenses
          fourDaysAgoExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(3, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //five days ago expenses
          fiveDaysAgoExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(4, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //six days ago expenses
          sixDaysAgoExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(5, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //seven days ago expenses
          sevenDaysAgoExpenses: expenses.filter((expense) => {
            return Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(6, 'days'),
              'days'
            )
              ? expense
              : null;
          }),

          //end setWeekExpenses
        });
      }
    };
    weekExpenses();
    if (expenses) {
      console.log(
        expenses.filter((expense) => {
          console.log(
            Moment(expense.purchase_date).isSame(
              Moment(Date.now()).subtract(1, 'days'),
              'days'
            )
          );
          return Moment(expense.purchase_date).isAfter(
            Moment(Date.now()),
            'days'
          )
            ? expense
            : null;
        })
      );
    }
  }, [expenses, setWeekExpenses]);

  const barData = {
    labels: [
      Moment(Date.now()).subtract(6, 'days').format('ddd'),
      Moment(Date.now()).subtract(5, 'days').format('ddd'),
      Moment(Date.now()).subtract(4, 'days').format('ddd'),
      Moment(Date.now()).subtract(3, 'days').format('ddd'),
      Moment(Date.now()).subtract(2, 'days').format('ddd'),
      Moment(Date.now()).subtract(1, 'days').format('ddd'),
      'Today',
    ],
    datasets: [
      {
        label: '$',
        backgroundColor: 'rgba(75,192,192,1)',
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

  // Calculates the average daily budget
  let daily_budget = (total_budget / length).toFixed(2);

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
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
                <Typography variant='h3'>{name}</Typography>
                <Typography
                  variant='subtitle2'
                  align='center'
                  className={classes.budgetHeading}
                >
                  {Moment(start_date).format('MMM do')} &ndash;{' '}
                  {Moment(end_date).format('MMM do')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container justify='space-around' direction='row'>
              <Grid item className={classes.mainBoxBudgetItems}>
                <Typography
                  variant='subtitle2'
                  className={classes.budgetHeading}
                >
                  trip budget
                </Typography>
                <Typography variant='h6'>${total_budget}</Typography>
              </Grid>
              <Grid item className={classes.mainBoxBudgetItems}>
                <Typography
                  variant='subtitle2'
                  className={classes.budgetHeading}
                >
                  daily budget
                </Typography>
                <Typography variant='h6'>${daily_budget}</Typography>
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
                        display: false,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: false,
                      },
                      ticks: {
                        display: false,
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
