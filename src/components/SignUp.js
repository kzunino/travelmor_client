import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../actions/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

// Auto complete search select
import Autocomplete from '@material-ui/lab/Autocomplete';

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {'Copyright © '}
      <Link color='inherit' to='/'>
        Travelmor.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  containerWrapper: {
    backgroundColor: theme.palette.secondary.main,
    marginTop: theme.spacing(2),
    border: 'grey solid thin',
    marginBottom: '2em',
    padding: 15,
    [theme.breakpoints.down('xs')]: {
      border: 'none',
      margin: 0,
    },
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(0),
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  selectEmpty: {
    width: '10em',
    marginTop: '.5em',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },
}));

const SignUp = ({register, isAuthenticated, isLoading}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    first_name: undefined,
    last_name: undefined,
    home_currency: 'USD',
    email: undefined,
    password1: undefined,
    password2: undefined,
  });

  let {
    first_name,
    last_name,
    home_currency,
    email,
    password1,
    password2,
  } = formData;

  const handleForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleCurrencyUpdate = (e, values) => {
    setFormData({...formData, home_currency: values});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !first_name ||
      !last_name ||
      !email ||
      !password1 ||
      !password2 ||
      !home_currency
    ) {
      first_name = first_name ? first_name : '';
      last_name = last_name ? last_name : '';
      home_currency = home_currency ? home_currency : 'USD';
      email = email ? email : '';
      password1 = password1 ? password1 : '';
      password2 = password2 ? password2 : '';

      let newState = {
        first_name,
        last_name,
        home_currency,
        email,
        password1,
        password2,
      };
      setFormData(newState);
      // return createAlerts({validation_error: 'Please fill out all fields'});
    } else {
      email = email.toLowerCase();

      //passes info to register action passed in from props
      register({
        first_name,
        last_name,
        home_currency,
        email,
        password1,
        password2,
      });
    }
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Container
      component='div'
      maxWidth='xs'
      className={classes.containerWrapper}
    >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='standard'
            margin='normal'
            required
            error={first_name === ''}
            helperText={first_name === '' ? 'Please enter first name.' : null}
            onChange={handleForm}
            fullWidth
            id='first_name'
            label='First Name'
            name='first_name'
            autoComplete='first_name'
            autoFocus
          />
          <TextField
            variant='standard'
            margin='normal'
            required
            error={last_name === ''}
            helperText={last_name === '' ? 'Please enter last name.' : null}
            onChange={handleForm}
            fullWidth
            id='last_name'
            label='Last Name'
            name='last_name'
            autoComplete='last_name'
          />

          <Autocomplete
            options={countryData.map((country, index) => country.code)}
            className={classes.selectEmpty}
            getOptionLabel={(option) => option}
            value={home_currency}
            onChange={handleCurrencyUpdate}
            renderInput={(params) => (
              <TextField
                {...params}
                error={!home_currency}
                helperText={
                  !home_currency ? 'Please enter home currency.' : null
                }
                label='Home Currency'
                variant='standard'
              />
            )}
          />

          <TextField
            variant='standard'
            margin='normal'
            required
            error={email === ''}
            helperText={email === '' ? 'Please enter your email.' : null}
            onChange={handleForm}
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
          />
          <TextField
            variant='standard'
            margin='normal'
            required
            error={password1 === ''}
            helperText={password1 === '' ? 'Please enter a password.' : null}
            onChange={handleForm}
            fullWidth
            name='password1'
            label='Password'
            type='password'
            id='password1'
          />
          <TextField
            variant='standard'
            margin='normal'
            required
            error={password2 === ''}
            helperText={password2 === '' ? 'Please confirm password.' : null}
            onChange={handleForm}
            fullWidth
            name='password2'
            label='Confirm Password'
            type='password'
            id='password2'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          {isLoading ? (
            <div className={classes.spinner}>
              <CircularProgress />
            </div>
          ) : (
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}
              disableRipple
            >
              Sign Up
            </Button>
          )}
          <Grid container>
            <Grid item xs>
              <Link to='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signin' variant='body2'>
                {'Already have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

SignUp.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {register})(SignUp);
