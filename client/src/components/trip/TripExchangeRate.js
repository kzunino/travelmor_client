import React, {useState, Fragment} from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';

// MUI Components
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: 'white',
    fontWeight: 'bold',
  },

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

const TripExchangeRate = ({currencies}) => {
  const theme = useTheme();
  const classes = useStyles();

  // map function pushes update currency's button with isHidden attribute to array
  const [buttonArr, setButtonArr] = useState(
    currencies.map((foreignCurrency) => {
      return {button: foreignCurrency.currency, isHidden: false};
    })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  // takes index of the button clicked and hides it
  const hide = (index) => {
    buttonArr[index].isHidden = !buttonArr[index].isHidden;
    setButtonArr([...buttonArr, buttonArr[index].isHidden]);
  };

  return (
    <form className={classes.form} onSubmit={(e) => handleSubmit(e)} noValidate>
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
                      onClick={() => hide(index)}
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
    </form>
  );
};

export default TripExchangeRate;
