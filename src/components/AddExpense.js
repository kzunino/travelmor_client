import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExpense} from '../actions/expenses';
import {createAlerts} from '../actions/alerts';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

// Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Switch
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

//Date
import {KeyboardDatePicker} from '@material-ui/pickers';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  budgetField: {
    width: '50%',
  },
  formControl: {
    width: 200,
    marginTop: '1em',
  },
  switchFormControl: {
    width: 250,
    marginTop: '1em',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '75%',
    },
  },
  hidden: {
    display: 'none',
  },
}));

const AddExpense = ({
  currencies,
  name,
  homeCurrency,
  trip_uid,
  trip_length,
  addExpense,
  user_id,
  start_date,
  end_date,
  createAlerts,
  handleClose,
}) => {
  const theme = useTheme();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useStyles();

  const startDate = Moment(start_date);
  const endDate = Moment(end_date);
  const todaysDate = Moment();

  let defaultDate = startDate;
  // if todays date is within trip boundaries
  // calculate how many days of the trip are left
  if (
    (todaysDate.isAfter(startDate, 'days') &&
      todaysDate.isBefore(endDate, 'days')) ||
    todaysDate.isSame(startDate, 'days') ||
    todaysDate.isSame(endDate, 'days')
  ) {
    defaultDate = todaysDate;
  }

  // Switch hides the purchase range
  const [hideEndDateRange, setHideEndDateRange] = React.useState({
    checked: false,
  });

  const handleDateRange = (event) => {
    setHideEndDateRange({
      ...hideEndDateRange,
      [event.target.name]: event.target.checked,
    });
  };

  // Single date state
  const [selectedExpenseDate, setSelectedExpenseDate] = useState(defaultDate);
  // End of purchase date range state
  const [selectedEndExpenseDate, setSelectedEndExpenseDate] = useState(
    todaysDate.isSame(endDate, 'day')
      ? endDate
      : Moment(selectedExpenseDate).add(1, 'days')
  );

  // Initialize default state values
  const [formData, setFormData] = useState({
    expenseName: undefined,
    currency: homeCurrency,
    expenseCost: undefined,
    expenseType: 'uncategorized',
  });

  let {expenseName, currency, expenseCost, expenseType} = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // handles first date of purchase
  const handleExpenseDate = (date) => {
    setSelectedExpenseDate(date);
  };

  //handles end of purchase date range
  const handleEndExpenseDate = (date) => {
    setSelectedEndExpenseDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // default exchange rate is 1
    let exchangeRate = 1;
    let expense_cost = expenseCost;
    // conversion rate is either home currency cost or converted foreign currency
    let conversion = expenseCost;

    /* If foreign currency is selected, find index of currency and assign new
       exchange rate
     -then calculate cost in home currency and assign it to the new expense_cost */
    if (currency !== homeCurrency) {
      let index = currencies.findIndex((cur) => cur.currency === currency);
      exchangeRate = currencies[index].exchange_rate;

      // calculate what percentage of home currency to find cost in home currency
      let percentOfHomeCurrency = (1 / exchangeRate).toFixed(12);
      expense_cost = (percentOfHomeCurrency * expenseCost).toFixed(2);
    }

    expense_cost = parseFloat(expense_cost);
    exchangeRate = parseFloat(exchangeRate).toFixed(3);
    conversion = parseFloat(conversion).toFixed(3);

    if (expense_cost > 10000000000)
      return createAlerts({validation_error: "Cost can't exceed 10 billion"});

    //check if all field are filled out - send alerts
    if (
      !expenseName ||
      !expenseType ||
      !currency ||
      !expenseCost ||
      !selectedExpenseDate ||
      !selectedEndExpenseDate
    ) {
      expenseName = expenseName ? expenseName : '';
      expenseCost = expenseCost ? expenseCost : '';

      let newState = {
        expenseName,
        currency,
        expenseCost,
        expenseType,
      };
      setFormData(newState);
    } else {
      // Alert if trip end date is before trip start
      if (
        hideEndDateRange.checked &&
        Moment(selectedExpenseDate).isAfter(
          Moment(selectedEndExpenseDate),
          'days'
        )
      ) {
        return createAlerts({
          validation_error: 'End date is before start date!',
        });
      }

      //construct an expense object
      let data = {
        name: expenseName,
        cost: expense_cost,
        expense_type: expenseType,
        currency: currency,
        home_currency: homeCurrency,
        exchange_rate: exchangeRate,
        cost_conversion: conversion,
        purchase_date: Moment(selectedExpenseDate),
        // checks to see if purchase is a date range
        end_of_purchase_date_range: hideEndDateRange.checked
          ? Moment(selectedEndExpenseDate)
          : null,
        trip: trip_uid,
        user: user_id,
      };
      //send call to create expense
      addExpense(data);
      //handle close is passed from Bottom Actions Comp to close modal on submit
      handleClose();
    }
  };

  return (
    <>
      <Grid container direction='column' className={classes.containerWrapper}>
        {/* -----Welcome Container----- */}
        <Grid item>
          <Typography variant={matchXs ? 'h6' : 'h2'}>
            {name} - Add New Expense
          </Typography>
        </Grid>
        <Divider />
        <Container component='div' maxWidth='xs'>
          <CssBaseline />
          <form
            className={classes.form}
            onSubmit={(e) => onSubmit(e)}
            noValidate
          >
            <Grid container direction='column' spacing={0}>
              <Grid item>
                <TextField
                  variant='standard'
                  margin='normal'
                  error={expenseName === ''}
                  helperText={
                    expenseName === '' ? 'Please name your expense.' : null
                  }
                  autoComplete='off'
                  required
                  fullWidth
                  id='expenseName'
                  label='Expense Name'
                  name='expenseName'
                  onChange={(e) => handleChange(e)}
                />
              </Grid>

              <Grid item>
                <FormControl required className={classes.formControl}>
                  <InputLabel id='required-label'>Currency</InputLabel>
                  <Select
                    labelId='demo-simple-select-required-label'
                    id='demo-simple-select-required'
                    value={currency}
                    name='currency'
                    onChange={(e) => handleChange(e)}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value={homeCurrency}>
                      <em>{homeCurrency}</em>
                    </MenuItem>
                    {currencies
                      ? currencies.map((currency, index) => (
                          <MenuItem
                            value={currency.currency}
                            key={currency.currency + index}
                          >
                            {currency.currency}
                          </MenuItem>
                        ))
                      : null}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <CurrencyFormat
                  className={classes.budgetField}
                  label='Cost'
                  variant='standard'
                  margin='normal'
                  error={expenseCost === ''}
                  helperText={
                    expenseCost === '' ? 'Please enter expense cost.' : null
                  }
                  autoComplete='off'
                  required
                  fullWidth
                  name='expenseCost'
                  InputProps={{inputProps: {min: 0}}}
                  onValueChange={(values) => {
                    const {value} = values;
                    setFormData({
                      ...formData,
                      expenseCost: value,
                    });
                  }}
                  thousandSeparator={true}
                  decimalScale={2}
                  allowNegative={false}
                  prefix={
                    getSymbolFromCurrency(homeCurrency) !== undefined
                      ? getSymbolFromCurrency(homeCurrency)
                      : '$'
                  }
                  customInput={TextField}
                />
              </Grid>

              <Grid item>
                {/* ------ Type Input ----- */}
                <FormControl required className={classes.formControl}>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={expenseType}
                    name='expenseType'
                    onChange={(e) => handleChange(e)}
                    className={classes.selectEmpty}
                  >
                    <MenuItem value='uncategorized'>
                      <em>Uncategorized</em>
                    </MenuItem>
                    <MenuItem value={'accommodation'}>Accommodation</MenuItem>
                    <MenuItem value={'food'}>Food</MenuItem>
                    <MenuItem value={'transportation'}>Transportation</MenuItem>
                    <MenuItem value={'entertainment'}>Entertainment</MenuItem>
                    <MenuItem value={'tours'}>Tours</MenuItem>
                    <MenuItem value={'shopping'}>Shopping</MenuItem>
                    <MenuItem value={'gifts'}>Gifts</MenuItem>
                    <MenuItem value={'fees'}>Fees</MenuItem>
                    <MenuItem value={'emergencies'}>Emergencies</MenuItem>
                    <MenuItem value={'miscellaneous'}>Miscellaneous</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item>
                <FormControlLabel
                  className={
                    trip_length > 1 ? classes.switchFormControl : classes.hidden
                  }
                  control={
                    <Switch
                      checked={hideEndDateRange.checked}
                      onChange={handleDateRange}
                      name='checked'
                      color='primary'
                    />
                  }
                  label={
                    <span style={{fontSize: '.75em'}}>
                      Spread one purchase over a range of days? — e.g. Hotel
                      costs
                    </span>
                  }
                />
              </Grid>

              <Grid item>
                <KeyboardDatePicker
                  disableToolbar
                  required
                  variant='inline'
                  format='MM/DD/yyyy'
                  maxDate={
                    hideEndDateRange.checked
                      ? Moment(selectedEndExpenseDate).subtract(1, 'days')
                      : endDate
                  }
                  minDate={startDate}
                  error={!selectedExpenseDate}
                  helperText={
                    !selectedExpenseDate
                      ? 'Please enter a purchase date.'
                      : null
                  }
                  margin='normal'
                  id='date-picker-inline'
                  label={
                    hideEndDateRange.checked
                      ? 'Begin Purchase Date'
                      : 'Purchase Date'
                  }
                  value={selectedExpenseDate}
                  onChange={handleExpenseDate}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </Grid>

              <Grid
                item
                className={hideEndDateRange.checked ? null : classes.hidden}
              >
                <KeyboardDatePicker
                  disableToolbar
                  required
                  variant='inline'
                  format='MM/DD/yyyy'
                  maxDate={endDate}
                  minDate={
                    todaysDate.isSame(endDate, 'day')
                      ? endDate
                      : Moment(selectedExpenseDate).add(1, 'days')
                  }
                  margin='normal'
                  label='End of Purchase Date'
                  error={!selectedEndExpenseDate}
                  helperText={
                    !selectedEndExpenseDate
                      ? 'Please enter an end of purchase date.'
                      : null
                  }
                  value={selectedEndExpenseDate}
                  onChange={handleEndExpenseDate}
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
              Save Expense
            </Button>
          </form>
        </Container>
      </Grid>
    </>
  );
};

addExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
  createAlerts: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
  trip_length: PropTypes.number,
  start_date: PropTypes.string.isRequired,
  end_date: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  user_id: state.auth.user.id,
  start_date: state.trips.start_date,
  end_date: state.trips.end_date,
  trip_length: state.trips.length,
});

export default connect(mapStateToProps, {addExpense, createAlerts})(AddExpense);
