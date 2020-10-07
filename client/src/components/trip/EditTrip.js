import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    width: '10em',
  },
  selectMenu: {
    maxHeight: '15em',
  },
  container: {
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
      padding: 0,
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
}));

const EditTrip = ({
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

  const toggleHidden = () => {
    setHidden(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUser({
      firstName,
      lastName,
      emailAddress,
      homeCurrency,
    });

    setHidden(true);
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>
          Account Settings
        </Typography>
      </Grid>
      <Divider />

      <Container maxWidth={'sm'} className={classes.container}>
        <CssBaseline />
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <Grid container spacing={3}>
            <Grid item>
              <TextField
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
          </Grid>

          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email'
            name='emailAddress'
            value={emailAddress}
            onChange={(e) => {
              handleUserData(e);
            }}
          />

          <br />
          <br />
          {/* ------ Currency Input ----- */}
          <FormControl required className={classes.formControl}>
            <InputLabel id='required-label'>Home Currency</InputLabel>
            <Select
              id='currency'
              value={homeCurrency}
              name='homeCurrency'
              onChange={(e) => {
                handleUserData(e);
              }}
              className={classes.selectEmpty}
              // accesses the menu styles
              MenuProps={{classes: {list: classes.selectMenu}}}
            >
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
              <MenuItem value={'AUD'}>AUD</MenuItem>
              <Divider />
              {countryData.map((country) => (
                <MenuItem
                  key={country.number + country.code}
                  value={country.code}
                >{`${country.code}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={hidden ? classes.hidden : classes.submit}
            disableRipple
          >
            Update
          </Button>
        </form>
      </Container>
    </>
  );
};

EditTrip.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(EditTrip);
