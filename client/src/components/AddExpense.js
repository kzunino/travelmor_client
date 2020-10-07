import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExpense} from '../actions/expenses';
import {createAlerts} from '../actions/alerts';
import Moment from 'moment';

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

//Date
import {KeyboardDatePicker} from '@material-ui/pickers';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
  },
  toolbar: {
    padding: 0,
  },
  container: {
    width: '50%',
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

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
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
}));

const AddExpense = ({
  currencies,
  name,
  homeCurrency,
  trip_uid,
  addExpense,
  user_id,
  createAlerts,
  handleClose,
}) => {
  const theme = useTheme();
  const classes = useStyles();

  // date state
  const [selectedExpenseDate, setSelectedExpenseDate] = useState(Date.now());

  // Initialize default state values
  const [formData, setFormData] = useState({
    expenseName: '',
    currency: homeCurrency,
    expenseCost: '',
    expenseType: 'uncategorized',
  });

  const {expenseName, currency, expenseCost, expenseType} = formData;

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleExpenseDate = (date) => {
    setSelectedExpenseDate(date);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // default exchange rate is 1
    let exchangeRate = 1;
    let expense_cost = expenseCost;
    // conversion is either home currency cost or converted foreign currency
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

    //check if all field are filled out - send alerts
    if (
      !expenseName ||
      !expenseType ||
      !currency ||
      !expenseCost ||
      !selectedExpenseDate
    ) {
      return createAlerts({validation_error: 'Please fill out all fields'});
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
      // converts to UTC time before sending to reducer
      purchase_date: Moment(selectedExpenseDate).toISOString(),
      trip: trip_uid,
      user: user_id,
    };
    //send call to create expense
    addExpense(data);
    //handle close is passed from Bottom Actions Comp to close modal on submit
    handleClose();
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid container direction='column' className={classes.containerWrapper}>
        {/* -----Welcome Container----- */}
        <Grid item>
          <Typography variant={matchXs ? 'h4' : 'h2'}>
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
            <TextField
              variant='standard'
              margin='normal'
              required
              fullWidth
              id='expenseName'
              label='Expense Name'
              value={expenseName}
              name='expenseName'
              onChange={(e) => handleChange(e)}
              autoFocus
            />

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

            <TextField
              className={classes.budgetField}
              variant='standard'
              margin='normal'
              required
              fullWidth
              name='expenseCost'
              value={expenseCost}
              onChange={(e) => handleChange(e)}
              // step="0.01"
              label='Cost'
              type='number'
            />

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

            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='MM/DD/yyyy'
              margin='normal'
              id='date-picker-inline'
              label='Date'
              value={selectedExpenseDate}
              onChange={handleExpenseDate}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />

            <Button
              type='submit'
              variant='contained'
              color='primary'
              className={classes.submit}
              disableRipple
            >
              Submit Expense
            </Button>
          </form>
        </Container>
      </Grid>
    </>
  );
};

addExpense.propTypes = {
  addExpense: PropTypes.func.isRequired,
  user_id: PropTypes.string.isRequired,
  createAlerts: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user_id: state.auth.user.id,
});

export default connect(mapStateToProps, {addExpense, createAlerts})(AddExpense);
