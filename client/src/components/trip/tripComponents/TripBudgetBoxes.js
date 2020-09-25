import React, {useState} from 'react';
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

const TripBudgetBoxes = ({tripData}) => {
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
                      $40.00
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
                      $10.00
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
                        Daily
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
                      $43.50
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant='subtitle2' align='right'>
                      new daily budget.
                    </Typography>
                    <Typography variant='h6' align='right'>
                      $54.00
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
                      $352.50
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
                      $647.50
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
