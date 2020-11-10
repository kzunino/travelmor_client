import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Moment from 'moment';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  updateTrip,
  deleteTrip,
  setDefaultTrip,
  deleteDefaultTrip,
} from '../../actions/trips';
import {addCurrencies} from '../../actions/currency';
import {createAlerts} from '../../actions/alerts';
import TripExchangeRate from './TripExchangeRate';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import {KeyboardDatePicker} from '@material-ui/pickers';

// Multi-select
import Autocomplete from '@material-ui/lab/Autocomplete';

// Checkbox
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

// Delete Dialog Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  heading: {
    color: theme.palette.mainHeading.main,
  },
  divider: {
    backgroundColor: theme.palette.boxContentBudgetData.main,
  },
  container: {
    backgroundColor: theme.palette.boxBackground.form,
    borderRadius: 5,
    marginTop: '1em',
    padding: 10,
    paddingBottom: 20,
    [theme.breakpoints.up('md')]: {
      marginLeft: 0,
    },
  },
  submit: {
    display: 'block',
    color: 'white',
    fontWeight: 'bold',
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
  hidden: {
    visibility: 'hidden',
  },
  dateField: {
    marginTop: '1em',
  },
  currencyField: {
    width: 300,
    marginTop: '1em',
    marginBottom: '2em',
  },
  popperMenu: {
    // // Hover
    // '&[data-focus="true"]': {
    //   backgroundColor: theme.palette.listItems.selected,
    //   borderColor: 'transparent',
    // },
    // Selected
    '&[aria-selected="true"]': {
      backgroundColor: theme.palette.listItems.selected,
      borderColor: 'transparent',
    },
  },
  fieldDescription: {
    fontSize: '.5em',
    color: theme.palette.secondary.main,
  },

  /* Styles applied to the root element if `selected={true}`. */
  // menuItemSelected: {},
  disabled: {},
  checkbox: {
    color: theme.palette.secondary.main,
  },
}));

const EditTrip = ({
  updateTrip,
  deleteTrip,
  addCurrencies,
  createAlerts,
  setDefaultTrip,
  deleteDefaultTrip,
  trip_uid,
  name,
  total_budget,
  length,
  start_date,
  end_date,
  currencies,
  home_currency,
  user,
  default_trips,
  history,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));
  const API_KEY = process.env.REACT_APP_EXCHANGE_KEY;

  const [tripFormData, setTripFormData] = useState({
    tripName: name,
    totalBudget: total_budget,
    tripLength: length,
  });

  const [startDate, setStartDate] = useState(Moment(start_date));
  const [endDate, setEndDate] = useState(Moment(end_date));

  // Sets initial state to the country code of Each Currency
  // Array of strings ['USD', 'COP']
  const [foreignCurrencies, setForeignCurrencies] = useState([]);
  // hides the button if no changes are made to user info
  const [hidden, setHidden] = useState(true);
  // State for delete dialog
  const [open, setOpen] = React.useState(false);

  const [defaultTripChecked, setDefaultTripChecked] = React.useState(false);

  let {tripName, totalBudget, tripLength} = tripFormData;

  // creates an array with currencies already selected for trip
  let previouslyChosenCurrencies = currencies.map((currency) => {
    return currency.currency;
  });

  // Maps country data and constructs objects for each individual country
  // then flattens the arrays because some countries share a currency
  // then filters out home_currency countries and previously chosen currencies
  let currencyList = countryData
    .map((country) =>
      country.countries.length > 1
        ? country.countries.map((place) => {
            return {country: `${country.code} - ${place}`, code: country.code};
          })
        : {
            country: `${country.code} - ${country.countries}`,
            code: country.code,
          }
    )
    .flat()
    .filter(
      (country) =>
        !previouslyChosenCurrencies.includes(country.code) &&
        home_currency !== country.code
    );

  useEffect(() => {
    if (default_trips.length && default_trips[0].trip_uid === trip_uid)
      setDefaultTripChecked(true);
  }, [default_trips, trip_uid]);

  // If state is changed  on user's information reveals the update button
  const handleUserData = (e) => {
    toggleHidden();
    setTripFormData({...tripFormData, [e.target.name]: e.target.value});
  };

  //start date state
  const handleStartDateChange = (date) => {
    toggleHidden();
    setStartDate(date);
  };

  //end date state
  const handleEndDateChange = (date) => {
    toggleHidden();
    setEndDate(date);
  };

  // When a currency is selected, it gets the exchange rate and sets state to
  // an array of currency objects
  const handleCurrencyChange = (event, values) => {
    toggleHidden();
    let foreignCurr = values.map((curr) => curr.code);
    setForeignCurrencies(foreignCurr);
  };

  // handles setting trip to default
  const handleSetDefault = () => {
    setDefaultTripChecked(!defaultTripChecked);
  };

  const toggleHidden = () => {
    setHidden(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //joins all currencies to "USD,COP" format for query string
  // then gets all exchange rates and create

  const getExchangeRate = async (addedCurrencies) => {
    try {
      let selectedCurrencies = addedCurrencies.join();
      const res = await axios.get('https://data.fixer.io/api/latest', {
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

  const handleDeleteTrip = () => {
    deleteTrip(trip_uid);
    history.push('/dashboard');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currencyRates;
    let length = tripLength;
    totalBudget = parseFloat(totalBudget).toFixed(2);
    const format = 'YYYY-MM-DD HH:mm:ss';

    // Alert if forms are blank
    if (
      !tripName ||
      isNaN(totalBudget) ||
      startDate === null ||
      endDate === null
    ) {
      // Does nothing
    } else {
      // Alert if trip end date is before trip start
      if (Moment(startDate).isAfter(endDate)) {
        return createAlerts({
          validation_error: 'Cant start a trip after it ends',
        });
      }

      // if start is same day as end day then length is 1 day
      if (Moment(endDate).isSame(Moment(startDate), 'day')) {
        length = 1;
      } else if (Moment(endDate).diff(Moment(startDate), 'days') === 1) {
        length = 2;
      } else {
        length = Moment(endDate).diff(Moment(startDate), 'days') + 1;
      }

      // sets the new trip with the hours adjusted to account for full days
      updateTrip({
        trip_uid,
        user,
        name: tripName,
        total_budget: totalBudget,
        length,
        home_currency,
        start_date: Moment(startDate)
          .set({hour: 0, minute: 0, second: 0, millisecond: 0})
          .format(format),
        end_date: Moment(endDate)
          .set({hour: 23, minute: 59, second: 59, millisecond: 0})
          .format(format),
      });

      if (foreignCurrencies.length) {
        // Filters new currencies codes from old
        let previousCurrencies = currencies.map((curr) => curr.currency);
        let addedCurrencies = foreignCurrencies.filter(
          (curr) => !previousCurrencies.includes(curr)
        );

        // Sends new currencies to get exchange rate data
        if (addedCurrencies.length) {
          // currencyRates = {CRC: 603.44439, CUC: 1};
          currencyRates = await getExchangeRate(addedCurrencies);

          // Dispatch add new currencies to database and state
          addCurrencies({currencyRates}, {trip_uid}, {user});
          setForeignCurrencies([]);
        }
      }

      if (
        defaultTripChecked &&
        default_trips.length &&
        default_trips[0].trip_uid !== trip_uid
      ) {
        deleteDefaultTrip(default_trips[0].default_trip_uid);
        setDefaultTrip({user: user, trip_uid: trip_uid});
      } else if (defaultTripChecked && default_trips.length === 0) {
        setDefaultTrip({user: user, trip_uid: trip_uid});
      } else if (
        !defaultTripChecked &&
        default_trips.length &&
        default_trips[0].trip_uid === trip_uid
      ) {
        deleteDefaultTrip(default_trips[0].default_trip_uid);
      }

      setHidden(true);
    }
  };

  return (
    <>
      {/* Heading Content including delete dialog */}
      <Grid item>
        <Grid container direction='row' justify='space-between'>
          <Grid item>
            <Typography
              className={classes.heading}
              variant={matchXs ? 'h4' : 'h2'}
            >
              Edit Trip
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Divider className={classes.divider} />

      {/* Edit Trip Form Content  */}
      <Container maxWidth={'sm'} className={classes.container}>
        <CssBaseline />
        <form
          className={classes.form}
          onSubmit={(e) => handleSubmit(e)}
          noValidate
        >
          <Grid container direction='column' spacing={0}>
            <Grid item>
              <TextField
                className={classes.inputStyles}
                autoComplete='off'
                error={tripName === ''}
                helperText={tripName === '' ? 'Please name your trip.' : null}
                variant='standard'
                margin='normal'
                required
                id='name'
                label='Trip Name'
                name='tripName'
                value={tripName}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>

            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <CurrencyFormat
                    className={classes.inputStyles}
                    autoComplete='off'
                    error={totalBudget === ''}
                    helperText={
                      totalBudget === '' ? 'Please set a budget.' : null
                    }
                    variant='standard'
                    margin='normal'
                    required
                    placeholder='0.00'
                    label='Budget Total'
                    name='totalBudget'
                    value={totalBudget}
                    InputProps={{inputProps: {min: 0}}}
                    onValueChange={(values) => {
                      const {value} = values;
                      setTripFormData({
                        ...tripFormData,
                        totalBudget: value,
                      });
                      toggleHidden();
                    }}
                    thousandSeparator={true}
                    decimalScale={2}
                    allowNegative={false}
                    prefix={
                      getSymbolFromCurrency(home_currency) !== undefined
                        ? getSymbolFromCurrency(home_currency)
                        : '$'
                    }
                    customInput={TextField}
                  />
                </Grid>
                <Grid item>
                  <Typography className={classes.fieldDescription}>
                    * Trip budget is in {home_currency}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item className={classes.dateField}>
              <Grid
                container
                direction='row'
                spacing={1}
                justify='space-between'
              >
                <Grid xs={6} item>
                  <KeyboardDatePicker
                    className={classes.inputStyles}
                    autoComplete='off'
                    error={!startDate}
                    helperText={
                      !startDate ? 'Please choose a start date.' : null
                    }
                    disableToolbar
                    variant='inline'
                    format='MM/DD/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='Start Date'
                    value={startDate}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>

                <Grid xs={6} item>
                  <KeyboardDatePicker
                    className={classes.inputStyles}
                    autoComplete='off'
                    disableToolbar
                    error={!endDate}
                    helperText={!endDate ? 'Please choose an end date.' : null}
                    variant='inline'
                    format='MM/DD/yyyy'
                    margin='normal'
                    id='date-picker-inline'
                    label='End Date'
                    value={endDate}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={defaultTripChecked}
                    onChange={() => {
                      toggleHidden();
                      handleSetDefault();
                    }}
                    name='checked'
                    color='primary'
                  />
                }
                label={
                  <span style={{fontSize: '1em', color: 'white'}}>
                    Default trip
                  </span>
                }
              />
            </Grid>

            <Grid item>
              <Autocomplete
                className={`${classes.currencyField} ${classes.inputStyles}`}
                classes={{
                  option: classes.popperMenu,
                }}
                style={{marginBottom: '.5em'}}
                multiple
                disableCloseOnSelect
                id='tags-standard'
                key={currencyList.length}
                options={currencyList}
                // What is added to input
                getOptionLabel={(option) => option.code}
                // What options show in menu
                renderOption={(option) => option.country}
                // Selects all options that share same value
                getOptionSelected={(option, value) =>
                  option.code === value.code
                }
                onChange={handleCurrencyChange}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='standard'
                    label='Foreign Currencies (Optional)'
                  />
                )}
              />
              <Typography className={classes.fieldDescription}>
                * Select foreign currencies for countries you will visit
              </Typography>
              <Typography
                style={{marginTop: '.5em', marginBottom: '3em'}}
                className={classes.fieldDescription}
              >
                * Countries that share a currency will all automatically be
                selected
              </Typography>
            </Grid>
          </Grid>

          <Grid container justify='space-between'>
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
            <Grid item className={classes.deleteButtonContainer}>
              <Tooltip title='Delete Trip'>
                <IconButton style={{padding: 0}} onClick={handleClickOpen}>
                  <DeleteForeverIcon
                    style={{color: '#D61A3C'}}
                    fontSize='large'
                  />
                </IconButton>
              </Tooltip>
              <Dialog
                style={{zIndex: 1299}}
                open={open}
                onClose={handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
              >
                <DialogTitle id='alert-dialog-title'>
                  {'Would you like to delete this trip?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id='alert-dialog-description'>
                    Deleting this trip will delete it permanently.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color='primary' autoFocus>
                    Go back
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      handleDeleteTrip();
                    }}
                    color='primary'
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </form>

        {currencies.length ? (
          <>
            <Divider style={{marginTop: '3em'}} />
            <TripExchangeRate />
          </>
        ) : null}
      </Container>
    </>
  );
};

EditTrip.propTypes = {
  updateTrip: PropTypes.func.isRequired,
  addCurrencies: PropTypes.func.isRequired,
  createAlerts: PropTypes.func.isRequired,
  deleteTrip: PropTypes.func.isRequired,
  setDefaultTrip: PropTypes.func.isRequired,
  deleteDefaultTrip: PropTypes.func.isRequired,
  trip_uid: PropTypes.string,
  name: PropTypes.string,
  total_budget: PropTypes.string,
  length: PropTypes.number,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  currencies: PropTypes.array,
  home_currency: PropTypes.string.isRequired,
  user: PropTypes.string,
  default_trips: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  trip_uid: state.trips.trip_uid,
  name: state.trips.name,
  total_budget: state.trips.total_budget,
  length: state.trips.length,
  start_date: state.trips.start_date,
  end_date: state.trips.end_date,
  currencies: state.trips.currencies,
  home_currency: state.trips.home_currency,
  user: state.trips.user,
  default_trips: state.auth.user.default_trips,
});

export default connect(mapStateToProps, {
  updateTrip,
  addCurrencies,
  createAlerts,
  deleteTrip,
  setDefaultTrip,
  deleteDefaultTrip,
})(EditTrip);
