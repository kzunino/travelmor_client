import React from 'react';
// import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

//Charts
import {Pie} from 'react-chartjs-2';

import {makeStyles} from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  budgetBox: {
    padding: 15,
    borderRadius: 3,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
    },
  },
}));

const TripPieChart = ({tripData}) => {
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

  let pieStateData = {
    labels: ['No Expenses Yet'],
    datasets: [
      {
        data: [1],
        // backgroundColor: [
        //   'red',
        //   'blue',
        //   'green',
        //   'black',
        //   'purple',
        //   'orange',
        //   'tomato',
        //   'violet',
        //   'grey',
        //   'yellow',
        // ],
      },
    ],
  };
  let expenseTypeTotalCost = {
    accommodation: 0,
    emergencies: 0,
    entertainment: 0,
    fees: 0,
    food: 0,
    miscellaneous: 0,
    shopping: 0,
    tours: 0,
    transportation: 0,
    uncategorized: 0,
  };

  if (expenses) {
    pieStateData = {
      //
      labels: [
        'Accommodation',
        'Emergencies',
        'Entertainment',
        'Fees',
        'Food',
        'Miscellaneous',
        'Shopping',
        'Tours',
        'Transportation',
        'Uncategorized',
      ],
      datasets: [
        {
          //map over expense type if over 0 spent
          data: [1],
          backgroundColor: [
            'red',
            'blue',
            'green',
            'black',
            'purple',
            'orange',
            'tomato',
            'violet',
            'grey',
            'yellow',
          ],
        },
      ],
    };
  }

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

  return (
    <>
      {/* ------ Pie Chart --------- */}
      <Grid xs={12} md={12} lg={6} item>
        <Box m={1} boxShadow={3} className={classes.budgetBox}>
          <Pie
            height={300}
            data={pieStateData}
            options={{maintainAspectRatio: false}}
          />
        </Box>
      </Grid>
    </>
  );
};

export default TripPieChart;
