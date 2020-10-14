import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Traveler from '../imgs/undraw_stranded_traveler_pdbw.svg';
import Adventure from '../imgs/undraw_adventure_4hum.svg';
import Globe from '../imgs/undraw_connected_world_wuay.svg';

import Background2 from '../imgs/simon-migaj-Yui5vfKHuzs-unsplash.jpg';

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    backgroundColor: theme.palette.secondary.main,
  },
  mainContainer: {
    marginTop: '5em',
    [theme.breakpoints.down('md')]: {
      marginTop: '3em',
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: '2em',
    },
  },
  contentBlock: {
    marginBottom: '10em',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '5em',
    },
  },
  heroContentBlock: {
    marginTop: '-6em',
    height: '103vh',
    backgroundImage: `linear-gradient(
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0.0)
    ), url(${Background2})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',

    [theme.breakpoints.down('sm')]: {
      height: '105vh',
    },
  },
  heroItem: {
    marginBottom: '5em',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '7em',
    },
  },
  heroTextContainer: {
    color: '#fff',
  },
  button: {
    borderRadius: '2em',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  dataReports: {
    marginLeft: '2em',
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      marginTop: '3em',
    },
  },
  iconContainerRight: {
    marginLeft: '2em',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  iconContainerLeft: {
    marginRight: '2em',
    [theme.breakpoints.down('xs')]: {
      marginRight: 0,
    },
  },
  icons: {
    height: '100%',
    width: '100%',
  },
  divider: {
    marginTop: '1em',
    background: theme.palette.primary.dark,
  },
  servicesContainer: {
    margin: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: '3em',
    },
  },
  servicesTextContainer: {
    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
    },
  },
  subheading: {
    marginTop: '1em',
    color: theme.palette.primary.main,
  },
}));

const LandingPageContent = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.content}>
      {/* ------------- Hero Block ---------- */}
      <Grid
        container
        justify='center'
        alignItems='center'
        direction='row'
        className={classes.heroContentBlock}
      >
        <Grid xs={12} sm={8} md={6} lg={5} item className={classes.heroItem}>
          <Grid
            container
            direction='column'
            justify='center'
            alignItems='center'
          >
            <Grid item>
              <Typography
                variant={matchesXs ? 'h4' : 'h3'}
                align='center'
                className={classes.heroTextContainer}
              >
                Get insights on your travel spending so you can get the most
                from your travels.
              </Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to='/signin'
                variant='outlined'
                className={classes.button}
                disableRipple
              >
                Start Budgeting!
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Outer grid component that wraps all grid content */}
      <Container>
        <Grid container direction='column' className={classes.mainContainer}>
          {/* ------------- Start Container ---------- */}
          <Grid item className={classes.contentBlock}>
            <Grid
              container
              justify='flex-start'
              alignItems='center'
              direction='row'
            >
              <Grid sm item className={classes.servicesContainer}>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <Grid item>
                    <Typography
                      variant={matchesXs ? 'h5' : 'h3'}
                      className={classes.servicesTextContainer}
                    >
                      Start planning your next trip today
                    </Typography>
                    <Typography variant='subtitle1'>
                      Be it a trip to Bali or a trip around the world on a
                      shoestring, easily keep to your spending goals.
                      <Divider
                        variant='fullWidth'
                        classes={{root: classes.divider}}
                      />
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      A lightweight budget tool to suit your needs
                    </Typography>
                    <Typography variant='body1'>
                      Hassle free and easy to use. Enter your budget and trip
                      duration and we'll do the rest.
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Budget Categories
                    </Typography>
                    <Typography variant='body1'>
                      Create your own budget categories for tighter control of
                      where you spend your money.
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Track your spending
                    </Typography>
                    <Typography variant='body1'>
                      Keep up with your progress with on-the-go budget tracking.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm item className={classes.iconContainerRight}>
                <img
                  alt='screenshots of travelmor app'
                  src={Adventure}
                  className={classes.icons}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* ------------- Services Container ---------- */}
          <Grid item className={classes.contentBlock}>
            <Grid
              container
              justify='flex-start'
              alignItems='center'
              direction='row-reverse'
            >
              <Grid sm item className={classes.servicesContainer}>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <Grid item>
                    <Typography
                      variant={matchesXs ? 'h5' : 'h3'}
                      className={classes.servicesTextContainer}
                    >
                      Smart &amp; Easy Budgeting
                    </Typography>
                    <Typography variant='subtitle1'>
                      An easy way to monitor your travel budget to make the most
                      of your experiences.
                      <Divider
                        variant='fullWidth'
                        classes={{root: classes.divider}}
                      />
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Stay accountable
                    </Typography>
                    <Typography variant='body1'>
                      Update your budget and get real time graphics that give
                      you a 4D overview of your expenses.
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      On-the-go financial clarity
                    </Typography>
                    <Typography variant='body1'>
                      Highlights of your recent spending and budget for a clear
                      picture of you budget.
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Forecasting
                    </Typography>
                    <Typography variant='body1'>
                      Clear data that helps you make the most of your spending.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm item className={classes.iconContainerLeft}>
                <img
                  alt='screenshots of travelmor app'
                  src={Traveler}
                  className={classes.icons}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* ------------- Global Container ---------- */}
          <Grid item className={classes.contentBlock}>
            <Grid
              container
              justify='flex-start'
              alignItems='center'
              direction='row'
            >
              <Grid sm item className={classes.servicesContainer}>
                <Grid
                  container
                  direction='column'
                  alignItems='center'
                  justify='center'
                >
                  <Grid item>
                    <Typography
                      variant={matchesXs ? 'h5' : 'h3'}
                      className={classes.servicesTextContainer}
                    >
                      International like you
                    </Typography>
                    <Typography variant='subtitle1'>
                      Travelmor. helps you manage your finances from anywhere in
                      the world.
                      <Divider
                        variant='fullWidth'
                        classes={{root: classes.divider}}
                      />
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Foreign currency converter
                    </Typography>
                    <Typography variant='body1'>
                      200+ currencies to help you easily track your spending
                      from anywhere in the world.
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Exportable spreadsheets
                    </Typography>
                    <Typography variant='body1'>
                      Want a physical copy of your budget? Export as CSV and use
                      in Excel or Google Sheets!
                    </Typography>

                    <Typography variant='h6' className={classes.subheading}>
                      Cross off bucket list items together
                    </Typography>
                    <Typography variant='body1'>
                      Helping you spend money on the things that matter.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid sm item className={classes.iconContainerRight}>
                <img
                  alt='screenshots of travelmor app'
                  src={Globe}
                  className={classes.icons}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default LandingPageContent;
