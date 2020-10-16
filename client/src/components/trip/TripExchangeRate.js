import React, {useState, Fragment, useEffect} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {updateSingleCurrency, deleteCurrency} from '../../actions/currency';
import {makeStyles} from '@material-ui/core/styles';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ClearIcon from '@material-ui/icons/Clear';

// Delete Dialog Components
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  exchangeContainerWrapper: {
    marginTop: '1em',
  },
  buttonContainer: {
    height: 25,
  },
  updateButton: {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    fontWeight: 'bold',
    height: 25,
    fontSize: '.75em',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  deleteIcon: {
    color: 'whitesmoke',
  },
  currencyDeleteButton: {
    marginLeft: '1em',
    backgroundColor: '#D61A3C',
    height: 25,
    width: 25,
    '&:hover': {
      backgroundColor: '#d11a2a',
    },
  },
  hidden: {
    visibility: 'hidden',
  },
}));

// Creates Edit Buttons for each currency with isHidden Property to toggle
let createButtons = (currencies) =>
  currencies.map((foreignCurrency) => {
    return {
      button: foreignCurrency.currency,
      isHidden: false,
      currency_uid: foreignCurrency.currency_uid,
    };
  });

const TripExchangeRate = ({
  currencies,
  home_currency,
  updateSingleCurrency,
  deleteCurrency,
}) => {
  const classes = useStyles();
  const API_KEY = process.env.REACT_APP_EXCHANGE_KEY;

  const [currencyArr, setCurrencyArr] = useState(currencies);
  // Creates buttons with props for each currency
  const [buttonArr, setButtonArr] = useState(createButtons(currencyArr));
  // State for delete dialog
  const [open, setOpen] = React.useState(false);
  // Saves index of delete button clicked to pass onto delete the currency
  const [deleteButtonIndex, setDeleteButtonIndex] = useState(null);

  useEffect(() => {
    setCurrencyArr(currencies);
    setButtonArr(createButtons(currencies));
  }, [currencies]);

  // GETS exchange rate for single currency to update
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

  // Updates the exchange rate for a single currency
  const updateCurrencyExchangeRate = async (currencyCode, index) => {
    let updatedCurrencyRate = await getExchangeRateSingleCurrency(currencyCode);
    if (updatedCurrencyRate) {
      let currencyObj = {
        currency_uid: currencies[index].currency_uid,
        currency: currencyCode,
        exchange_rate: updatedCurrencyRate[currencyCode].toFixed(4),
      };
      updateSingleCurrency(currencyObj);
    }
  };

  // takes index of the update button clicked and sets prop to hidden
  // this toggles the class for each button
  // when component is updated button reappears
  const hide = (index) => {
    buttonArr[index].isHidden = !buttonArr[index].isHidden;
    setButtonArr([...buttonArr, buttonArr[index].isHidden]);
  };

  const handleClickOpen = (index) => {
    setOpen(true);
    setDeleteButtonIndex(index);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteButtonIndex(null);
  };

  const handleDeleteCurrency = (deleteButtonIndex) => {
    deleteCurrency(buttonArr[deleteButtonIndex].currency_uid);
  };

  return (
    <>
      {' '}
      <Grid
        container
        direction='column'
        spacing={3}
        className={classes.exchangeContainerWrapper}
      >
        <Grid item>
          <Typography variant='h5'>USD exchange rate:</Typography>
        </Grid>

        {/* Currency Items  */}
        {currencyArr.map((foreignCurrency, index) => {
          return (
            <Fragment key={foreignCurrency + index}>
              <Grid item>
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                  alignItems='flex-end'
                >
                  <Grid item className={classes.foreignCurrencyUpdate}>
                    <Typography>
                      <strong>{foreignCurrency.currency}</strong>:{' '}
                      {foreignCurrency.exchange_rate}
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Grid container className={classes.buttonContainer}>
                      <Grid item>
                        <Button
                          type='submit'
                          onClick={() => {
                            updateCurrencyExchangeRate(
                              foreignCurrency.currency,
                              index
                            );
                            hide(index);
                          }}
                          className={
                            buttonArr[index].isHidden
                              ? classes.hidden
                              : classes.updateButton
                          }
                          variant='contained'
                        >
                          Update Rate
                        </Button>
                      </Grid>

                      {/* Delete Button and Dialog */}
                      <Grid item>
                        <Button
                          className={classes.currencyDeleteButton}
                          onClick={() => handleClickOpen(index)}
                        >
                          <ClearIcon className={classes.deleteIcon} />
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Divider />
            </Fragment>
          );
        })}

        {/* Dialog component */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'Would you like to delete this currency?'}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} color='primary' autoFocus>
              Go back
            </Button>
            <Button
              onClick={() => {
                handleClose();
                handleDeleteCurrency(deleteButtonIndex);
              }}
              color='primary'
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
};

TripExchangeRate.propTypes = {
  deleteCurrency: PropTypes.func.isRequired,
  updateSingleCurrency: PropTypes.func.isRequired,
  currencies: PropTypes.array,
  home_currency: PropTypes.string,
};

const mapStateToProps = (state) => ({
  currencies: state.trips.currencies,
  home_currency: state.trips.home_currency,
});

export default connect(mapStateToProps, {updateSingleCurrency, deleteCurrency})(
  TripExchangeRate
);
