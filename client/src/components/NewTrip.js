import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newTrip} from '../actions/trips';
import {createAlerts} from '../actions/alerts';
import axios from 'axios';
import Moment from 'moment';

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

// Multiselect

import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

//Date
import {KeyboardDatePicker} from '@material-ui/pickers';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  tripNameField: {
    width: '50%',
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
    margin: theme.spacing(3, 1, 2),
    color: 'white',
    fontWeight: 'bold',
    width: 200,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  currencyField: {
    minWidth: 100,
    width: '50%',
    marginTop: '2em',
    marginBottom: '2em',
  },
}));

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewTrip = ({home_currency, newTrip, createAlerts, user, history}) => {
  const theme = useTheme();
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_EXCHANGE_KEY;

  const [formData, setFormData] = useState({
    name: '',
    total_budget: '',
  });
  const [start_date, setStartDate] = useState(Date.now());
  const [end_date, setEndDate] = useState(Date.now());
  const [currencies, setCurrencies] = useState([]);

  let {name, total_budget} = formData;

  //joins all currencies to "USD,COP" format for query string
  // then gets all exchange rates and creat

  const getExchangeRate = async () => {
    try {
      let selectedCurrencies = currencies.join();
      const res = await axios.get('http://data.fixer.io/api/latest', {
        params: {
          access_key: API_KEY,
          base: home_currency,
          symbols: selectedCurrencies,
        },
      });
      //return data object with currency exchange rates
      // return  object {USD: rate, COP: rate}
      return res.data.rates;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350,
      },
    },
  };

  // When a currency is selected, it gets the exchange rate and sets state to
  // an array of currency objects
  const handleCurrencyChange = (event) => {
    setCurrencies(event.target.value);
  };

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

    let currencyRates;
    let length;
    const format = 'YYYY-MM-DD HH:mm:ss';

    // Alert if trip end date is before trip start
    if (Moment(start_date).isAfter(Moment(end_date), 'days')) {
      return createAlerts({validation_error: 'End date is before start date!'});
      //return console.log('cannot start trip after end date');
    }

    // if start is same day as end day then length is 1 day
    if (Moment(end_date).isSame(Moment(start_date), 'day')) {
      length = 1;
    } else if (Moment(end_date).diff(Moment(start_date), 'days') === 1) {
      length = 2;
    } else {
      length = Moment(end_date).diff(Moment(start_date), 'days') + 1;
    }

    if (currencies.length) {
      currencyRates = await getExchangeRate();
    }

    // sets the new trip with the hours adjusted to account for full days
    await newTrip(
      {
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
      },
      currencyRates
    );

    history.push('/dashboard');
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid item>
        <Typography className={classes.heading} variant={matchXs ? 'h4' : 'h2'}>
          New Trip
        </Typography>
      </Grid>
      <Divider className={classes.divider} />
      <Container maxWidth='sm' className={classes.container}>
        <CssBaseline />

        <form className={classes.form} onSubmit={onSubmit} noValidate>
          <Grid container direction='column' spacing={2}>
            <Grid item>
              <TextField
                variant='standard'
                margin='normal'
                required
                placeholder='Name'
                className={classes.tripNameField}
                id='name'
                label='Trip Name'
                name='name'
                value={name}
                onChange={(e) => handleChange(e)}
                autoFocus
              />
            </Grid>

            <Grid item>
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
            </Grid>

            <Grid item>
              <FormControl className={classes.currencyField}>
                <InputLabel>Foreign Currencies</InputLabel>
                <Select
                  multiple
                  value={currencies}
                  onChange={handleCurrencyChange}
                  input={<Input id='select-multiple-chip' />}
                  renderValue={(selected) => (
                    <div className={classes.chips}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          className={classes.chip}
                        />
                      ))}
                    </div>
                  )}
                  MenuProps={MenuProps}
                >
                  {countryData.map((country) =>
                    country.countries.length > 1 ? (
                      country.countries.map((place, index) => (
                        <MenuItem
                          key={country.number + country.code + index}
                          value={`${country.code}`}
                          style={getStyles(name, currencies, theme)}
                        >
                          {`${country.code} - ${place}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        key={country.number + country.code}
                        value={`${country.code}`}
                        style={getStyles(name, currencies, theme)}
                      >
                        {`${country.code} - ${country.countries}`}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Grid
                container
                direction='row'
                spacing={2}
                justify='space-between'
              >
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
          </Grid>
        </form>
      </Container>
    </>
  );
};

NewTrip.propTypes = {
  newTrip: PropTypes.func.isRequired,
  createAlerts: PropTypes.func.isRequired,
  home_currency: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  home_currency: state.auth.user.home_currency,
  user: state.auth.user.id,
});

export default connect(mapStateToProps, {newTrip, createAlerts})(NewTrip);
