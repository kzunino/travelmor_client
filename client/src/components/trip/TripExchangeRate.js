import React, {useState, Fragment} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateSingleCurrency} from '../../actions/currency';
import {makeStyles, useTheme} from '@material-ui/core/styles';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  submit: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '.75em',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  foreignCurrencyUpdate: {
    marginTop: 'auto',
  },
  hidden: {
    visibility: 'hidden',
  },
}));

const TripExchangeRate = ({
  currencies,
  home_currency,
  updateSingleCurrency,
}) => {
  const theme = useTheme();
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_EXCHANGE_KEY;

  // map function pushes update currency's button with isHidden attribute to array
  const [buttonArr, setButtonArr] = useState(
    currencies.map((foreignCurrency) => {
      return {button: foreignCurrency.currency, isHidden: false};
    })
  );

  const getExchangeRateSingleCurrency = async (currencyCode) => {
    try {
      const res = await axios.get('http://data.fixer.io/api/latest', {
        params: {
          access_key: API_KEY,
          base: home_currency,
          symbols: currencyCode,
        },
      });
      //return data object with currency exchange rates
      // return  object {USD: rate}
      return res.data.rates;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const updateCurrency = async (currencyCode, index) => {
    let updatedCurrencyRate = await getExchangeRateSingleCurrency(currencyCode);
    if (updatedCurrencyRate) {
      console.log(updatedCurrencyRate);
      // fire off update currency to reducer

      let currencyObj = {
        currency_uid: currencies[index].currency_uid,
        currency: currencyCode,
        exchange_rate: updatedCurrencyRate[currencyCode].toFixed(4),
      };
      updateSingleCurrency(currencyObj);
    }
  };
  // takes index of the button clicked and hides it
  const hide = (index) => {
    buttonArr[index].isHidden = !buttonArr[index].isHidden;
    setButtonArr([...buttonArr, buttonArr[index].isHidden]);
  };

  return (
    <>
      {' '}
      <Grid container direction='column' spacing={3}>
        <Grid item>
          <Typography variant='h5'>USD exchange rate:</Typography>
        </Grid>
        {currencies.map((foreignCurrency, index) => {
          return (
            <Fragment key={foreignCurrency + index}>
              <Grid item>
                <Grid container direction='row' justify='space-between'>
                  <Grid item className={classes.foreignCurrencyUpdate}>
                    <Typography>
                      <strong>{foreignCurrency.currency}</strong>:{' '}
                      {foreignCurrency.exchange_rate}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      type='submit'
                      onClick={() => {
                        updateCurrency(foreignCurrency.currency, index);
                        hide(index);
                      }}
                      name={index}
                      className={
                        !buttonArr[index].isHidden
                          ? classes.submit
                          : classes.hidden
                      }
                      variant='contained'
                    >
                      Update Rate
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </Fragment>
          );
        })}
      </Grid>
    </>
  );
};

TripExchangeRate.propTypes = {
  updateSingleCurrency: PropTypes.func.isRequired,
};

export default connect(null, {updateSingleCurrency})(TripExchangeRate);
