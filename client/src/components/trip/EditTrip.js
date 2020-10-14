import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Moment from 'moment';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateTrip, deleteTrip} from '../../actions/trips';
import {addCurrencies} from '../../actions/currency';
import {createAlerts} from '../../actions/alerts';
import TripExchangeRate from './TripExchangeRate';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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

//Select
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {KeyboardDatePicker} from '@material-ui/pickers';

import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

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
  deleteButtonContainer: {
    marginTop: 'auto',
  },
  selectEmpty: {
    width: '10em',
  },
  selectMenu: {
    maxHeight: '15em',
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
    display: 'block',
    margin: theme.spacing(0, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },
  hidden: {
    visibility: 'hidden',
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

const EditTrip = ({
  trip_uid,
  name,
  total_budget,
  length,
  start_date,
  end_date,
  currencies,
  home_currency,
  user,
  updateTrip,
  deleteTrip,
  addCurrencies,
  createAlerts,
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

  let {tripName, totalBudget, tripLength} = tripFormData;

  useEffect(() => {
    setForeignCurrencies(
      currencies.map((currency) => {
        return currency.currency;
      })
    );
  }, [currencies]);

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
  const handleCurrencyChange = (event) => {
    toggleHidden();
    setForeignCurrencies(event.target.value);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currencyRates;
    let length = tripLength;
    totalBudget = parseFloat(totalBudget).toFixed(2);
    const format = 'YYYY-MM-DD HH:mm:ss';

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
      console.log(addedCurrencies);
      // Sends new currencies to get exchange rate data
      if (addedCurrencies.length) {
        // currencyRates = {CRC: 603.44439, CUC: 1};
        currencyRates = await getExchangeRate(addedCurrencies);

        // Dispatch add new currencies to database and state
        addCurrencies({currencyRates}, {trip_uid}, {user});
      }
    }

    // Check to see if foreign currencies have been altered. If current ones are missing
    // delete the currency. If extra are added, add currencies

    // if (currencies.length) {
    //   // filter to find if currency from original array is missing
    //   // ["USD", "COP"]
    //   let previousCurrencies = currencies.map((curr) => curr.currency);
    //   let removedCurrencies = previousCurrencies.filter(
    //     (curr) => !foreignCurrencies.includes(curr)
    //   );

    //   // Delete Currencies
    // }

    setHidden(true);
  };

  const handleDeleteTrip = () => {
    deleteTrip(trip_uid);
    history.push('/dashboard');
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
          <Grid item className={classes.deleteButtonContainer}>
            <Tooltip title='Delete Trip'>
              <IconButton onClick={handleClickOpen}>
                <DeleteForeverIcon
                  style={{color: '#D61A3C'}}
                  fontSize={matchXs ? 'default' : 'large'}
                />
              </IconButton>
            </Tooltip>
            <Dialog
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
              <TextField
                variant='standard'
                margin='normal'
                required
                label='Budget Total'
                name='totalBudget'
                value={totalBudget}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction='row' spacing={1} justify='space-between'>
            <Grid xs={6} item>
              <KeyboardDatePicker
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
                disableToolbar
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

          <FormControl className={classes.currencyField}>
            <InputLabel>Foreign Currencies</InputLabel>
            <Select
              multiple
              value={foreignCurrencies}
              onChange={handleCurrencyChange}
              input={<Input id='select-multiple-chip' />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
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
                      value={country.code}
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
  trip_uid: PropTypes.string,
  name: PropTypes.string,
  total_budget: PropTypes.string,
  length: PropTypes.number,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  currencies: PropTypes.array,
  home_currency: PropTypes.string.isRequired,
  user: PropTypes.string,
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
});

export default connect(mapStateToProps, {
  updateTrip,
  addCurrencies,
  createAlerts,
  deleteTrip,
})(EditTrip);
