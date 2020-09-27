import React, {useState, forwardRef} from 'react';
// import {Link} from 'react-router-dom';
import TripMain from './tripComponents/TripMain';
import TripBudgetBoxes from './tripComponents/TripBudgetBoxes';
import TripTable from './tripComponents/TripTable';
import TripPieChart from './tripComponents/TripPieChart';

import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//Charts
import {Pie} from 'react-chartjs-2';

import {makeStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  table: {
    minWidth: 300,
    maxWidth: 700,
  },
  toolbar: {
    padding: 0,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginBottom: 50,
    //backgroundColor: '#2F2F31',
    backgroundColor: 'whitesmoke',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },
  container: {
    padding: 0,
  },
  containerWrapper: {
    margin: 'auto',
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
  divider: {
    marginBottom: '1em',
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
  tableBox: {
    padding: 8,
  },
}));

const Trip = ({tripData}) => {
  // const theme = useTheme();
  const classes = useStyles();

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar />
        <Grid container direction='column' className={classes.containerWrapper}>
          <Container maxWidth={'lg'} className={classes.container}> */}
      <Grid item>
        <Grid container justify='space-between'>
          <TripMain tripData={tripData} />
          <TripBudgetBoxes tripData={tripData} />
          <TripTable tripData={tripData} />
          <TripPieChart tripData={tripData} />
        </Grid>
      </Grid>

      {/* </Container>
        </Grid>
      </main> */}
    </>
  );
};

export default Trip;
