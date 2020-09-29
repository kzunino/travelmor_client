import React, {useState, forwardRef} from 'react';
// import {Link} from 'react-router-dom';
import TripMain from './tripComponents/TripMain';
import TripBudgetBoxes from './tripComponents/TripBudgetBoxes';
import TripTable from './tripComponents/TripTable';
import TripPieChart from './tripComponents/TripPieChart';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import BottomAction from '../BottomActions';

import {makeStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
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
}));

const Trip = ({tripData}) => {
  // const theme = useTheme();
  const classes = useStyles();

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

  return (
    <>
      <Grid item>
        <Grid container justify='space-between'>
          <TripMain tripData={tripData} />
          <TripBudgetBoxes tripData={tripData} />
          <TripTable tripData={tripData} />
          <TripPieChart tripData={tripData} />
        </Grid>
      </Grid>
      <BottomAction />
    </>
  );
};

export default Trip;
