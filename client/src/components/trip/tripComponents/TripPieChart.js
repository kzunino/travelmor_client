import React from 'react';

// import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import {makeStyles} from '@material-ui/core/styles';

//Charts
import {Doughnut} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js';
import {Typography} from '@material-ui/core';
Chart.plugins.unregister(ChartDataLabels);

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

  const {expenses} = tripData;

  //initial state of pie chart is greyed out
  let pieStateData = {
    labels: ['No Expenses Yet'],
    datasets: [
      {
        data: [1],
        backgroundColor: ['grey'],
      },
    ],
  };

  let options = {
    maintainAspectRatio: false,
  };

  if (expenses) {
    let expenseTypeTotalCost = {
      accomodation: 0,
      emergency: 0,
      entertainment: 0,
      fees: 0,
      food: 0,
      miscellaneous: 0,
      shopping: 0,
      tours: 0,
      transportation: 0,
      uncategorized: 0,
    };

    // loops through expense types and filters each category and adds totals for
    // each type

    Object.keys(expenseTypeTotalCost).forEach((key) => {
      expenseTypeTotalCost[key] = expenses
        .filter((expense) => {
          return key === expense.expense_type;
        })
        .reduce((acc, item) => {
          return acc + parseFloat(item.cost);
        }, 0);
    });

    /*
   Creates an array from the expenseTypeTotalCosts with all 
   expense types that a user has used. 
   */
    let labels = Object.keys(expenseTypeTotalCost)
      .filter((key) => {
        return expenseTypeTotalCost[key] > 0;
      })
      .map((key) => {
        if (expenseTypeTotalCost[key] > 0)
          return key.charAt(0).toLocaleUpperCase() + key.slice(1);
      });

    /*
   Creates an array from the expenseTypeTotalCosts with all types that have
   a numerical value over 0 dollars spent 
   */

    let data = Object.keys(expenseTypeTotalCost)
      .filter((key) => {
        return expenseTypeTotalCost[key] > 0;
      })
      .map((key) => {
        if (expenseTypeTotalCost[key] > 0) return expenseTypeTotalCost[key];
        else;
      });

    pieStateData = {
      //
      plugins: [ChartDataLabels],
      labels: labels,
      datasets: [
        {
          //map over expense type if over 0 spent
          data: data,
          backgroundColor: [
            'red',
            'blue',
            'green',
            'black',
            'purple',
            'orange',
            'tomato',
            'violet',
            'yellow',
            'grey',
          ],
          //   hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        },
      ],
    };

    // new options use plugin to calculate percentages
    options = {
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
        },
      },
      legend: {
        position: 'bottom',
        align: 'start',
        labels: {
          usePointStyle: true,
        },
      },
      plugins: {
        // Change options for ALL labels of THIS CHART
        datalabels: {
          color: 'black',
          formatter: (value, ctx) => {
            let sum = 0;
            let dataArr = ctx.chart.data.datasets[0].data;
            dataArr.map((data) => {
              sum += data;
            });
            let percentage = ((value * 100) / sum).toFixed(0) + '%';
            return percentage;
          },
          align: 'start',
          offset: 38,
          display: 'auto',
        },
      },
    };
  }

  // const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  //prevents table from exceeding boundaries
  // const matchesTable = useMediaQuery('(max-width:648px)');

  return (
    <>
      {/* ------ Pie Chart --------- */}
      <Grid xs={12} sm={12} item>
        <Box m={1} boxShadow={3} className={classes.budgetBox}>
          <Grid item>
            <Typography variant='h5'>Trip Expense Types</Typography>
          </Grid>
          <Grid item>
            <Doughnut
              plugins={[ChartDataLabels]}
              height={400}
              data={pieStateData}
              options={options}
            />
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default TripPieChart;
