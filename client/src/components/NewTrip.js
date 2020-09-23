import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';

// import Moment from 'moment';
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

const NewTrip = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [currency, setCurrency] = useState('');
  const [selectedStartDate, setSelectedStartDate] = useState(Date.now());
  const [selectedEndDate, setSelectedEndDate] = useState(Date.now());

  // Currency data
  const handleCurrencyType = (event) => {
    setCurrency(event.target.value);
  };

  //start date state
  const handleStartDateChange = (date) => {
    setSelectedStartDate(date);
  };

  //end date state
  const handleEndDateChange = (date) => {
    setSelectedEndDate(date);
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

        <form className={classes.form} noValidate>
          <TextField
            variant='standard'
            margin='normal'
            required
            fullWidth
            id='trip_name'
            label='Trip Name'
            name='trip_name'
            autoFocus
          />
          <TextField
            className={classes.budgetField}
            variant='standard'
            margin='normal'
            required
            fullWidth
            name='trip_budget_total'
            label='Budget Total'
            type='number'
            placeholder='0.00'
            InputProps={{inputProps: {min: 0}}}
            id='trip_budget_total'
          />

          {/* ------ Currency Input ----- */}
          <FormControl required className={classes.formControl}>
            <InputLabel id='required-label'>Foreign Currency</InputLabel>
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
          </FormControl>

          <Grid container direction='row' spacing={2} justify='space-between'>
            <Grid xs={6} item>
              <KeyboardDatePicker
                disableToolbar
                variant='inline'
                format='MM/DD/yyyy'
                margin='normal'
                id='date-picker-inline'
                label='Start Date'
                value={selectedStartDate}
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
                value={selectedEndDate}
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

export default NewTrip;
