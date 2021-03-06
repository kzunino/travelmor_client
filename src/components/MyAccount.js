import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateUser} from '../actions/auth';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

/*

 Needs to add extra security for users to update their email addresses.
  -verification email before changing their email
  -need to create a custom change password serializer in django

*/

// MUI Componeents
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';

// Auto complete search select
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  input: {
    width: 250,
  },
  inputStyles: {
    '& .MuiFormLabel-root': {
      color: theme.palette.secondary.offWhite,
    },
    '& .MuiInput-underline': {
      '&:before': {
        borderBottom: '1px solid whitesmoke',
      },
      '&:hover:not($disabled):before': {
        borderBottom: '2px solid whitesmoke',
      },
    },
    // Changes input text color and placeholder text
    '& .MuiInputBase-input': {
      color: theme.palette.secondary.main,
    },
    '& .MuiFormLabel-filled': {
      backgroundColor: theme.palette.boxBackground.form,
    },

    '& .MuiIconButton-root': {
      color: theme.palette.primary.main,
    },
    '& .MuiSelect-icon': {
      color: theme.palette.primary.main,
    },
    '& .MuiAutocomplete-clearIndicator': {
      color: '#D61A3C',
    },
  },
  selectEmpty: {
    width: 200,
    '&:before': {
      borderColor: theme.palette.formInputs.border,
    },
  },
  fieldDescription: {
    fontSize: '.5em',
    color: theme.palette.secondary.main,
  },
  container: {
    backgroundColor: theme.palette.boxBackground.form,
    borderRadius: 5,
    marginTop: '1em',
    padding: 10,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },
  hidden: {
    visibility: 'hidden',
  },

  disabled: {},
}));

const MyAccount = ({
  first_name,
  last_name,
  home_currency,
  email,
  updateUser,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const [userData, setUserData] = useState({
    firstName: first_name,
    lastName: last_name,
    emailAddress: email,
    homeCurrency: home_currency,
  });

  // hides the button if no changes are made to user info
  const [hidden, setHidden] = useState(true);

  const {firstName, lastName, emailAddress, homeCurrency} = userData;

  // If state is changed  on user's information reveals the update button
  const handleUserData = (e) => {
    toggleHidden();
    setUserData({...userData, [e.target.name]: e.target.value});
  };

  const handleCurrencyUpdate = (e, values) => {
    toggleHidden();

    setUserData({...userData, homeCurrency: values});
  };

  const toggleHidden = () => {
    setHidden(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Alert if forms are blank
    if (!firstName || !lastName || !emailAddress || !homeCurrency) {
      // does nothing
    } else {
      updateUser({
        firstName,
        lastName,
        emailAddress,
        homeCurrency,
      });

      setHidden(true);
    }
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid item>
        <Typography className={classes.heading} variant={matchXs ? 'h4' : 'h2'}>
          Account Settings
        </Typography>
      </Grid>
      <Divider className={classes.divider} />

      <Container maxWidth={'sm'} className={classes.container}>
        <CssBaseline />
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <TextField
                autoFocus
                autoComplete='off'
                className={`${classes.input} ${classes.inputStyles}`}
                error={firstName === ''}
                helperText={
                  firstName === '' ? 'Please enter your first name.' : null
                }
                variant='standard'
                margin='normal'
                required
                id='first_name'
                label='First Name'
                name='firstName'
                value={firstName}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                variant='standard'
                autoComplete='off'
                className={`${classes.input} ${classes.inputStyles}`}
                error={lastName === ''}
                helperText={
                  lastName === '' ? 'Please enter your last name.' : null
                }
                margin='normal'
                required
                id='last_name'
                label='Last Name'
                name='lastName'
                value={lastName}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                variant='standard'
                autoComplete='off'
                margin='normal'
                required
                style={{width: 250}}
                className={classes.inputStyles}
                error={emailAddress === ''}
                helperText={
                  emailAddress === '' ? 'Please enter an email address.' : null
                }
                id='email'
                label='Email'
                name='emailAddress'
                value={emailAddress}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>

            <Grid item>
              {/* ----- Currency Input ------ */}
              <Autocomplete
                options={countryData.map((country, index) => country.code)}
                className={`${classes.selectEmpty} ${classes.inputStyles}`}
                getOptionLabel={(option) => option}
                value={homeCurrency}
                onChange={handleCurrencyUpdate}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    error={!homeCurrency}
                    helperText={
                      !homeCurrency ? 'Please enter home currency.' : null
                    }
                    label='Home Currency'
                    variant='standard'
                  />
                )}
              />
              <Typography
                style={{marginTop: '.5em'}}
                className={classes.fieldDescription}
              >
                * Changing home currency will not change the home currency of
                already created trips.
              </Typography>
            </Grid>

            <Grid item>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                className={hidden ? classes.hidden : classes.submit}
                disableRipple
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </>
  );
};

MyAccount.propTypes = {
  updateUser: PropTypes.func.isRequired,
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  home_currency: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  first_name: state.auth.user.first_name,
  last_name: state.auth.user.last_name,
  email: state.auth.user.email,
  home_currency: state.auth.user.home_currency,
});

export default connect(mapStateToProps, {updateUser})(MyAccount);
