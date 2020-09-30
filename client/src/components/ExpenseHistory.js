import React, {useState, forwardRef, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getTrip} from '../actions/trips';
import Moment from 'moment';

import TripTable from './trip/tripComponents/TripTable';

import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Line Chart imports
import {Line} from 'react-chartjs-2';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: drawerWidth,
    marginBottom: 50,
    backgroundColor: theme.palette.background.main,
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      padding: theme.spacing(1, 1.5),
      marginTop: '1em',
    },
  },
  containerWrapper: {
    margin: 'auto',
  },
  //table styles

  tableWrapper: {
    marginTop: '2em',
    padding: 0,
  },
}));

const ExpenseHistory = ({match, getTrip, trip_data}) => {
  const theme = useTheme();
  const classes = useStyles();

  const {name} = trip_data;

  useEffect(() => {
    const {trip_uid} = match.params;
    getTrip(trip_uid);
  }, []);

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Daily Spending',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Daily Budget',
        data: [50, 50, 50, 50, 50, 50],
        fill: false,
        borderColor: '#742774',
      },
    ],
  });

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <>
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>
          {name} - Expense History
        </Typography>
      </Grid>
      <Divider />
      <Container component='div' maxWidth='lg' className={classes.tableWrapper}>
        <Grid container direction='column'>
          {/* Line Chart Item */}
          <Grid item xs={12}>
            <Box m={1} boxShadow={3} className={classes.tableBox}>
              <Line data={chartData} />
            </Box>
          </Grid>
          {/* Table Item */}
          <TripTable tripData={trip_data} />
        </Grid>
      </Container>
    </>
  );
};

ExpenseHistory.propType = {
  trip_data: PropTypes.object.isRequired,
  getTrip: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  trip_data: state.trips,
});

export default connect(mapStateToProps, {getTrip})(ExpenseHistory);
