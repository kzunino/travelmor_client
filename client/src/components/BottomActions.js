import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// UI Components
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import SettingsIcon from '@material-ui/icons/Settings';

//components
import AddExpense from './AddExpense';

//Modal
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  bottomNavigationWrapper: {
    width: '100%',
  },
  root: {
    backgroundColor: theme.palette.secondary.main,
    marginLeft: drawerWidth,
    width: 500,
    position: 'fixed',
    bottom: 0,
    zIndex: 100,
    // margin: 'auto',
    // [theme.breakpoints.down('sm')]: {
    //   width: 500,
    // },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },

  navActionButtons: {
    // marginRight: drawerWidth,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
      '& > :first-child': {
        marginRight: 0,
      },
    },

    [theme.breakpoints.down('lg')]: {
      margin: 'auto',
    },
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '95%',
      margin: 'auto',
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BottomActions = ({trip_data}) => {
  const classes = useStyles();

  const {name, currencies, home_currency, trip_uid} = trip_data;

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BottomNavigation showLabels className={classes.root}>
      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Edit Trip'
        icon={<SettingsIcon />}
        disableRipple
        component={Link}
        to={`/trip/edit/${trip_uid}`}
      />
      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Add Expense'
        icon={<AddCircleIcon />}
        disableRipple
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AddExpense
              name={name}
              currencies={currencies}
              homeCurrency={home_currency}
              trip_uid={trip_uid}
              handleClose={handleClose}
            />
          </div>
        </Fade>
      </Modal>

      <BottomNavigationAction
        classes={{wrapper: classes.wrapper, root: classes.navActionButtons}}
        label='Trips'
        icon={<HistoryIcon />}
        disableRipple
        component={Link}
        to='/history'
      />
    </BottomNavigation>
  );
};

BottomActions.propTypes = {
  trip_data: PropTypes.object,
};

const mapStateToProps = (state) => ({
  trip_data: state.trips,
});

export default connect(mapStateToProps)(BottomActions);
