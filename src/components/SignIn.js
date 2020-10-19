import React, {useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../actions/auth';

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
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    border: 'grey solid thin',
    marginTop: theme.spacing(4),
    padding: 15,
    [theme.breakpoints.down('xs')]: {
      border: 'none',
    },
  },
  spinner: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  paper: {
    marginTop: theme.spacing(8),
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
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },
}));

const SignIn = ({isAuthenticated, login, isLoading}) => {
  const classes = useStyles();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  let {email, password} = formData;

  const handleForm = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    email = email.toLowerCase();

    //passes info to register action passed in from props
    login({
      email,
      password,
    });
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return isLoading ? (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  ) : (
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
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e) => onSubmit(e)}>
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            value={email}
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
            onChange={handleForm}
          />
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            value={password}
            name='password'
            label='Password'
            type='password'
            id='password'
            onChange={handleForm}
            autoComplete='current-password'
          />
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            disableRipple
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/signup' variant='body2'>
                {"Don't have an account? Sign Up"}
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

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isLoading: state.auth.isLoading,
});

export default connect(mapStateToProps, {login})(SignIn);
