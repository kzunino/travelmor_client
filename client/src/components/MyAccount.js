import React, {useState} from 'react';
import {data as countryData} from 'currency-codes';

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
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

//import {KeyboardDatePicker} from '@material-ui/pickers';

import {makeStyles, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    width: '10em',
  },
  selectMenu: {
    maxHeight: '15em',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },
}));

const MyAccount = () => {
  const theme = useTheme();
  const classes = useStyles();

  const [currency, setCurrency] = useState('');

  // Currency data
  const handleCurrencyType = (event) => {
    setCurrency(event.target.value);
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      {/* <main className={classes.content}>
        <Toolbar />
        <Grid container direction='column' className={classes.containerWrapper}> */}
      {/* -----Welcome Container----- */}
      <Grid item>
        <Typography variant={matchXs ? 'h4' : 'h2'}>
          Account Settings
        </Typography>
      </Grid>
      <Divider />

      <Container maxWidth={'xs'}>
        <CssBaseline />
        <form className={classes.form} noValidate>
          <Grid container spacing={3}>
            <Grid item>
              <TextField
                variant='standard'
                margin='normal'
                required
                id='first_name'
                label='First Name'
                name='first_name'
              />
            </Grid>

            <Grid item>
              <TextField
                variant='standard'
                margin='normal'
                required
                id='last_name'
                label='Last Name'
                name='last_name'
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
            name='email'
          />

          <br />
          <br />
          {/* ------ Currency Input ----- */}
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
              {countryData.map((country) => (
                <MenuItem
                  key={country.number + country.code}
                  value={country.number}
                >{`${country.code}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <br />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            className={classes.submit}
            disableRipple
          >
            Update
          </Button>
          <Grid container></Grid>
        </form>
      </Container>
      {/* </Grid>
      </main> */}
    </>
  );
};

export default MyAccount;
