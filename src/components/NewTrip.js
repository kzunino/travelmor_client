import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {newTrip, deleteDefaultTrip} from '../actions/trips';
import {createAlerts} from '../actions/alerts';
import axios from 'axios';
import Moment from 'moment';
import getSymbolFromCurrency from 'currency-symbol-map';
import CurrencyFormat from 'react-currency-format';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

//Select
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// Multiselect
// import Input from '@material-ui/core/Input';
// import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';

// Checkbox
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
  // paper: {
  //   marginTop: theme.spacing(8),
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  // },
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
    marginTop: theme.spacing(0),
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
    //  '& .MuiInput-input':{
    //   color: theme.palette.secondary.main
    //  },
  },
  tripNameField: {
    width: '50%',
    marginBottom: 0,
  },
  budgetField: {
    width: '50%',
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
  dateField: {
    marginTop: '1em',
  },
  currencyField: {
    width: 300,
    marginTop: '1em',
    marginBottom: '2em',
  },
  fieldDescription: {
    fontSize: '.5em',
    color: theme.palette.secondary.main,
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

  // menuItemRoot: {
  //   '&$menuItemSelected, &$menuItemSelected:focus, &$menuItemSelected:hover': {
  //     backgroundColor: theme.palette.listItems.selected,
  //   },
  // },

  /* Styles applied to the root element if `selected={true}`. */
  // menuItemSelected: {},
  disabled: {},
  checkbox: {
    color: theme.palette.secondary.main,
  },
}));

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

const NewTrip = ({
  newTrip,
  deleteDefaultTrip,
  createAlerts,
  user,
  home_currency,
  history,
  default_trip,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_EXCHANGE_KEY;

  const [formData, setFormData] = useState({
    name: undefined,
    total_budget: undefined,
  });
  const [start_date, setStartDate] = useState(Date.now());
  const [end_date, setEndDate] = useState(Date.now());
  const [currencies, setCurrencies] = useState([]);
  const [defaultTripChecked, setDefaultTripChecked] = useState(true);

  let {name, total_budget} = formData;

  // Maps country data and constructs objects for each individual country
  // then flattens the arrays because some countries share a currency
  // then filters out countries that share home_currency
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
    .filter((country) => home_currency !== country.code);

  //joins all currencies to "USD,COP" format for query string
  // then gets all exchange rates and creat

  const getExchangeRate = async () => {
    try {
      let selectedCurrencies = currencies.join();
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

  // const ITEM_HEIGHT = 48;
  // const ITEM_PADDING_TOP = 8;
  // const MenuProps = {
  //   PaperProps: {
  //     style: {
  //       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  //       width: 350,
  //     },
  //   },
  //   variant: 'menu',
  //   getContentAnchorEl: null,
  // };

  // When a currency is selected, it gets the exchange rate and sets state to
  // an array of currency codes ['USD', 'COP']
  const handleCurrencyChange = (event, values) => {
    let foreignCurr = values.map((curr) => curr.code);
    setCurrencies(foreignCurr);
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

  // const removeCurrencyFromInput = (curr) => {
  //   let updatedForeignCurrencies = currencies.filter(
  //     (currency) => currency !== curr
  //   );
  //   setCurrencies(updatedForeignCurrencies);
  // };

  const handleSetDefault = () => {
    setDefaultTripChecked(!defaultTripChecked);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let currencyRates;
    let length = 1;
    const format = 'YYYY-MM-DD HH:mm:ss';
    let setNewDefaultTrip = false;
    let deleteOldDefaultTrip = false;

    if (default_trip.length && defaultTripChecked) {
      setNewDefaultTrip = true;
      deleteOldDefaultTrip = true;
    } else if (!default_trip.length && defaultTripChecked) {
      setNewDefaultTrip = true;
    }

    // Alert if trip end date is before trip start
    if (Moment(start_date).isAfter(Moment(end_date), 'days')) {
      return createAlerts({validation_error: 'End date is before start date!'});
    }

    // Alert if forms are blank
    if (!name || !total_budget || start_date === null || end_date === null) {
      if (!name && !total_budget) {
        setFormData({...formData, name: '', total_budget: ''});
      } else if (!total_budget) setFormData({...formData, total_budget: ''});
      else if (!name) setFormData({...formData, name: ''});
      return createAlerts({validation_error: 'Please fill out all fields'});
    }

    // min number of days is 1
    // loops over and enumerates the trip length based on start and end date
    let currDate = Moment(start_date).startOf('day');
    let lastDate = Moment(end_date).startOf('day');

    while (currDate.add(1, 'day').diff(lastDate, 'day') <= 0) {
      length++;
    }

    if (currencies.length) {
      currencyRates = await getExchangeRate();
    }

    if (deleteOldDefaultTrip) {
      // deletes current default trip if user selects the new trip as default
      deleteDefaultTrip(default_trip[0].default_trip_uid);
    }
    // sets the new trip with the hours adjusted to account for full days
    newTrip(
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
      currencyRates,
      setNewDefaultTrip ? setNewDefaultTrip : false
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
          <Grid container direction='column' spacing={0}>
            <Grid item>
              <TextField
                variant='standard'
                margin='normal'
                required
                error={name === ''}
                helperText={name === '' ? 'Please enter a trip name.' : null}
                placeholder='Name'
                className={`${classes.tripNameField} ${classes.inputStyles}`}
                autoComplete='off'
                id='name'
                label='Trip Name'
                name='name'
                value={name}
                onChange={(e) => handleChange(e)}
                autoFocus
              />
            </Grid>

            <Grid item>
              <Grid container direction='column'>
                <Grid item>
                  <CurrencyFormat
                    className={`${classes.budgetField} ${classes.inputStyles}`}
                    variant='standard'
                    margin='normal'
                    required
                    error={total_budget === ''}
                    helperText={
                      total_budget === '' ? 'Please enter a budget.' : null
                    }
                    autoComplete='off'
                    name='total_budget'
                    label='Budget Total'
                    placeholder='0.00'
                    InputProps={{inputProps: {min: 0}}}
                    id='total_budget'
                    value={total_budget}
                    onValueChange={(values) => {
                      const {value} = values;
                      setFormData({
                        ...formData,
                        total_budget: value,
                      });
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
                    disableToolbar
                    required
                    error={!start_date}
                    helperText={
                      !start_date ? 'Please enter a start date.' : null
                    }
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
                    className={classes.inputStyles}
                    error={!end_date}
                    helperText={!end_date ? 'Please enter a end date.' : null}
                    required
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
                options={currencyList}
                getOptionLabel={(option) => option.code}
                renderOption={(option) => option.country}
                getOptionSelected={(option, value) =>
                  option.code === value.code
                }
                // filterOptions={(options) => {
                //   options.filter(option => option.title);
                //   return options;
                // }}
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
                style={{marginTop: '.5em'}}
                className={classes.fieldDescription}
              >
                * Countries that share a currency will all automatically be
                selected
              </Typography>

              {/* <FormControl
                className={`${classes.currencyField} ${classes.inputStyles}`}
              >
                <InputLabel>Foreign Currencies (optional)</InputLabel>
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
                          onDelete={() => {
                            removeCurrencyFromInput(value);
                          }}
                          onMouseDown={(event) => {
                            event.stopPropagation();
                          }}
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
                          classes={{
                            root: classes.menuItemRoot,
                            selected: classes.menuItemSelected,
                          }}
                        >
                          {`${country.code} - ${place}`}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem
                        key={country.number + country.code}
                        value={`${country.code}`}
                        style={getStyles(name, currencies, theme)}
                        classes={{
                          root: classes.menuItemRoot,
                          selected: classes.menuItemSelected,
                        }}
                      >
                        {`${country.code} - ${country.countries}`}
                      </MenuItem>
                    )
                  )}
                </Select>
                <Typography
                  style={{marginTop: '1em'}}
                  className={classes.fieldDescription}
                >
                  * Select foreign currencies for countries you will visit
                </Typography>
                <Typography
                  style={{marginTop: '.5em'}}
                  className={classes.fieldDescription}
                >
                  * Countries that share a currency will all automatically be
                  selected
                </Typography>
              </FormControl> */}
            </Grid>

            <Grid item style={{marginTop: '1em'}}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={defaultTripChecked}
                    onChange={handleSetDefault}
                    name='checked'
                    color='primary'
                  />
                }
                label={
                  <span style={{fontSize: '1em', color: 'white'}}>
                    Make default trip for dashboard
                  </span>
                }
              />
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
  deleteDefaultTrip: PropTypes.func.isRequired,
  createAlerts: PropTypes.func.isRequired,
  home_currency: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  default_trip: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  home_currency: state.auth.user.home_currency,
  user: state.auth.user.id,
  default_trip: state.auth.user.default_trips,
});

export default connect(mapStateToProps, {
  newTrip,
  deleteDefaultTrip,
  createAlerts,
})(NewTrip);
