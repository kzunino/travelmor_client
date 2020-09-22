import React, {useState} from 'react';
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
// import FormHelperText from '@material-ui/core/FormHelperText';
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

const AddExpense = () => {
  const theme = useTheme();
  const classes = useStyles();

  //end date state
  const [selectedExpenseDate, setSelectedExpenseDate] = useState(Date.now());
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleExpenseDate = (date) => {
    setSelectedExpenseDate(date);
  };

  const matchXs = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <>
      <Grid direction='column' className={classes.containerWrapper}>
        {/* -----Welcome Container----- */}
        <Grid item>
          <Typography variant={matchXs ? 'h4' : 'h2'}>
            Peru Trip - Add New Expense
          </Typography>
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
              id='expense_name'
              label='Expense Name'
              name='expense_name'
              autoFocus
            />
            <TextField
              className={classes.budgetField}
              variant='standard'
              margin='normal'
              required
              fullWidth
              name='expense_cost'
              // step="0.01"
              label='Cost'
              type='number'
              id='expense_cost'
            />

            {/* ------ Type Input ----- */}
            <FormControl required className={classes.formControl}>
              <InputLabel id='required-label'>Type</InputLabel>
              <Select
                labelId='demo-simple-select-required-label'
                id='demo-simple-select-required'
                value={age}
                onChange={handleChange}
                className={classes.selectEmpty}
              >
                <MenuItem value='Uncategorized'>
                  <em>Uncategorized</em>
                </MenuItem>
                <MenuItem value={'Lodging'}>Lodging</MenuItem>
                <MenuItem value={'Accommodation'}>Accommodation</MenuItem>
                <MenuItem value={'Food'}>Food</MenuItem>
                <MenuItem value={'Transportation'}>Transportation</MenuItem>
                <MenuItem value={'Entertainment'}>Entertainment</MenuItem>
                <MenuItem value={'Tours'}>Tours</MenuItem>
                <MenuItem value={'Shopping'}>Shopping</MenuItem>
                <MenuItem value={'Fees'}>Fees</MenuItem>
                <MenuItem value={'Emergencies'}>Emergencies</MenuItem>
                <MenuItem value={'Miscellaneous'}>Miscellaneous</MenuItem>
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

export default AddExpense;
