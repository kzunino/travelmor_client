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
import {KeyboardDatePicker} from '@material-ui/pickers';

import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import {withTheme} from '@material-ui/styles';

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
  updateExchangeRate: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.75em',
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
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  const [tripFormData, setTripFormData] = useState({
    tripName: name,
    totalBudget: total_budget,
    tripLength: length,
  });

  const [startDate, setStartDate] = useState(start_date);
  const [endDate, setEndDate] = useState(end_date);

  // Sets initial state to the country code of Each Currency
  const [foreignCurrencies, setForeignCurrencies] = useState(
    currencies.map((currency) => {
      return currency.currency;
    })
  );
  // hides the button if no changes are made to user info
  const [hidden, setHidden] = useState(true);

  const {tripName, totalBudget, tripLength} = tripFormData;

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
    setForeignCurrencies(event.target.value);
  };

  const toggleHidden = () => {
    setHidden(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHidden(true);
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
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>Edit Trip</Typography>
      </Grid>
      <Divider />

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
                id='total_budget'
                label='Budget Total'
                name='totalBudget'
                value={totalBudget}
                onChange={(e) => {
                  handleUserData(e);
                }}
              />
            </Grid>
          </Grid>

          <Grid container direction='row' spacing={2} justify='space-between'>
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

        <Divider />

        <Grid container direction='column' spacing={3}>
          <Grid item>
            <Typography variant='h5'>USD exchange rate:</Typography>
          </Grid>
          <Grid item>
            <Grid container direction='row'>
              <Grid item>
                <Typography>COP: 3781.00</Typography>
              </Grid>
              <Grid item>
                <Button className={classes.updateExchangeRate}>
                  Update Rate
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

EditTrip.propTypes = {
  trip_uid: PropTypes.string,
  name: PropTypes.string,
  total_budget: PropTypes.string,
  length: PropTypes.number,
  start_date: PropTypes.string,
  end_date: PropTypes.string,
  currencies: PropTypes.array,
};

const mapStateToProps = (state) => ({
  trip_uid: state.trips.trip_uid,
  name: state.trips.name,
  total_budget: state.trips.total_budget,
  length: state.trips.length,
  start_date: state.trips.start_date,
  end_date: state.trips.end_date,
  currencies: state.trips.currencies,
});

export default connect(mapStateToProps, {})(EditTrip);
