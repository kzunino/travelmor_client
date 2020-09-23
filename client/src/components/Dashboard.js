import React from 'react';
import {Link} from 'react-router-dom';
import Trip from './Trip';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // toolbarMargin: {
  //   ...theme.mixins.toolbar,
  //   marginBottom: '1em',
  // },
  table: {
    minWidth: 300,
    maxWidth: 700,
  },
  // toolbar: {
  //   padding: 0,
  // },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  //   marginLeft: drawerWidth,
  //   marginBottom: 50,
  //   //backgroundColor: '#2F2F31',
  //   backgroundColor: 'whitesmoke',
  //   [theme.breakpoints.down('sm')]: {
  //     marginLeft: 0,
  //     padding: theme.spacing(1, 1.5),
  //     marginTop: '1em',
  //   },
  // },
  // containerWrapper: {
  //   margin: 'auto',
  // },
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
  container: {
    padding: 0,
  },
  mainContentBox: {
    //backgroundColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.background.main,
    marginTop: '2em',
    marginLeft: 0,
    marginRight: 0,
    paddingTop: '1em',
    paddingBottom: '1em',
    display: 'flex',
  },

  chartContainer: {
    [theme.breakpoints.down('xs')]: {
      height: '12em',
    },
  },
  overallSpendingItems: {
    padding: '1em',
    textAlign: 'left',
  },
  dailySpendingItems: {
    padding: '1em',
    textAlign: 'left',
  },
  averageSpendingItems: {
    // marginRight: 'auto',
    padding: '1em',
    textAlign: 'left',
  },
  underBudgetColor: {
    color: '#56a655',
  },
  overBudgetColor: {
    color: '#ce4c52',
  },
  box: {
    backgroundColor: '#4a4a4a',
  },
  budgetData: {
    color: theme.palette.boxContentBudgetData.main,
  },
  budgetHeading: {
    color: theme.palette.boxContentBudgetHeading.main,
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const classes = useStyles();

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar />
        <Grid container direction='column' className={classes.containerWrapper}> */}
      {/* -----Welcome Container----- */}
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>Welcome, Kyle!</Typography>
      </Grid>
      <Divider />
      <Container maxWidth={'lg'} className={classes.container}>
        <Grid item>
          <Grid container direction='column'>
            <Grid item>
              <Typography variant={matchXs ? 'h5' : 'h4'}>
                Create a trip to get started!
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant='outlined'
                disableRipple
                component={Link}
                to='/newtrip'
                className={classes.button}
              >
                Create New Trip
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {/* -----Trip----- */}
        <Trip />
      </Container>
      {/* </Grid>
      </main> */}
    </>
  );
};

export default Dashboard;
