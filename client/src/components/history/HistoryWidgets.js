import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';

import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';

//icons
import TodayIcon from '@material-ui/icons/Today';
import TimelineIcon from '@material-ui/icons/Timeline';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

import {makeStyles} from '@material-ui/core/styles';
import {red} from '@material-ui/core/colors';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  //   toolbarMargin: {
  //     ...theme.mixins.toolbar,
  //     marginBottom: '1em',
  //   },

  container: {
    padding: 0,
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
  spendingInfoWidgetBox: {
    padding: 10,
    borderRadius: 3,
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
const reduceExpenses = (obj) => {
  return obj.reduce((acc, item) => {
    return acc + parseFloat(item.cost);
  }, 0);
};

const HistoryWidgets = ({tripData}) => {
  // const theme = useTheme();
  const classes = useStyles();

  const {total_budget, length, expenses, end_date} = tripData;

  let todayExpenses;
  let totalSpentToday = 0;
  let day_remaining = 0;
  let daily_budget = (total_budget / length).toFixed(2);
  let daily_average = 0;
  let new_daily_average = 0;
  let total_budget_spent = 0;
  let total_budget_remaining = 0;
  let days_left;

  // When props are passed down and render logic executes to make calculations
  if (expenses) {
    //filters all expenses except for today's expenses
    todayExpenses = expenses.filter((expense) => {
      return Moment(expense.purchase_date).isSame(Moment(Date.now()), 'days')
        ? expense
        : null;
    });

    // calculates total spent today and how much of todays daily budget remains
    totalSpentToday = reduceExpenses(todayExpenses);
    day_remaining = (daily_budget - totalSpentToday).toFixed(2);

    // calculates total spent and remaining in budget
    total_budget_spent = reduceExpenses(expenses);
    total_budget_remaining = total_budget - total_budget_spent;

    // calculates how many days left in trip not including today
    days_left = Moment(end_date).diff(Date.now(), 'days');

    // calculates the overall trip average and new daily budget to stay
    // on budget target
    daily_average = (total_budget_spent / (length - days_left)).toFixed(2);

    // edge case - if days left is zero then there is one day remaining
    if (days_left <= 0) {
      days_left = 1;
    }
    new_daily_average = (total_budget_remaining / days_left).toFixed(2);
  }

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {/* Budget Boxes Item */}
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.spendingInfoWidgetBox}>
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
                        {Moment(Date.now()).format('MMM Do')}
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
                      ${totalSpentToday}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      remaining
                    </Typography>
                    <Typography
                      variant='h6'
                      className={classes.underBudgetColor}
                      align='right'
                    >
                      ${day_remaining}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.spendingInfoWidgetBox}>
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
                      daily avg.
                    </Typography>
                    <Typography variant='h6' align='right'>
                      ${daily_average}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      new daily budget.
                    </Typography>
                    <Typography variant='h6' align='right'>
                      ${new_daily_average}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Total Widget */}
          <Grid item xs={12} sm={4} md={4}>
            <Box m={1} boxShadow={3} className={classes.spendingInfoWidgetBox}>
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
                      ${total_budget_spent}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      remaining
                    </Typography>
                    <Typography
                      variant='h6'
                      className={classes.underBudgetColor}
                      align='right'
                    >
                      ${total_budget_remaining}
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

export default HistoryWidgets;
