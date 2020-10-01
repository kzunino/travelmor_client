import React, {useState} from 'react';
// import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newTrip} from '../actions/trips';

import Moment from 'moment';
import Typography from '@material-ui/core/Typography';
// import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//Date
import {KeyboardDatePicker} from '@material-ui/pickers';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '50%',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  // avatar: {
  //   margin: theme.spacing(1),
  //   backgroundColor: theme.palette.primary.main,
  // },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  budgetField: {
    width: '50%',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    verticalAlign: 'bottom',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width: '10em',
  },
  selectMenu: {
    maxHeight: '15em',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
    width: '50%',
  },
}));

const NewTrip = ({home_currency, newTrip, user, history}) => {
  const theme = useTheme();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    total_budget: '',
  });
  const [start_date, setStartDate] = useState(Date.now());
  const [end_date, setEndDate] = useState(Date.now());

  let {name, total_budget} = formData;

  //start date state
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  //end date state
  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let length;
    const format = 'YYYY-MM-DD HH:mm:ss';

    // Alert if trip end date is before trip start
    if (Moment(start_date).isAfter(end_date)) {
      return console.log('cannot start trip after end date');
    }

    // if start is same day as end day
    if (Moment(end_date).isSame(Moment(start_date), 'day')) {
      length = 1;
    } else if (Moment(end_date).diff(Moment(start_date), 'days') === 1) {
      length = 2;
    } else {
      length = Moment(end_date).diff(Moment(start_date), 'days') + 1;
    }

    // sets the new trip with the hours adjusted to account for full days
    await newTrip({
      user,
      name,
      total_budget,
      length,
      home_currency,
      start_date: Moment(start_date)
        .set({hour: 0, minute: 0, second: 0, millisecond: 0})
        .format(format),
      end_date: Moment(end_date)
        .set({hour: 23, minute: 59, second: 59, millisecond: 0})
        .format(format),
    });

    history.push('/dashboard');
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar />
        <Grid container direction='column'> */}
      {/* -----Welcome Container----- */}
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>New Trip</Typography>
      </Grid>
      <Divider />
      <Container component='div' maxWidth='xs'>
        <CssBaseline />

        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='name'
            label='Trip Name'
            name='name'
            value={name}
            onChange={(e) => handleChange(e)}
            autoFocus
          />
          <TextField
            className={classes.budgetField}
            variant='standard'
            margin='normal'
            required
            fullWidth
            name='total_budget'
            value={total_budget}
            onChange={(e) => handleChange(e)}
            label='Budget Total'
            type='number'
            placeholder='0.00'
            InputProps={{inputProps: {min: 0}}}
            id='total_budget'
          />

          {/* ------ Currency Input -----
          <FormControl required className={classes.formControl}>
            <InputLabel id='required-label'>Home Currency</InputLabel>
            <Select
              id='currency'
              value={currency}
              onChange={handleCurrencyType}
              className={classes.selectEmpty}
              // accesses the menu styles
              MenuProps={{classes: {list: classes.selectMenu}}}
            >
              <MenuItem value={'840'}>USD</MenuItem>
              <MenuItem value={'978'}>EUR</MenuItem>
              <MenuItem value={'036'}>AUD</MenuItem>
              <Divider />
              {countryData.map((country) =>
                country.countries.length > 1 ? (
                  country.countries.map((place, index) => (
                    <MenuItem
                      key={country.number + country.code + index}
                      value={`${country.number}`}
                    >
                      {`${country.code} - ${place}`}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem
                    key={country.number + country.code}
                    value={`${country.number}`}
                  >
                    {`${country.code} - ${country.countries}`}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl> */}

          <Grid container direction='row' spacing={2} justify='space-between'>
            <Grid xs={6} item>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Start Date'
                value={start_date}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>

            <Grid xs={6} item>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='End Date'
                value={end_date}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>

          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            disableRipple
          >
            Create Trip
          </Button>
        </form>
      </Container>
      {/* </Grid>
      </main> */}
    </>
  );
};

NewTrip.propTypes = {
  newTrip: PropTypes.func.isRequired,
  home_currency: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  home_currency: state.auth.user.home_currency,
  user: state.auth.user.id,
});

export default connect(mapStateToProps, {newTrip})(NewTrip);
